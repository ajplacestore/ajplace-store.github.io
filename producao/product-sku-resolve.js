const prodId = $('#___rc-p-id').attr("value");
var data = "/api/catalog_system/pub/products/search/?fq=productId:" + prodId + "";

$('.modal-full-image--close').on('click', function () {
    $('.modal-full-image').addClass('inactive');
    $('.modal-full-image--full img').remove();
    $('.modal-full-image--list li').remove();
});

// EasyZoom
$.getJSON(data, function (data) {
    $.each(data, function (key, val) {
        // Montagem Imagem do produto BEGIN //
        var items = val.items[0].images;
        var firstItem = val.items[0].images[0];

        // Montando Primeira Imagem
        $(firstItem).each(function (key, val) {
            const imageID = val.imageId;
            const imageName = val.imageText;
            $('<a href="/arquivos/ids/' + imageID + '-1000-1000/' + imageName + '.jpg"><img src="/arquivos/ids/' + imageID + '-486-625/' + imageName + '.jpg" /></a>').appendTo('.j-product__box--image--image.easyzoom');
        });

        // Montando Thumbs
        $(items).each(function (key, val) {
            const imageID = val.imageId;
            const imageName = val.imageText;

            // $('<li><a href="/arquivos/ids/' + imageID + '-1000-1000/' + imageName + '.jpg" data-standard="/arquivos/ids/' + imageID + '-486-625/' + imageName + '.jpg"><img src="/arquivos/ids/' + imageID + '-86-86/' + imageName + '.jpg" /></a></li>').appendTo('.j-product__box--image--thumbs ul');
            $('<li><a data-standard="/arquivos/ids/' + imageID + '-486-625/' + imageName + '.jpg"><img src="/arquivos/ids/' + imageID + '-86-86/' + imageName + '.jpg" /></a></li>').appendTo('.j-product__box--image--thumbs ul');
        });

        // FancyBox
        $(items).each(function (key, val) {
            const imageID2 = val.imageId;
            const imageName2 = val.imageText;
            $('<img src="/arquivos/ids/' + imageID2 + '-1000-1000/' + imageName2 + '.jpg" />').appendTo('.modal-full-image--full');
            $('.modal-full-image img').first().nextAll().remove();
            $('<li><a data-standard="/arquivos/ids/' + imageID2 + '-1000-1000/' + imageName2 + '.jpg"><img src="/arquivos/ids/' + imageID2 + '-86-86/' + imageName2 + '.jpg" /></a></li>').appendTo('.modal-full-image--list');

            // Montando dentro do Fancybox
            $('.j-product__box--image--image.easyzoom').on('click', function (key, val) {
                $('.modal-full-image').removeClass('inactive');
                
                // Gambiarra
                setInterval(function(){
                    $('.modal-full-image--list li a').on('click', function(){
                        console.log('CLIQUEI')
                        const openedListItem = $(this).attr('data-standard');
                        $('.modal-full-image--full img').remove();
                        $('<img src="' + openedListItem + '" />').appendTo('.modal-full-image--full');
                    });
                }, 3000);
            });
        });

        // Iniciando EasyZoom
        var $easyzoom = $('.easyzoom').easyZoom();
        var api = $easyzoom.data('easyZoom');

        if ($(window).width() > 992) {
            // Montagem Slick se maior que 5 Thumbs
            if ($('ul.thumbnails li').length > 5) {
                console.log('DESKTOP SLICK');
                $('ul.thumbnails').not('.slick-initialized').slick({
                    dots: false,
                    arrows: true,
                    vertical: true,
                    slidesToShow: 5,
                    slidesToScroll: 1
                });
            }
        }


        if ($(window).width() <= 991) {
            $('.sku-selector-container').insertBefore('.product-seller');
            if ($('ul.thumbnails li').length > 5) {
                console.log('MOBILE SLICK');
                $('ul.thumbnails').not('.slick-initialized').slick({
                    dots: false,
                    arrows: false,
                    vertical: false,
                    slidesToShow: 5,
                    slidesToScroll: 1
                });
                console.log('HEREE')
                //$('ul.thumbnails').find('a').removeAttr('data-standard');

                $('.slick-prev').html('<i class="fas fa-arrow-right"></i>');
                $('.slick-next').html('<i class="fas fa-arrow-right"></i>');

                // $('ul.thumbnails').find('a').removeAttr('href');
                // $('ul.thumbnails').find('a').css('pointer-events', 'none');
            }
        }

        // Acao Clique Thumbs com troca de imagem
        if ($(window).width() > 992) {
            $('ul.thumbnails a').on('click', function (event) {
                console.log('CLIQUEI 222')
                event.preventDefault();
                const myLink = $(this).attr('href');
                const myImg = $(this).attr('data-standard');
                $('.easyzoom').remove();
                $('<div class="j-product__box--image--image easyzoom easyzoom--overlay easyzoom--with-thumbnails is-ready"></div>').insertAfter('.j-product__box--image--thumbs');
                $('<a href="' + myLink + '"><img src="' + myImg + '" /></a>').appendTo('.easyzoom');
    
                // Reiniciando EasyZoom
                var $easyzoom = $('.easyzoom').easyZoom();
                var api = $easyzoom.data('easyZoom');
            });
        }
        // Montagem Imagem do produto END //

        // ---------------- !! ---------------- //
    });
});

