/**
 * Avanti Comunicação <contato@penseavanti.com.br>
 * almeidajunior
 * @date Mon May 24 2021 12:52:26 GMT-0300 (GMT-03:00)
 */

"use strict";!function(){try{var o={init:function(){o.verifyIfProductAvaible(),o.getProductData(),o.applyTextsMobile(),o.openShipping(),o.applySlickInShelfs(),o.changeSellerIdInBuyButton(),o.toggleSellers(),o.verifySkuUnavaible(),o.accordionToSellers(),o.getSimilars(),o.applyEventButtonToggleCEP(),o.verifyIfBestPrice(),o.applyDiscountPerTicket(),o.applyDiscountPerTicketWhenSkuChange(),o.changeSlideWhenClick(),o.scrollToDescription(),o.applySimulateShipping(),o.applyToggleShipping(),o.applyCEPmask()},productData:{id:$("#___rc-p-id").val(),items:null,sellers:null,thumbs:null,skuIdSelected:null},imagesConfig:{image:{configMain:"530-550",configMainMobile:"350-300",configZoom:"1000-1000",configThumb:"100-100",configSimilars:"60-35"},regexList:{main:/530-550/g,thumb:/100-100/g,size:/#width#-#height#/g,uncle:/~/g}},breakpoints:{mobile:$(window).width()<=991,desktop:991<$(window).width()},windowOnload:function(){o.includeButtonCEP(),o.cepText()},ajaxStop:function(){},openShipping:function(){"function"==typeof window.ShippingValue&&window.ShippingValue()},verifyIfProductAvaible:function(){function a(t){t?$(document.body).addClass("ajp-prod-available").removeClass("ajp-prod-unavailable"):$(document.body).addClass("ajp-prod-unavailable").removeClass("ajp-prod-available")}$(document).on("skuSelected.vtex",function(t,e,i){a(i.available)}),a(skuJson.available),$(document.body).is(".ajp-prod-unavailable")&&($(".sku-notifyme-client-name").attr("placeholder","SEU NOME"),$(".sku-notifyme-client-email").attr("placeholder","SEU E-MAIL"),$(".sku-notifyme-button-ok").val("AVISE-ME QUANDO CHEGAR"),o.forceUnavaibleFront())},forceUnavaibleFront:function(){var t=$(".ajp-product__buybutton .portal-notify-me-ref"),e=$(".sku-selector-container.sku-selector-container-0"),i=$("#ajp-buybutton"),a=skuJson.skus.length,n=0;1<a&&skuJson.skus.forEach(function(t){0==t.available&&n++}),1==a&&(e.hide(),i.hide()),n==a&&(e.hide(),t.children(".notifyme.sku-notifyme").removeAttr("style"),t.find(".notifyme-title-div").removeAttr("style"),t.find(".notifyme.sku-notifyme > form").removeAttr("style"),t.find(".sku-notifyme-form.notifyme-form input").removeAttr("style"))},cepText:function(){$(document).is(".ajp-prod-unavailable")||$("#txtCep").attr("placeholder","Digite seu CEP")},verifySkuUnavaible:function(){var t=$(".sku-selector-container");$.isEmptyObject(skuJson.skus[0].dimensions)&&(console.log("Nenhum tamanho cadastrado. Erro de cadastro!"),t.parent().hide())},getProductData:function(){$.ajax({type:"GET",url:"/api/catalog_system/pub/products/search/?fq=productId:"+o.productData.id,dataType:"json",contentType:"application/json",headers:{"Content-Type":"application/json",Accept:"application/vnd.vtex.ds.v10+json"}}).done(function(t){o.productData.items=t[0].items,o.getSkuSellers(),o.buildThumbsImage(),o.applyDescriptionProduct(t[0]),o.applyAtribbutes(t[0]),o.breakpoints.mobile&&o.fixersMobile()})},buildThumbsImage:function(){var t=$(".ajp-product__image--main"),i=[],e="",a="";o.productData.items[0].images.forEach(function(t,e){0==e&&(o.breakpoints.desktop?a=(a=t.imageTag.replace(o.imagesConfig.regexList.size,o.imagesConfig.image.configMain)).replace(o.imagesConfig.regexList.uncle,""):o.breakpoints.mobile&&(a=(a=t.imageTag.replace(o.imagesConfig.regexList.size,o.imagesConfig.image.configMainMobile)).replace(o.imagesConfig.regexList.uncle,"")));t=t.imageTag.replace(o.imagesConfig.regexList.size,o.imagesConfig.image.configThumb).replace(o.imagesConfig.regexList.uncle,"");i.push(t)});for(var n=0;n<i.length;n++)e+='<li><a data-zoom="">'+i[n]+"</a></li>";t.html("<a>"+a+"</a>");var s=(s=t.find("img").attr("src")).replace(o.imagesConfig.regexList.main,"1000-1000");t.find("a").attr("href",s),o.breakpoints.mobile&&1==i.length||((s=$("<ul>"+e+"</ul>")).find("> li").each(function(){var t=$(this),e=t.find("img").attr("src");t.find("a").attr("data-zoom",e)}),o.productData.thumbs=s,o.breakpoints.desktop?o.applySlickVerticalDesktop():o.breakpoints.mobile&&o.applySlickHorizontalMobile())},applySlickHorizontalMobile:function(){$(".ajp-product__image--thumbs").html("<ul>"+o.productData.thumbs[0].innerHTML+"</ul>");var t=$(".ajp-product__image--thumbs > ul");if(t.children().length<5)return console.log("CAI AQUI"),$(".ajp-product__image--thumbs > ul").addClass("no-slick"),void o.applyClickChangeImages();var e=o.arrowsSlick();t.slick({slidesToShow:4,slidesToScroll:1,prevArrow:'<button type="button" class="slick-prev">'+e.prev+"</button>",nextArrow:'<button type="button" class="slick-next">'+e.next+"</button>",arrows:!0,dots:!1}),t.each(function(){$(this).find(".slick-arrow").wrapAll('<div class="slick-nav" />')}),o.changeImageSlickAndMainMobile()},applySlickVerticalDesktop:function(){var t=o.productData.thumbs,e=$(".ajp-product__imageaside--vertical");if(e.append("<ul>"+t[0].innerHTML+"</ul>"),e.find("> ul > li").length<5)return $(".ajp-product__imageaside--vertical > ul").addClass("no-slick"),o.applyEasyZoomFirstTime(),void o.applyClickChangeImages();t=o.arrowsSlickVertical();e.find("> ul").slick({slidesToShow:1,slidesToScroll:1,dots:!1,vertical:!0,prevArrow:'<button type="button" class="slick-prev">'+t.up+"</button>",nextArrow:'<button type="button" class="slick-next">'+t.down+"</button>",arrows:!0}),e.find(".slick-prev.slick-arrow").prependTo(e),e.find(".slick-next.slick-arrow").appendTo(e),o.applyEasyZoomFirstTime(),o.changeImageSlickVerticalAndMainImage()},changeImageSlickVerticalAndMainImage:function(){$(".ajp-product__imageaside--vertical .slick-initialized.slick-slider").on("beforeChange",function(t,e,i,a){var n=$(this).find(".slick-current").next(),s=(s=n.find("a").attr("data-zoom")).replace(o.imagesConfig.regexList.thumb,o.imagesConfig.image.configZoom),n=(n=n.find("a").attr("data-zoom")).replace(o.imagesConfig.regexList.thumb,o.imagesConfig.image.configMain);$(".ajp-product__image--main a").attr("href",s),$(".ajp-product__image--main img").attr("src",n),o.destroyAndInitEasyzoom()})},changeImageSlickAndMainMobile:function(){$(".ajp-product__image--thumbs .slick-initialized.slick-slider").on("beforeChange",function(t,e,i,a){var n=(n=$(this).find(".slick-current").next().find("img").attr("src")).replace(o.imagesConfig.regexList.thumb,o.imagesConfig.image.configMainMobile);$(".ajp-product__image--main img").attr("src",n)})},changeSlideWhenClick:function(){$(document).on("click",".ajp-product__imageaside--vertical .slick-slide",function(t){t.preventDefault();t=$(this).index();$(".ajp-product__imageaside--vertical .slick-slider.slick-vertical").slick("slickGoTo",t,!0)})},applyEasyZoomFirstTime:function(){$(".easyzoom").easyZoom().data("easyZoom")},destroyAndInitEasyzoom:function(){var t=$(".easyzoom").easyZoom().data("easyZoom");t.teardown(),t._init()},applyClickChangeImages:function(){o.breakpoints.desktop?$(document).on("click",".ajp-product__imageaside--vertical a",function(){var t=$(this).find("img").attr("src"),e=$(".ajp-product__image--main img"),i=$(".ajp-product__image--main a"),a=(t=t.replace(o.imagesConfig.regexList.thumb,o.imagesConfig.image.configMain)).replace(o.imagesConfig.regexList.main,o.imagesConfig.image.configZoom);e.attr("src",t),i.attr("href",a),o.destroyAndInitEasyzoom()}):o.breakpoints.mobile&&$(document).on("click",".ajp-product__image--thumbs a",function(){var t=$(this).find("img").attr("src"),e=$(".ajp-product__image--main img"),t=t.replace(o.imagesConfig.regexList.thumb,o.imagesConfig.image.configMainMobile);e.attr("src",t)})},arrowsSlick:function(){return{prev:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="18" height="18" x="0" y="0" viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8    c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712    L143.492,221.863z" fill="#000000" data-original="#000000" style=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>',next:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="18" height="18" x="0" y="0" viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M336.226,209.591l-204.8-204.8c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.712l192.734,192.734    L107.294,414.391c-6.663,6.664-6.663,17.468,0,24.132c6.665,6.663,17.468,6.663,24.132,0l204.8-204.8    C342.889,227.058,342.889,216.255,336.226,209.591z" fill="#000000" data-original="#000000" style="" class=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>'}},arrowsSlickVertical:function(){return{up:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 240.835 240.835" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><g xmlns="http://www.w3.org/2000/svg"><path id="Expand_Less" d="M129.007,57.819c-4.68-4.68-12.499-4.68-17.191,0L3.555,165.803c-4.74,4.74-4.74,12.427,0,17.155   c4.74,4.74,12.439,4.74,17.179,0l99.683-99.406l99.671,99.418c4.752,4.74,12.439,4.74,17.191,0c4.74-4.74,4.74-12.427,0-17.155   L129.007,57.819z" fill="#ffffff" data-original="#000000" style=""/><g></g><g></g><g></g><g></g><g></g><g></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>',down:'<?xml version="1.0"?>\n                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 240.811 240.811" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><path id="Expand_More" d="M220.088,57.667l-99.671,99.695L20.746,57.655c-4.752-4.752-12.439-4.752-17.191,0   c-4.74,4.752-4.74,12.451,0,17.203l108.261,108.297l0,0l0,0c4.74,4.752,12.439,4.752,17.179,0L237.256,74.859   c4.74-4.752,4.74-12.463,0-17.215C232.528,52.915,224.828,52.915,220.088,57.667z" fill="#ffffff" data-original="#000000" style=""/><g></g><g></g><g></g><g></g><g></g><g></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>'}},getSkuSellers:function(){var e,t,n=$(".ajp-product__sellers--list"),i=o.icons(),a=0,s=null;skuJson.skus.forEach(function(t){1==t.available&&(a++,s=t.sku)}),1<a?$(document).on("skuChanged.vtex",function(t,e,a){n.addClass("list-sellers-loading"),$(".ajp-product__sellers--open").addClass("hide"),$(".ajp-product__sellers--close").removeClass("hide"),$(".ajp-product__sellers--menssage").hide("fast"),$(".ajp-product__sellers--list").html(i.loaderSellers),$("#ajp-buybutton").removeAttr("this-sku-seller"),setTimeout(function(){var t=o.productData.items.filter(function(t){return t.itemId==a.sku}),e=t[0].sellers,i="";e.forEach(function(t){1!=t.sellerId&&(t='\n                                    <div class="seller-box--item">\n                                        <a>\n                                            <div class="box-item--infos">\n                                                <div class="item-infos">\n                                                    <span class="item-name">'+t.sellerName+'</span>\n                                                </div>\n                                                <span class="item-stock">Em estoque: '+t.commertialOffer.AvailableQuantity+'</span>\n                                            </div>\n                                            <div class="box-item--button">\n                                                <label class="container">\n                                                    <input type="radio" seller-id="'+t.sellerId+'" value="'+t.addToCartLink+'" name="lojas">\n                                                    <span class="checkmark"></span>\n                                                </label>\n                                            </div>\n                                        </a>\n                                    </div>',i+=t)}),n.html('<form data-sku-id="'+t[0].itemId+'">'+i+"</form>"),$(".ajp-product__sellers--list form > svg").remove(),n.find("a").first().click(),n.removeClass("list-sellers-loading")},1e3)}):1==a&&(t=o.productData.items.filter(function(t){return t.itemId==s}),$(".ajp-product__sellers--open").hide(),e="",t[0].sellers.forEach(function(t){1!=t.sellerId&&(t='\n                            <div class="seller-box--item one">\n                                <a>\n                                    <div class="box-item--infos">\n                                        <div class="item-infos">\n                                            <span class="item-name">'+t.sellerName+'</span>\n                                        </div>\n                                        <span class="item-stock">Em estoque: '+t.commertialOffer.AvailableQuantity+'</span>\n                                    </div>\n                                    <div class="box-item--button">\n                                        <label class="container">\n                                            <input type="radio" seller-id="'+t.sellerId+'" value="'+t.addToCartLink+'" name="lojas">\n                                            <span class="checkmark"></span>\n                                        </label>\n                                    </div>\n                                </a>\n                            </div>',e+=t)}),n.html('<form data-sku-id="'+t[0].itemId+'">'+e+"</form>"),n.find("a").first().click(),(t=$(".box-item--button input")).attr("checked",!0),$("#ajp-buybutton").attr("this-sku-seller",t.attr("seller-id")))},verifyIfBestPrice:function(){var t=$(".ajp-product__price .valor-por.price-best-price .skuBestPrice"),e=$(".ajp-product__price .preco-a-vista.price-cash .skuPrice");t.length&&e.length&&(t=t.text(),e=e.text(),t=(t=t.replace(/R\$ /g,"")).replace(/,/g,""),e=(e=e.replace(/R\$ /g,"")).replace(/,/g,""),(t=t.match(/\./g)?t.replace(/\./g,""):t)!=(e=e.match(/\./g)?e.replace(/\./g,""):e)&&$(".ajp-product__price .preco-a-vista.price-cash").show())},setSellerIdInBuyButton:function(t){t=t.find(function(t){if(1==t.sellerDefault)return t.sellerId});$(".buy-button.buy-button-ref").attr("this-sku-seller",t.sellerId),$("#ajp-buybutton").attr("this-sku-seller",t.sellerId)},changeSellerIdInBuyButton:function(){$(document).on("click",".ajp-product__sellers--list a",function(){var t=$(this),e=t.find('input[name="lojas"]').attr("seller-id");t.find('input[name="lojas"]').attr("checked",!0),$(".buy-button.buy-button-ref").attr("this-sku-seller",e),$("#ajp-buybutton").attr("this-sku-seller",e)})},toggleSellers:function(){var t=$(".ajp-product__sellers--menssage");$(".ajp-product__sellers--open").on("click",function(){0!=$(".ajp-product__sellers--list").children().length?($(".ajp-product__sellers--list").slideToggle("fast"),$(this).addClass("hide"),$(".ajp-product__sellers--close").removeClass("hide")):t.show("fast")}),$(".ajp-product__sellers--close").on("click",function(){0!=$(".ajp-product__sellers--list").children().length&&($(".ajp-product__sellers--list").slideToggle("fast"),$(this).addClass("hide"),$(".ajp-product__sellers--open").removeClass("hide"))})},applyTextsMobile:function(){var t=$(".ajp-product__infosmobile"),e=$(".ajp-product__name div").text(),i=$(".ajp-product__brand a").clone(),a=$(".ajp-product__yourviews #yv-review-quickreview").clone();t.find(".mobile-brand").html(i),t.find(".mobile-name").html("<span>"+e+"</span>"),t.find(".mobile-yourviews").html(a)},fixersMobile:function(){$(".ajp-product__image--main a").removeAttr("href")},applyDescriptionProduct:function(t){0!=t.description.length?(t="<h3>"+t.description+"</h3>",$(".ajp-product__spec").append($(t))):$(".ajp-product__spec").hide()},applyAtribbutes:function(t){var e=/attributes-ordenar|inativo/g,i=t.productId,a=t.items[0].itemId;try{$.ajax({type:"POST",url:"/attributes/get/snippet/"+i+"/"+a,data:""}).done(function(t){t&&t.length&&(t.match(e)?$(".ajp-product__att").hide():$(".ajp-product__att").html(t))})}catch(t){console.log("Erro ao buscar atributos: ",t)}},applySlickInShelfs:function(){var t=$(".ajp-product__whobought.j-shelf .main-shelf > ul"),e=$(".ajp-product__similars.j-shelf .main-shelf > ul");4<t.children("li[layout]").length&&t.slick({slidesToShow:4,slidesToScroll:1,autoplay:!0,autoplaySpeed:3e3,arrows:!1,dots:!0,responsive:[{breakpoint:1200,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:991,settings:{slidesToShow:2,slidesToScroll:2}}]}),4<e.children("li[layout]").length&&e.slick({slidesToShow:4,slidesToScroll:1,autoplay:!0,autoplaySpeed:3e3,arrows:!1,dots:!1,responsive:[{breakpoint:1200,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:991,settings:{slidesToShow:2,slidesToScroll:2}}]})},getSimilars:function(){var t="/api/catalog_system/pub/products/crossselling/similars/"+o.productData.id;$.ajax({type:"GET",url:t,dataType:"json",contentType:"application/json",headers:{"Content-Type":"application/json",Accept:"application/vnd.vtex.ds.v10+json"}}).done(function(t){t.length?o.renderSimilars(t):$(".ajp-product__selection--colors").hide()})},renderSimilars:function(t){var e=$(".ajp-product__selection--colors ul"),i="";t.forEach(function(t){var e=t.items[0].images[0].imageTag;e=(e=e.replace(o.imagesConfig.regexList.uncle,"")).replace(o.imagesConfig.regexList.size,o.imagesConfig.image.configSimilars);e='\n                        <li>\n                            <a href="/'+t.linkText+'/p" data-toggle="tooltip" title="'+t.Cor[0]+'">\n                                '+e+"\n                            </a>\n                        </li>\n                    ";i+=e}),e.append(i),$(".ajp-product__selection--colors > svg").hide()},accordionToSellers:function(){var t,e;o.breakpoints.mobile&&(t=$(".select.skuList"),e=$(".ajp-product__sellers--list"),t.on("change",function(){$("html, body").stop().animate({scrollTop:e.offset().top-130},1e3,"swing")}))},includeButtonCEP:function(){$("#empty-shipping").length||$(".content .prefixo").append('<button id="empty-shipping" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 26.741 26.08"><g id="Grupo_5303" data-name="Grupo 5303" transform="translate(0.5 0.5)" opacity="0.6"><path id="Caminho_7677" data-name="Caminho 7677" d="M665.748,124.792h-8.012v-1.916a1.933,1.933,0,0,0-1.916-1.916H650.6a1.933,1.933,0,0,0-1.916,1.916v1.916h-8.012a.348.348,0,1,0,0,.7h3.483v17.73a2.832,2.832,0,0,0,2.821,2.821h12.435a2.832,2.832,0,0,0,2.821-2.821v-17.73h3.483a.329.329,0,0,0,.348-.348C666.061,124.931,665.957,124.792,665.748,124.792Zm-16.371-1.916a1.234,1.234,0,0,1,1.219-1.219h5.225a1.234,1.234,0,0,1,1.219,1.219v1.916h-7.663Zm12.192,20.342a2.133,2.133,0,0,1-2.125,2.125h-12.47a2.133,2.133,0,0,1-2.125-2.125v-17.73h16.72Z" transform="translate(-640.32 -120.96)" fill="none" stroke="#e12b3a" stroke-width="1"/><path id="Caminho_7678" data-name="Caminho 7678" d="M951.708,354.239a.329.329,0,0,0-.348.348v10.8a.348.348,0,0,0,.7,0v-10.8A.329.329,0,0,0,951.708,354.239Z" transform="translate(-938.82 -344.834)" fill="none" stroke="#e12b3a" stroke-width="1"/><path id="Caminho_7679" data-name="Caminho 7679" d="M865.308,354.239a.329.329,0,0,0-.348.348v10.8a.348.348,0,0,0,.7,0v-10.8A.329.329,0,0,0,865.308,354.239Z" transform="translate(-855.904 -344.834)" fill="none" stroke="#e12b3a" stroke-width="1"/><path id="Caminho_7680" data-name="Caminho 7680" d="M1038.108,354.239a.329.329,0,0,0-.348.348v10.8a.348.348,0,0,0,.7,0v-10.8A.329.329,0,0,0,1038.108,354.239Z" transform="translate(-1021.737 -344.834)" fill="none" stroke="#e12b3a" stroke-width="1"/></g></svg></button>')},closeInfoFreightWhenClickOutside:function(){$(document).on("click",function(t){t.preventDefault(),!$(t.target).closest(".freight-values").length&&$(".freight-values").is(":visible")&&($("#txtCep").val(""),$(".freight-values").hide(),$(".freight-values").empty(),$("#empty-shipping").hide())})},applyEventButtonToggleCEP:function(){$(document).on("click","#empty-shipping",function(){$("#txtCep").val(""),$(".freight-values").hide(),$(".freight-values").empty(),$("#empty-shipping").hide()}),$(document).on("click","#btnFreteSimulacao",function(){$("#empty-shipping").show("slow")})},applyDiscountPerTicket:function(){o.icons();var t=o.priceFormat(),e=$(".ajp-product__price--ticket"),i=$("#ajp-discount").text();0!=i.length&&(i=parseInt(i),i='<div><span class="bill-total">'+("R$ "+t(((t=skuJson.skus.find(function(t){return 1==t.available}).spotPrice)-t*i/100)/100,2,",","."))+'</span><span>À vista com <span class="bill-discount">'+i+"%</span> de desconto no boleto</span></div>",e.html(i),e.addClass("discount-on"))},applyDiscountPerTicketWhenSkuChange:function(){$(document).on("skuSelected.vtex",function(t,e,i){o.icons();var a=o.priceFormat(),n=$(".ajp-product__price--ticket"),s=$("#ajp-discount").text();0!=s.length&&(s=parseInt(s),s='<div><span class="bill-total">'+("R$ "+a(((i=i.spotPrice)-i*s/100)/100,2,",","."))+'</span><span>À vista com <span class="bill-discount">'+s+"%</span> de desconto no boleto</span></div>",n.html(s),n.addClass("discount-on"))})},applySimulateShipping:function(){var t=$("#simulate-shipping"),i=$(".content.table"),a=/<th>Valor do frete deste produto<\/th>/g,n=null;t.on("click",function(){var t=$(".buttons.cep input").val();(t=t.replace(/-/g,"")).length<8?alert("CEP no formato incorreto."):$.ajax({type:"GET",url:"/frete/calcula/313241?shippinCep="+t+"&quantity=1"}).done(function(t){var e;t&&t.length&&(2<$(t).find("tbody > tr").length?(n=t.replace(a,"<th>Valor</th>"),(e=$(n)).find("tbody > tr").each(function(t){0!=t&&1!=t&&$(this).addClass("hide")}),i.html($(e))):(n=t.replace(a,"<th>Valor</th>"),i.html(n)))})})},applyToggleShipping:function(){$("#freight-button").on("click",function(){$(".ajp-product__freight--content .content-wrapper").slideToggle()})},scrollToDescription:function(){var t=$("#accordion-description"),e=$(".ajp-product__boxtexts");t.on("click",function(){$("html, body").animate({scrollTop:e.offset().top-80},1e3)})},applyCEPmask:function(){var t=$(".buttons.cep input"),e="";t.on("keyup",function(){(e=t.val())?8!=e.length||e.match(/-/g)||t.val(e.substr(0,5)+"-"+e.substr(5,9)):$(".content.table").empty()})},icons:function(){return{boleto:'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve"><g><g><rect x="134.761" y="54.816" width="17.699" height="401.707"/><rect x="98.786" y="54.816" width="8.848" height="401.707"/><rect x="197.568" y="54.816" width="8.852" height="401.707"/><rect x="179.581" y="54.816" width="8.852" height="401.707"/><rect x="26.84" y="54.816" width="9.136" height="401.707"/><rect x="53.959" y="54.816" width="8.851" height="401.707"/><rect y="54.816" width="17.987" height="401.994"/><rect x="215.557" y="54.816" width="8.852" height="401.707"/><rect x="394.856" y="54.816" width="17.986" height="401.707"/><rect x="439.966" y="54.816" width="26.837" height="401.707"/><rect x="475.653" y="54.816" width="9.134" height="401.707"/><rect x="493.64" y="54.816" width="17.986" height="401.994"/><rect x="332.045" y="54.816" width="17.987" height="401.707"/><rect x="368.019" y="54.816" width="17.987" height="401.707"/><rect x="296.072" y="54.816" width="17.986" height="401.707"/><rect x="251.243" y="54.816" width="17.989" height="401.707"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',loaderSellers:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent; shape-rendering: auto;" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0 50 50)">\n                    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(30 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(60 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(90 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(120 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(150 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(180 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(210 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(240 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(270 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67" <animate="" attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></rect></g><g transform="rotate(300 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(330 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#a61f67"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect></g></svg>',shop:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="20" height="20" x="0" y="0" viewBox="0 0 489.4 489.4" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M347.7,263.75h-66.5c-18.2,0-33,14.8-33,33v51c0,18.2,14.8,33,33,33h66.5c18.2,0,33-14.8,33-33v-51    C380.7,278.55,365.9,263.75,347.7,263.75z M356.7,347.75c0,5-4.1,9-9,9h-66.5c-5,0-9-4.1-9-9v-51c0-5,4.1-9,9-9h66.5    c5,0,9,4.1,9,9V347.75z" fill="#a61f67" data-original="#000000" style="" class=""/><path d="M489.4,171.05c0-2.1-0.5-4.1-1.6-5.9l-72.8-128c-2.1-3.7-6.1-6.1-10.4-6.1H84.7c-4.3,0-8.3,2.3-10.4,6.1l-72.7,128    c-1,1.8-1.6,3.8-1.6,5.9c0,28.7,17.3,53.3,42,64.2v211.1c0,6.6,5.4,12,12,12h66.3c0.1,0,0.2,0,0.3,0h93c0.1,0,0.2,0,0.3,0h221.4    c6.6,0,12-5.4,12-12v-209.6c0-0.5,0-0.9-0.1-1.3C472,224.55,489.4,199.85,489.4,171.05z M91.7,55.15h305.9l56.9,100.1H34.9    L91.7,55.15z M348.3,179.15c-3.8,21.6-22.7,38-45.4,38c-22.7,0-41.6-16.4-45.4-38H348.3z M232,179.15c-3.8,21.6-22.7,38-45.4,38    s-41.6-16.4-45.5-38H232z M24.8,179.15h90.9c-3.8,21.6-22.8,38-45.5,38C47.5,217.25,28.6,200.75,24.8,179.15z M201.6,434.35h-69    v-129.5c0-9.4,7.6-17.1,17.1-17.1h34.9c9.4,0,17.1,7.6,17.1,17.1v129.5H201.6z M423.3,434.35H225.6v-129.5    c0-22.6-18.4-41.1-41.1-41.1h-34.9c-22.6,0-41.1,18.4-41.1,41.1v129.6H66v-193.3c1.4,0.1,2.8,0.1,4.2,0.1    c24.2,0,45.6-12.3,58.2-31c12.6,18.7,34,31,58.2,31s45.5-12.3,58.2-31c12.6,18.7,34,31,58.1,31c24.2,0,45.5-12.3,58.1-31    c12.6,18.7,34,31,58.2,31c1.4,0,2.7-0.1,4.1-0.1L423.3,434.35L423.3,434.35z M419.2,217.25c-22.7,0-41.6-16.4-45.4-38h90.9    C460.8,200.75,441.9,217.25,419.2,217.25z" fill="#a61f67" data-original="#000000" style="" class=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>'}},priceFormat:function(){return function(t,e,i,a){t=(t+"").replace(/[^0-9+\-Ee.]/g,""),t=isFinite(+t)?+t:0,a=void 0===a?",":a,i=void 0===i?".":i;var n="",n=function(t,e){var i=Math.pow(10,e);return""+(Math.round(t*i)/i).toFixed(e)};return 3<(n=((e=isFinite(+e)?Math.abs(e):0)?n(t,e):""+Math.round(t)).split("."))[0].length&&(n[0]=n[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,a)),(n[1]||"").length<e&&(n[1]=n[1]||"",n[1]+=Array(e-n[1].length+1).join("0")),n.join(i)}}};$(document).ready(o.init),$(document).ajaxStop(function(){o.ajaxStop()}),$(window).load(o.windowOnload)}catch(t){console.log("Erro na instancia [New Product]: ",t)}}();