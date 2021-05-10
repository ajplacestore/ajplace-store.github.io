(function() {
    try {

        let NewProduct = {
            init: () => {
                NewProduct.verifyIfProductAvaible();
                NewProduct.getProductData();
                NewProduct.applyTextsMobile();
                NewProduct.openShipping();
                NewProduct.applySlickInShelfs();
                NewProduct.changeSellerIdInBuyButton();
                NewProduct.toggleSellers();
                NewProduct.verifySkuUnavaible();
                NewProduct.accordionToSellers();
                NewProduct.getSimilars();
                NewProduct.applyEventButtonToggleCEP();
                NewProduct.verifyIfBestPrice();
                //NewProduct.closeInfoFreightWhenClickOutside();
                NewProduct.applyDiscountPerTicket();
                NewProduct.applyDiscountPerTicketWhenSkuChange();
                NewProduct.changeSlideWhenClick();
            },
            productData: {
                id: $("#___rc-p-id").val(), // ID do produto
                items: null,
                sellers: null,
                thumbs: null,
                skuIdSelected: null
            },
            imagesConfig: {
                image: {
                    configMain: "530-550", // NewProduct.imagesConfig.image.configMain
                    configMainMobile: "350-300", // NewProduct.imagesConfig.image.configMainMobile
                    configZoom: "1000-1000", // NewProduct.imagesConfig.image.configZoom
                    configThumb: "100-100", // NewProduct.imagesConfig.image.configThumb
                    configSimilars: "60-35" // NewProduct.imagesConfig.image.configSimilars
                },
                regexList: {
                    main: /530-550/g, // NewProduct.imagesConfig.regexList.main
                    thumb: /100-100/g, // NewProduct.imagesConfig.regexList.thumb
                    size: /#width#-#height#/g, // NewProduct.imagesConfig.regexList.size
                    uncle: /~/g // NewProduct.imagesConfig.regexList.uncle
                }
            },
            breakpoints: {
                mobile: $(window).width() <= 991, // NewProduct.breakpoints.mobile
                desktop: $(window).width() > 991 // NewProduct.breakpoints.desktop
            },
            windowOnload: () => {
                NewProduct.includeButtonCEP();
                NewProduct.cepText();
            },
            ajaxStop: () => {},
            openShipping: function () {
                if (typeof window.ShippingValue === "function") {
                    window.ShippingValue();
                }
            },
            verifyIfProductAvaible: function () {
                function checkVisibleNotify(available) {
                    if (available) {
                        $(document.body).addClass('ajp-prod-available').removeClass('ajp-prod-unavailable');
                    } else {
                        $(document.body).addClass('ajp-prod-unavailable').removeClass('ajp-prod-available');
                    }
                }
        
                $(document).on("skuSelected.vtex", function (e, id, sku) {
                    checkVisibleNotify(sku.available);
                });
        
                checkVisibleNotify(skuJson.available);

                if ($(document.body).is(".ajp-prod-unavailable")) {
                    $(".sku-notifyme-client-name").attr("placeholder", "SEU NOME");
                    $(".sku-notifyme-client-email").attr("placeholder", "SEU E-MAIL");
                    $(".sku-notifyme-button-ok").val("AVISE-ME QUANDO CHEGAR");

                    NewProduct.forceUnavaibleFront();
                }
            },
            forceUnavaibleFront: () => {
                let wrapperNotify = $(".ajp-product__buybutton .portal-notify-me-ref");
                let wrapperSkus = $(".sku-selector-container.sku-selector-container-0");
                let buyButton = $("#ajp-buybutton");
                let totalSkus = skuJson.skus.length;
                let count = 0;

                if (totalSkus > 1) {
                    skuJson.skus.forEach(sku => {
                        if (sku.available == false) {
                            count++;
                        }
                    });
                }

                if (totalSkus == 1) {
                    wrapperSkus.hide();
                    buyButton.hide();
                }

                if (count == totalSkus) {
                    wrapperSkus.hide();
                    wrapperNotify.children(".notifyme.sku-notifyme").removeAttr("style");
                    wrapperNotify.find(".notifyme-title-div").removeAttr("style");
                    wrapperNotify.find(".notifyme.sku-notifyme > form").removeAttr("style");
                    wrapperNotify.find(".sku-notifyme-form.notifyme-form input").removeAttr("style");
                }
            },
            cepText: () => {
                if ($(document).is(".ajp-prod-unavailable")) {
                    return;
                }
                $("#txtCep").attr("placeholder", "Digite seu CEP")
            },
            verifySkuUnavaible: () => {
                let wrapperSkuVar = $(".sku-selector-container");
                if ($.isEmptyObject(skuJson.skus[0].dimensions)) {
                    console.log('Nenhum tamanho cadastrado. Erro de cadastro!');
                    wrapperSkuVar.parent().hide();
                }
            },
            getProductData: () => {
                $.ajax({
                    type: "GET",
                    url: `/api/catalog_system/pub/products/search/?fq=productId:${NewProduct.productData.id}`,
                    dataType: "json",
                    contentType: "application/json",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/vnd.vtex.ds.v10+json"
                    }
                }).done(function (response) {
                    // Populos as variacoes em uma global
                    NewProduct.productData.items = response[0].items;
                    // Aplico a funcao que busca e coloca os sellers
                    NewProduct.getSkuSellers();

                    // Configura todas as thumbs
                    NewProduct.buildThumbsImage();

                    // Monta Especificacoes e Atributos do produto
                    NewProduct.applyDescriptionProduct(response[0]);
                    NewProduct.applyAtribbutes(response[0]);

                    // Fixer Mobile
                    if (NewProduct.breakpoints.mobile) {
                        NewProduct.fixersMobile();
                    }
                });
            },
            buildThumbsImage: () => {
                let wrapperMain = $(".ajp-product__image--main");
                let listImagesFormated = [];
                let groupLi = '';
                let mainImage = '';

                // Formata os tamanhos das imagens
                NewProduct.productData.items[0].images.forEach((item, index) => {
                    // Monta a principal
                    if (index == 0) {
                        if (NewProduct.breakpoints.desktop) {
                            mainImage = item.imageTag.replace(NewProduct.imagesConfig.regexList.size, NewProduct.imagesConfig.image.configMain);
                            mainImage = mainImage.replace(NewProduct.imagesConfig.regexList.uncle, '');
                        } else if (NewProduct.breakpoints.mobile) {
                            mainImage = item.imageTag.replace(NewProduct.imagesConfig.regexList.size, NewProduct.imagesConfig.image.configMainMobile);
                            mainImage = mainImage.replace(NewProduct.imagesConfig.regexList.uncle, '');
                        }
                    }

                    // Formatando thumbs
                    let formating = item.imageTag.replace(NewProduct.imagesConfig.regexList.size, NewProduct.imagesConfig.image.configThumb);
                    let formatingUncle = formating.replace(NewProduct.imagesConfig.regexList.uncle, '');
                    listImagesFormated.push(formatingUncle);
                });

                // Agrupa tudo em um unico elemento
                for (let i=0;i<listImagesFormated.length;i++) {
                    let block = `<li><a data-zoom="">${listImagesFormated[i]}</a></li>`;
                    groupLi = groupLi + block;
                }

                // Monta a imagem principal
                wrapperMain.html(`<a>${mainImage}</a>`);
                let mainImageSrc = wrapperMain.find("img").attr("src");
                mainImageSrc = mainImageSrc.replace(NewProduct.imagesConfig.regexList.main, "1000-1000");
                wrapperMain.find("a").attr("href", mainImageSrc);

                // Verifica se esse produto tem somente 1 imagem
                if (NewProduct.breakpoints.mobile) {
                    if (listImagesFormated.length == 1) {
                        return;
                    }
                }

                // Agrupa as thumbs na UL
                let list = $(`<ul>${groupLi}</ul>`);

                // Salva as urls para o zoom
                list.find("> li").each(function () {
                    let $t = $(this);
                    let thisSrc = $t.find("img").attr("src");
                    $t.find("a").attr("data-zoom", thisSrc);
                });

                // Guardo o elemento de thumbs pronto em uma global
                NewProduct.productData.thumbs = list;

                // Aplico Slick Vertical (Desktop)
                if (NewProduct.breakpoints.desktop) {
                    NewProduct.applySlickVerticalDesktop();
                } 
                // Aplico Slick Horizontal (Mobile)
                else if (NewProduct.breakpoints.mobile) {
                    NewProduct.applySlickHorizontalMobile();
                }
            },
            applySlickHorizontalMobile: () => {
                // Slick Mobile
                $(".ajp-product__image--thumbs").html(`<ul>${NewProduct.productData.thumbs[0].innerHTML}</ul>`);
                let wrapperThumbs = $(".ajp-product__image--thumbs > ul");

                if (wrapperThumbs.children().length < 5) {
                    console.log("CAI AQUI");
                    $(".ajp-product__image--thumbs > ul").addClass('no-slick');
                    NewProduct.applyClickChangeImages();
                    return;
                }
                
                let arrows = NewProduct.arrowsSlick();
                wrapperThumbs.slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    prevArrow: `<button type="button" class="slick-prev">${arrows.prev}</button>`,
                    nextArrow: `<button type="button" class="slick-next">${arrows.next}</button>`,
                    arrows: true,
                    dots: false
                });

                wrapperThumbs.each(function() {
                    $(this).find(".slick-arrow").wrapAll('<div class="slick-nav" />');
                });

                // Faz a troca da thumb na principal quando trocado a thumb no carrossel
                NewProduct.changeImageSlickAndMainMobile();
            },
            applySlickVerticalDesktop: () => {
                let thumbsVertical = NewProduct.productData.thumbs;
                let wrapper = $(".ajp-product__imageaside--vertical");
                wrapper.append(`<ul>${thumbsVertical[0].innerHTML}</ul>`);
                if (wrapper.find('> ul > li').length < 5) {
                    $(".ajp-product__imageaside--vertical > ul").addClass('no-slick');
                    NewProduct.applyEasyZoomFirstTime();
                    NewProduct.applyClickChangeImages();
                    return;
                }

                let arrows = NewProduct.arrowsSlickVertical();
                wrapper.find('> ul').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    vertical: true,
                    prevArrow: `<button type="button" class="slick-prev">${arrows.up}</button>`,
                    nextArrow: `<button type="button" class="slick-next">${arrows.down}</button>`,
                    arrows: true,
                });

                wrapper.find(".slick-prev.slick-arrow").prependTo(wrapper);
                wrapper.find(".slick-next.slick-arrow").appendTo(wrapper);

                // Aplica o Easyzoom pela primeira vez
                NewProduct.applyEasyZoomFirstTime();

                // Troca as thumbs quando o carrossel avança
                NewProduct.changeImageSlickVerticalAndMainImage();
            },
            changeImageSlickVerticalAndMainImage: () => {
                // Callback assim que o slick troca de thumb
                let wrapper = $(".ajp-product__imageaside--vertical .slick-initialized.slick-slider");
                wrapper.on("beforeChange", function(event, slick, currentSlide, nextSlide){
                    let $t = $(this);
                    let thisThumb = $t.find(".slick-current").next();

                    let newMainSrcZoom = thisThumb.find('a').attr('data-zoom');
                    newMainSrcZoom = newMainSrcZoom.replace(NewProduct.imagesConfig.regexList.thumb, NewProduct.imagesConfig.image.configZoom);

                    let newMainImage = thisThumb.find('a').attr('data-zoom');
                    newMainImage = newMainImage.replace(NewProduct.imagesConfig.regexList.thumb, NewProduct.imagesConfig.image.configMain);

                    $(".ajp-product__image--main a").attr("href", newMainSrcZoom);
                    $(".ajp-product__image--main img").attr("src", newMainImage);

                    // Destruo e aplico o Easyzoom depois da troca do slick
                    NewProduct.destroyAndInitEasyzoom();
                });
            },
            changeImageSlickAndMainMobile: () => {
                $(".ajp-product__image--thumbs .slick-initialized.slick-slider").on("beforeChange", function(event, slick, currentSlide, nextSlide){
                    let $t = $(this);
                    let thisThumb = $t.find(".slick-current").next().find("img").attr("src");
                    thisThumb = thisThumb.replace(NewProduct.imagesConfig.regexList.thumb, NewProduct.imagesConfig.image.configMainMobile);
                    $(".ajp-product__image--main img").attr("src",  thisThumb);
                });
            },
            changeSlideWhenClick: () => {
                $(document).on("click", ".ajp-product__imageaside--vertical .slick-slide", (function(e){ 
                    e.preventDefault(); 
                    var slideIndex = $(this).index(); 
                    $(".ajp-product__imageaside--vertical .slick-slider.slick-vertical").slick("slickGoTo", slideIndex, true); 
                }));
            },
            applyEasyZoomFirstTime: () => {
                // Iniciando EasyZoom assim que a página carregar
                let $easyzoom = $(".easyzoom").easyZoom();
                let api = $easyzoom.data("easyZoom");
            },
            destroyAndInitEasyzoom: () => {
                // Destruo e aplico denovo o Easyzoom na troca do slick
                let $thisZoom = $(".easyzoom").easyZoom();
                let api = $thisZoom.data("easyZoom");
                api.teardown();
                api._init();
            },
            applyClickChangeImages: () => {
                // Alternação das imagens sem slick (vertical/desktop)
                if (NewProduct.breakpoints.desktop) {
                    $(document).on("click", ".ajp-product__imageaside--vertical a", function () {
                        let $t = $(this);
                        let thisSrc = $t.find("img").attr("src");
                        let main = $(".ajp-product__image--main img");
                        let mainLink = $(".ajp-product__image--main a");
                        thisSrc = thisSrc.replace(NewProduct.imagesConfig.regexList.thumb, NewProduct.imagesConfig.image.configMain);
                        let thisSrcLink = thisSrc.replace(NewProduct.imagesConfig.regexList.main, NewProduct.imagesConfig.image.configZoom);
                        main.attr("src", thisSrc);
                        mainLink.attr("href", thisSrcLink);

                        // Destruo e aplico o Easyzoom depois da troca do slick
                        NewProduct.destroyAndInitEasyzoom();
                    });
                } 
                // Alternação das imagens sem slick (horizontal/mobile)
                else if (NewProduct.breakpoints.mobile) {
                    $(document).on("click", ".ajp-product__image--thumbs a", function () {
                        let $t = $(this);
                        let thisSrc = $t.find("img").attr("src");
                        let main = $(".ajp-product__image--main img");
                        thisSrc = thisSrc.replace(NewProduct.imagesConfig.regexList.thumb, NewProduct.imagesConfig.image.configMainMobile);
                        main.attr("src", thisSrc);
                        // Destruo e aplico o Easyzoom depois da troca do slick
                        //NewProduct.destroyAndInitEasyzoom();
                    });
                }
            },
            arrowsSlick: () => {
                let list = { // #a61f67
                    prev: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="18" height="18" x="0" y="0" viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8    c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712    L143.492,221.863z" fill="#000000" data-original="#000000" style=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>`,
                    next: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="18" height="18" x="0" y="0" viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M336.226,209.591l-204.8-204.8c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.712l192.734,192.734    L107.294,414.391c-6.663,6.664-6.663,17.468,0,24.132c6.665,6.663,17.468,6.663,24.132,0l204.8-204.8    C342.889,227.058,342.889,216.255,336.226,209.591z" fill="#000000" data-original="#000000" style="" class=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>`
                }
                return list;
            },
            arrowsSlickVertical: () => {
                let list = {
                    up: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 240.835 240.835" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><g xmlns="http://www.w3.org/2000/svg"><path id="Expand_Less" d="M129.007,57.819c-4.68-4.68-12.499-4.68-17.191,0L3.555,165.803c-4.74,4.74-4.74,12.427,0,17.155   c4.74,4.74,12.439,4.74,17.179,0l99.683-99.406l99.671,99.418c4.752,4.74,12.439,4.74,17.191,0c4.74-4.74,4.74-12.427,0-17.155   L129.007,57.819z" fill="#ffffff" data-original="#000000" style=""/><g></g><g></g><g></g><g></g><g></g><g></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>`,
                    down: `<?xml version="1.0"?>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 240.811 240.811" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><path id="Expand_More" d="M220.088,57.667l-99.671,99.695L20.746,57.655c-4.752-4.752-12.439-4.752-17.191,0   c-4.74,4.752-4.74,12.451,0,17.203l108.261,108.297l0,0l0,0c4.74,4.752,12.439,4.752,17.179,0L237.256,74.859   c4.74-4.752,4.74-12.463,0-17.215C232.528,52.915,224.828,52.915,220.088,57.667z" fill="#ffffff" data-original="#000000" style=""/><g></g><g></g><g></g><g></g><g></g><g></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>`
                }
                return list;
            },
            getSkuSellers: () => {
                let wrapper = $(".ajp-product__sellers--list");
                let listSvgs = NewProduct.icons();
                let totalAvaible = 0;
                let oneSku = null;
                skuJson.skus.forEach(thisSku => {
                    if (thisSku.available == true) {
                        totalAvaible++;
                        oneSku = thisSku.sku;
                    }
                });

                // Busca info quando tem mais de 1 SKU
                if (totalAvaible > 1) {
                    // skuSelected.vtex || skuChanged.vtex
                    $(document).on("skuChanged.vtex", function (e, id, sku) {
                        wrapper.addClass("list-sellers-loading");
                        $(".ajp-product__sellers--open").addClass('hide');
                        $(".ajp-product__sellers--close").removeClass("hide");
                        $(".ajp-product__sellers--menssage").hide('fast');
                        $(".ajp-product__sellers--list").html(listSvgs.loaderSellers);
                        $("#ajp-buybutton").removeAttr("this-sku-seller");

                        // Localizo o SKU selecionado e busca as infos dele
                        setTimeout(function () {
                            let dataSku = NewProduct.productData.items.filter(item => {
                                return item.itemId == sku.sku
                            });
                            let thisSkuSellers = dataSku[0].sellers;
                            let groupSellerElement = '';
                            thisSkuSellers.forEach(seller => {
                                if (seller.sellerId == 1) {
                                    return;
                                }
                                let thisBlock = `
                                    <div class="seller-box--item">
                                        <a>
                                            <div class="box-item--infos">
                                                ${listSvgs.shop}
                                                <span class="item-name">${seller.sellerName}</span>
                                            </div>
                                            <div class="box-item--button">
                                                <label class="container">
                                                    <input type="radio" seller-id="${seller.sellerId}" value="${seller.addToCartLink}" name="lojas">
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                        </a>
                                    </div>`;
                                groupSellerElement = groupSellerElement + thisBlock; 
                            });
                            wrapper.html(`<form data-sku-id="${dataSku[0].itemId}">${groupSellerElement}</form>`);

                            // Loader
                            $(".ajp-product__sellers--list form > svg").remove();

                            wrapper.removeClass("list-sellers-loading");
                            //NewProduct.setSellerIdInBuyButton(thisSkuSellers);
                        }, 1000);
                    });
                } 
                // Quando o produto tem apenas 1 SKU
                else if (totalAvaible == 1) {
                    let thisSkuSellers = NewProduct.productData.items.filter(item => {
                        return item.itemId == oneSku;
                    })
                    $(".ajp-product__sellers--open").hide();

                    // Faço o append dos sellers no front
                    let groupSellerElement = '';
                    thisSkuSellers[0].sellers.forEach(seller => {
                        if (seller.sellerId == 1) {
                            return;
                        }
                        let thisBlock = `
                            <div class="seller-box--item one">
                                <a>
                                    <div class="box-item--infos">
                                        ${listSvgs.shop}
                                        <span class="item-name">${seller.sellerName}</span>
                                    </div>
                                    <div class="box-item--button">
                                        <label class="container">
                                            <input type="radio" seller-id="${seller.sellerId}" value="${seller.addToCartLink}" name="lojas">
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </a>
                            </div>`;
                        groupSellerElement = groupSellerElement + thisBlock;
                    });
                    wrapper.html(`<form data-sku-id="${thisSkuSellers[0].itemId}">${groupSellerElement}</form>`);
                    let onlyInput = $(".box-item--button input");
                    onlyInput.attr("checked", true);
                    $("#ajp-buybutton").attr("this-sku-seller", onlyInput.attr("seller-id"));
                }
            },
            verifyIfBestPrice: () => {
                let byPrice = $(".ajp-product__price .valor-por.price-best-price .skuBestPrice");
                let onePrice = $(".ajp-product__price .preco-a-vista.price-cash .skuPrice");

                if (byPrice.length && onePrice.length) {
                    let byPriceValue = byPrice.text();
                    let onePriceValue = onePrice.text();

                    byPriceValue = byPriceValue.replace(/R\$ /g, "");
                    byPriceValue = byPriceValue.replace(/,/g, "");

                    onePriceValue = onePriceValue.replace(/R\$ /g, "");
                    onePriceValue = onePriceValue.replace(/,/g, "");

                    if (byPriceValue.match(/\./g)) {
                        byPriceValue = byPriceValue.replace(/\./g, "");
                    }

                    if (onePriceValue.match(/\./g)) {
                        onePriceValue = onePriceValue.replace(/\./g, "");
                    }

                    if (byPriceValue != onePriceValue) {
                        $(".ajp-product__price .preco-a-vista.price-cash").show();
                    }
                }   
            },
            setSellerIdInBuyButton: (sellers) => {
                // Isso acontece quando eu não seleciono nenhum seller, somente troco o SKU
                let defaultSeller = sellers.find(info => {
                    if (info.sellerDefault == true) {
                        return info.sellerId;
                    }
                });
                $(".buy-button.buy-button-ref").attr("this-sku-seller", defaultSeller.sellerId);
                $("#ajp-buybutton").attr("this-sku-seller", defaultSeller.sellerId);
            },
            changeSellerIdInBuyButton: () => {
                // Troco o seller
                $(document).on('click', '.ajp-product__sellers--list a', function () {
                    let $t = $(this);
                    let thisSellerId = $t.find(`input[name="lojas"]`).attr("seller-id");
                    $t.find(`input[name="lojas"]`).attr("checked", true);
                    let buyButton = $('.buy-button.buy-button-ref');
                    buyButton.attr("this-sku-seller", thisSellerId);
                    $("#ajp-buybutton").attr("this-sku-seller", thisSellerId);
                });
            },
            toggleSellers: () => {
                let wrapperMessage = $(".ajp-product__sellers--menssage");
                // Open
                $('.ajp-product__sellers--open').on('click', function () {
                    if ($('.ajp-product__sellers--list').children().length == 0) {
                        wrapperMessage.show("fast");
                        return;
                    }
                    $('.ajp-product__sellers--list').slideToggle('fast');
                    $(this).addClass("hide");
                    $('.ajp-product__sellers--close').removeClass("hide");
                });

                // Close
                $('.ajp-product__sellers--close').on('click', function () {
                    if ($('.ajp-product__sellers--list').children().length == 0) {
                        return;
                    }
                    $('.ajp-product__sellers--list').slideToggle('fast');
                    $(this).addClass("hide");
                    $('.ajp-product__sellers--open').removeClass("hide");
                });
            },
            applyTextsMobile: () => {
                let wrapper = $(".ajp-product__infosmobile");
                let title = $(".ajp-product__name div").text();
                let brand = $(".ajp-product__brand a").clone();
                let yourviews = $(".ajp-product__yourviews #yv-review-quickreview").clone();

                // Subo os textos pra cima
                wrapper.find(".mobile-brand").html(brand);
                wrapper.find(".mobile-name").html(`<span>${title}</span>`);
                wrapper.find(".mobile-yourviews").html(yourviews);
            },
            fixersMobile: () => {
                $(".ajp-product__image--main a").removeAttr('href');
            },
            applyDescriptionProduct: function (response) {
                if (response.description.length == 0) {
                    $('.ajp-product__spec').hide();
                    return;
                }
                let block = `<h3>${response.description}</h3>`;
                $('.ajp-product__spec').append($(block));
            },
            applyAtribbutes: (response) => {
                let regexAttr = /attributes-ordenar|inativo/g;
                let thisProdId = response.productId;
                let thisFirstSkuId = response.items[0].itemId;
                try {
                    $.ajax({
                        type: "POST",
                        url: `/attributes/get/snippet/${thisProdId}/${thisFirstSkuId}`,
                        data: ""
                    }).done(function (response) {
                        if (response && response.length) {
                            if (response.match(regexAttr)) {
                                $('.ajp-product__att').hide();
                            } else {
                                $('.ajp-product__att').html(response);
                            }
                        }
                    });
                }
                catch(e) {
                    console.log('Erro ao buscar atributos: ', e);
                }
            },
            applySlickInShelfs: () => {
                let wrapperWhobought = $(".ajp-product__whobought.j-shelf .main-shelf > ul");
                let wrapperSimilars = $(".ajp-product__similars.j-shelf .main-shelf > ul");
                if (wrapperWhobought.children('li[layout]').length > 4) {
                    wrapperWhobought.slick({
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        arrows: false,
                        dots: true,
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3
                                }
                            },
                            {
                                breakpoint: 991,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            }
                        ]
                    });
                }

                if (wrapperSimilars.children('li[layout]').length > 4) {
                    wrapperSimilars.slick({
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        arrows: false,
                        dots: false,
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3
                                }
                            },
                            {
                                breakpoint: 991,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            }
                        ]
                    });
                }
                
            },
            getSimilars: () => {
                let urlSimilar = `/api/catalog_system/pub/products/crossselling/similars/${NewProduct.productData.id}`;
                $.ajax({
                    type: "GET",
                    url: urlSimilar,
                    dataType: "json",
                    contentType: "application/json",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/vnd.vtex.ds.v10+json"
                    }
                }).done(function (response) {
                    if (!response.length) {
                        $(".ajp-product__selection--colors").hide();
                        return;
                    }
                    NewProduct.renderSimilars(response);
                });
            },
            renderSimilars: (response) => {
                let wrapperColors = $(".ajp-product__selection--colors ul");
                let agroupLi = '';
                response.forEach(item => {
                    let imgUrl = item.items[0].images[0].imageTag;

                    // Retiro o ~ no inicio da url
                    imgUrl = imgUrl.replace(NewProduct.imagesConfig.regexList.uncle, "");

                    // Defino o tamnho e altura da imagem
                    imgUrl = imgUrl.replace(NewProduct.imagesConfig.regexList.size, NewProduct.imagesConfig.image.configSimilars);

                    // Monto o elemento
                    let thisBlock = `
                        <li>
                            <a href="/${item.linkText}/p" data-toggle="tooltip" title="${item.Cor[0]}">
                                ${imgUrl}
                            </a>
                        </li>
                    `;
                    agroupLi = agroupLi + thisBlock;
                });
                
                // Renderizo
                wrapperColors.append(agroupLi);

                $(".ajp-product__selection--colors > svg").hide();
            },
            accordionToSellers: () => {
                if (NewProduct.breakpoints.mobile) {
                    let wrapperVariation = $(".select.skuList");
                    let wrapperSellers = $(".ajp-product__sellers--list");
    
                    wrapperVariation.on('change', function () {
                        $('html, body').stop().animate({
                            scrollTop: wrapperSellers.offset().top - 130
                        }, 1000, 'swing');
                    });
                }
            },
            includeButtonCEP: () => {
                if ($("#empty-shipping").length) {
                    return;
                }

                let btnClose = `<button id="empty-shipping" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 26.741 26.08"><g id="Grupo_5303" data-name="Grupo 5303" transform="translate(0.5 0.5)" opacity="0.6"><path id="Caminho_7677" data-name="Caminho 7677" d="M665.748,124.792h-8.012v-1.916a1.933,1.933,0,0,0-1.916-1.916H650.6a1.933,1.933,0,0,0-1.916,1.916v1.916h-8.012a.348.348,0,1,0,0,.7h3.483v17.73a2.832,2.832,0,0,0,2.821,2.821h12.435a2.832,2.832,0,0,0,2.821-2.821v-17.73h3.483a.329.329,0,0,0,.348-.348C666.061,124.931,665.957,124.792,665.748,124.792Zm-16.371-1.916a1.234,1.234,0,0,1,1.219-1.219h5.225a1.234,1.234,0,0,1,1.219,1.219v1.916h-7.663Zm12.192,20.342a2.133,2.133,0,0,1-2.125,2.125h-12.47a2.133,2.133,0,0,1-2.125-2.125v-17.73h16.72Z" transform="translate(-640.32 -120.96)" fill="none" stroke="#e12b3a" stroke-width="1"/><path id="Caminho_7678" data-name="Caminho 7678" d="M951.708,354.239a.329.329,0,0,0-.348.348v10.8a.348.348,0,0,0,.7,0v-10.8A.329.329,0,0,0,951.708,354.239Z" transform="translate(-938.82 -344.834)" fill="none" stroke="#e12b3a" stroke-width="1"/><path id="Caminho_7679" data-name="Caminho 7679" d="M865.308,354.239a.329.329,0,0,0-.348.348v10.8a.348.348,0,0,0,.7,0v-10.8A.329.329,0,0,0,865.308,354.239Z" transform="translate(-855.904 -344.834)" fill="none" stroke="#e12b3a" stroke-width="1"/><path id="Caminho_7680" data-name="Caminho 7680" d="M1038.108,354.239a.329.329,0,0,0-.348.348v10.8a.348.348,0,0,0,.7,0v-10.8A.329.329,0,0,0,1038.108,354.239Z" transform="translate(-1021.737 -344.834)" fill="none" stroke="#e12b3a" stroke-width="1"/></g></svg></button>`;
                $(".content .prefixo").append(btnClose);
            },
            closeInfoFreightWhenClickOutside: () => {
                $(document).on('click', function (e) {
                    e.preventDefault();
                    let $target = $(e.target);
                    if(!$target.closest('.freight-values').length && $(".freight-values").is(':visible')) {
                        $("#txtCep").val('');
                        $(".freight-values").hide();
                        $(".freight-values").empty();
                        $("#empty-shipping").hide();
                    }  
                });
            },
            applyEventButtonToggleCEP: () =>{
                $(document).on("click", "#empty-shipping", function () {
                    $("#txtCep").val('');
                    $(".freight-values").hide();
                    $(".freight-values").empty();
                    $("#empty-shipping").hide();
                });

                $(document).on("click", "#btnFreteSimulacao", function () {
                    $("#empty-shipping").show("slow");
                });
            },
            applyDiscountPerTicket: () => {
                let listSvgs = NewProduct.icons();
                let formatNumber = NewProduct.priceFormat();
                let wrapperPrice = $(".ajp-product__price--ticket");
                let valueDiscount = $("#ajp-discount").text();
                if (valueDiscount.length == 0) {
                    return;
                }
                valueDiscount = parseInt(valueDiscount);
                let skuAvailable = skuJson.skus.find(sku => {
                    return sku.available == true;
                });
                //let originalPrice = skuJson.skus[0].spotPrice;
                let originalPrice = skuAvailable.spotPrice;
                let calc = (originalPrice * valueDiscount) / 100;
                calc = originalPrice - calc;
                let result = `R$ ${formatNumber(calc / 100, 2, ",", ".")}`;
                var newBlock = `<div><span>À vista </span><span class="bill-total">${result}</span><span> com <span class="bill-discount">${valueDiscount}%</span> de desconto no boleto</span> ${listSvgs.boleto}</div>`;
                wrapperPrice.html(newBlock);
                wrapperPrice.addClass("discount-on");
            },
            applyDiscountPerTicketWhenSkuChange: () => {
                $(document).on("skuSelected.vtex", function (e, id, sku) {
                    NewProduct.applyDiscountPerTicket();
                });
            },
            icons: () => {
                let iconsSvg = {
                    boleto: `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve"><g><g><rect x="134.761" y="54.816" width="17.699" height="401.707"/><rect x="98.786" y="54.816" width="8.848" height="401.707"/><rect x="197.568" y="54.816" width="8.852" height="401.707"/><rect x="179.581" y="54.816" width="8.852" height="401.707"/><rect x="26.84" y="54.816" width="9.136" height="401.707"/><rect x="53.959" y="54.816" width="8.851" height="401.707"/><rect y="54.816" width="17.987" height="401.994"/><rect x="215.557" y="54.816" width="8.852" height="401.707"/><rect x="394.856" y="54.816" width="17.986" height="401.707"/><rect x="439.966" y="54.816" width="26.837" height="401.707"/><rect x="475.653" y="54.816" width="9.134" height="401.707"/><rect x="493.64" y="54.816" width="17.986" height="401.994"/><rect x="332.045" y="54.816" width="17.987" height="401.707"/><rect x="368.019" y="54.816" width="17.987" height="401.707"/><rect x="296.072" y="54.816" width="17.986" height="401.707"/><rect x="251.243" y="54.816" width="17.989" height="401.707"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`,
                    loaderSellers: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent; shape-rendering: auto;" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0 50 50)">
                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(30 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(60 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(90 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(120 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(150 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(180 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(210 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(240 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(270 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67" <animate="" attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></rect></g><g transform="rotate(300 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(330 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect></g></svg>`,
                    shop: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="20" height="20" x="0" y="0" viewBox="0 0 489.4 489.4" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M347.7,263.75h-66.5c-18.2,0-33,14.8-33,33v51c0,18.2,14.8,33,33,33h66.5c18.2,0,33-14.8,33-33v-51    C380.7,278.55,365.9,263.75,347.7,263.75z M356.7,347.75c0,5-4.1,9-9,9h-66.5c-5,0-9-4.1-9-9v-51c0-5,4.1-9,9-9h66.5    c5,0,9,4.1,9,9V347.75z" fill="#a61f67" data-original="#000000" style="" class=""/><path d="M489.4,171.05c0-2.1-0.5-4.1-1.6-5.9l-72.8-128c-2.1-3.7-6.1-6.1-10.4-6.1H84.7c-4.3,0-8.3,2.3-10.4,6.1l-72.7,128    c-1,1.8-1.6,3.8-1.6,5.9c0,28.7,17.3,53.3,42,64.2v211.1c0,6.6,5.4,12,12,12h66.3c0.1,0,0.2,0,0.3,0h93c0.1,0,0.2,0,0.3,0h221.4    c6.6,0,12-5.4,12-12v-209.6c0-0.5,0-0.9-0.1-1.3C472,224.55,489.4,199.85,489.4,171.05z M91.7,55.15h305.9l56.9,100.1H34.9    L91.7,55.15z M348.3,179.15c-3.8,21.6-22.7,38-45.4,38c-22.7,0-41.6-16.4-45.4-38H348.3z M232,179.15c-3.8,21.6-22.7,38-45.4,38    s-41.6-16.4-45.5-38H232z M24.8,179.15h90.9c-3.8,21.6-22.8,38-45.5,38C47.5,217.25,28.6,200.75,24.8,179.15z M201.6,434.35h-69    v-129.5c0-9.4,7.6-17.1,17.1-17.1h34.9c9.4,0,17.1,7.6,17.1,17.1v129.5H201.6z M423.3,434.35H225.6v-129.5    c0-22.6-18.4-41.1-41.1-41.1h-34.9c-22.6,0-41.1,18.4-41.1,41.1v129.6H66v-193.3c1.4,0.1,2.8,0.1,4.2,0.1    c24.2,0,45.6-12.3,58.2-31c12.6,18.7,34,31,58.2,31s45.5-12.3,58.2-31c12.6,18.7,34,31,58.1,31c24.2,0,45.5-12.3,58.1-31    c12.6,18.7,34,31,58.2,31c1.4,0,2.7-0.1,4.1-0.1L423.3,434.35L423.3,434.35z M419.2,217.25c-22.7,0-41.6-16.4-45.4-38h90.9    C460.8,200.75,441.9,217.25,419.2,217.25z" fill="#a61f67" data-original="#000000" style="" class=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>`
                }
                return iconsSvg;
            },
            priceFormat: () => {
                return function AJPformatNumber(n,t,e,i){n=(n+"").replace(/[^0-9+\-Ee.]/g,""),n=isFinite(+n)?+n:0,i=void 0===i?",":i,e=void 0===e?".":e;var r="";r=function(n,t){var e=Math.pow(10,t);return""+(Math.round(n*e)/e).toFixed(t)};return 3<(r=((t=isFinite(+t)?Math.abs(t):0)?r(n,t):""+Math.round(n)).split("."))[0].length&&(r[0]=r[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,i)),(r[1]||"").length<t&&(r[1]=r[1]||"",r[1]+=Array(t-r[1].length+1).join("0")),r.join(e)}
            }
        }

        let callAjaxStop = function () {
            NewProduct.ajaxStop();
        }

        // Instanciando a funcao
        $(document).ready(NewProduct.init)
        $(document).ajaxStop(callAjaxStop);
        $(window).load(NewProduct.windowOnload);

    } catch (e) {
        console.log('Erro na instancia [New Product]: ', e);
    }
})();
// wrapper.each(function() {
//     $(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
// });

// $.ajax({
//     type: "GET",
//     url: "/api/catalog_system/pub/products/search/?fq=productId:[ID-PRODUTO]",
//     dataType: "json",
//     contentType: "application/json",
//     headers: { 
//         "Content-Type": "application/json",
//         "Accept": "application/vnd.vtex.ds.v10+json"
//     }
// }).done(function (response) {
//     console.log(response);
// });

// $.ajax({
//     type: "GET",
//     url: "/productotherpaymentsystems/227749",
//     dataType: "json",
//     contentType: "application/json",
//     headers: { 
//         "Content-Type": "application/json",
//         "Accept": "application/vnd.vtex.ds.v10+json"
//     }
// }).done(function (response) {
//     console.log(response);
// });