// MOUNTING PAGE
$(document).ajaxStop(function () {
    
    // CEP Give Placeholder
    var txtCep = $("#txtCep");
    $(txtCep).attr("placeholder", "Calcule o frete");
    
    if ($('.seller-info-more').length > 0) {
        // Get Sellers
        $.getJSON(data, function (data) {
            $.each(data, function (key, val) {
                // Remove Avanti Items
                $('.sellers-list div').remove();
                $('.sellers-list a').remove();
                $('.topic.Tamanho').remove();

                // Get Items
                var ele = val.items;
                $('<h3 class="specification">Tamanho</h3><ul class="sku-paleative-list"></ul>').appendTo('.sku-selector-container');
                $('<div class="seller-list-paleative"><div class="seller-info all-border seller-info--opened" style="display: block !important;"><div class="seller-info--name" style="padding: 20px 10px 20px 50px;">Escolha o seu tamanho para verificar as lojas disponí­veis para venda</div></div></div>').appendTo('.j-product__box.stores');

                // Show SKU Atribute
                $(ele).each(function (key, val) {
                    var name = val.Tamanho;
                    $('<li>' + name + '</li>').appendTo('.sku-paleative-list');
                });

                // Add Class to List Elements
                $('.sku-paleative-list li:first-child').addClass('0');
                var except = $('.sku-paleative-list li:nth-child(1)').nextAll();
                $('.sku-paleative-list').find(except).each(function (el) {
                    $(this).addClass('' + (el + 1));
                });

                // Creating Links
                $('.sku-paleative-list li').on('click', function () {
                    const state = $(this);
                    $('.sku-paleative-list li').removeAttr('active');
                    $(this).attr('active', 'true');
                    const me = $(this).attr('class');
                    var myConsult = val.items[me].sellers;
                    $('.j-product__box.stores div').remove();

                    // Get Name, Link and Quantity
                    $(myConsult).each(function (key, val) {
                        var names = val.sellerName;
                        var links = val.addToCartLink;
                        var quantity = val.commertialOffer.AvailableQuantity;

                        $('<div class="seller-info all-border seller-info--opened ' + names + '"><div class="seller-info--name"><a class="store-link" quantity="' + quantity + '" href="' + links + '">' + names + '</a></div></div>').appendTo('.j-product__box.stores');

                        $('.seller-info').on('click', function () {
                            $('.seller-info').removeClass('active');
                            $(this).addClass('active');
                        });

                        if ($('.j-product__box.stores .seller-info').length == 1) {
                            $('.j-product__box.stores .seller-info.ALMEIDA.JUNIOR').addClass('--force--display');
                            $('.seller-info.ALMEIDA.JUNIOR a.store-link').text('Este produto encontra-se indisponí­vel.');
                            $('.seller-info.ALMEIDA.JUNIOR a.store-link').trigger('click');
                        };

                        // Make User Dynamic
                        $('.store-link').each(function () {
                            $(this).on('click', function (event) {
                                event.preventDefault();
                                var myLink = $(this).attr('href');

                                var enableOrDisable = $(this).attr('quantity');

                                $(state).attr('quantity', enableOrDisable);

                                $('.j-product__box .buy-button').attr('href', myLink);
                                $('.j-product__box .buy-button').attr('data-href', myLink);
                            });
                        });
                    });
                });
            });
        });
    } else {
        $('.sellers-list').addClass('force-show');
        $('.seller-info').addClass('active');
    }
});

if ($(window).width() <= 991) {
    if ($(".j-shelf ul").length) {
        $(".j-shelf ul").not('.slick-initialized').slick({
            dots: false,
            arrows: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
        $(".j-shelf ul").each(function() {
            $(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
        });
    }
} else {
    if ($(".j-shelf ul").length) {
        $(".j-shelf ul").not('.slick-initialized').slick({
            dots: true,
            arrows: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4
        });
    }
}