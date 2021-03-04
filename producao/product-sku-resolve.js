const prodId = $('#___rc-p-id').attr("value");
var data = "/api/catalog_system/pub/products/search/?fq=productId:" + prodId + "";

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