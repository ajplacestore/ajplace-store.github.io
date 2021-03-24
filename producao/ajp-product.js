/**
 * Avanti Comunicação <contato@penseavanti.com.br>
 * almeidajunior
 * @date Wed Mar 24 2021 15:19:49 GMT-0300 (GMT-03:00)
 */

"use strict";!function(){try{var o={init:function(){o.verifyIfProductAvaible(),o.getProductData(),o.applyTextsMobile(),o.openShipping(),o.applySlickInShelfs(),o.changeSellerIdInBuyButton(),o.toggleSellers(),o.verifySkuUnavaible(),o.accordionToSellers(),o.getSimilars(),o.applyEventButtonToggleCEP()},productData:{id:$("#___rc-p-id").val(),items:null,sellers:null,thumbs:null,skuIdSelected:null},imagesConfig:{image:{configMain:"530-550",configMainMobile:"350-300",configZoom:"1000-1000",configThumb:"100-100",configSimilars:"60-35"},regexList:{main:/530-550/g,thumb:/100-100/g,size:/#width#-#height#/g,uncle:/~/g}},breakpoints:{mobile:$(window).width()<=991,desktop:991<$(window).width()},windowOnload:function(){o.includeButtonCEP(),o.cepText()},ajaxStop:function(){},openShipping:function(){"function"==typeof window.ShippingValue&&window.ShippingValue()},verifyIfProductAvaible:function(){function n(t){t?$(document.body).addClass("ajp-prod-available").removeClass("ajp-prod-unavailable"):$(document.body).addClass("ajp-prod-unavailable").removeClass("ajp-prod-available")}$(document).on("skuSelected.vtex",function(t,s,e){n(e.available)}),n(skuJson.available),$(document.body).is(".ajp-prod-unavailable")&&($(".sku-notifyme-client-name").attr("placeholder","SEU NOME"),$(".sku-notifyme-client-email").attr("placeholder","SEU E-MAIL"),$(".sku-notifyme-button-ok").val("AVISE-ME QUANDO CHEGAR"))},cepText:function(){$(document).is(".ajp-prod-unavailable")||$("#txtCep").attr("placeholder","Digite seu CEP")},verifySkuUnavaible:function(){var t=$(".sku-selector-container");$.isEmptyObject(skuJson.skus[0].dimensions)&&(console.log("Nenhum tamanho cadastrado. Erro de cadastro!"),t.parent().hide())},getProductData:function(){$.ajax({type:"GET",url:"/api/catalog_system/pub/products/search/?fq=productId:"+o.productData.id,dataType:"json",contentType:"application/json",headers:{"Content-Type":"application/json",Accept:"application/vnd.vtex.ds.v10+json"}}).done(function(t){o.productData.items=t[0].items,o.getSkuInfos(),o.buildThumbsImage(),o.applyDescriptionProduct(t[0]),o.applyAtribbutes(t[0]),o.breakpoints.mobile&&o.fixersMobile()})},buildThumbsImage:function(){var t=$(".ajp-product__image--main"),e=[],s="",n="";o.productData.items[0].images.forEach(function(t,s){0==s&&(o.breakpoints.desktop?n=(n=t.imageTag.replace(o.imagesConfig.regexList.size,o.imagesConfig.image.configMain)).replace(o.imagesConfig.regexList.uncle,""):o.breakpoints.mobile&&(n=(n=t.imageTag.replace(o.imagesConfig.regexList.size,o.imagesConfig.image.configMainMobile)).replace(o.imagesConfig.regexList.uncle,"")));t=t.imageTag.replace(o.imagesConfig.regexList.size,o.imagesConfig.image.configThumb).replace(o.imagesConfig.regexList.uncle,"");e.push(t)});for(var g=0;g<e.length;g++)s+='<li><a data-zoom="">'+e[g]+"</a></li>";t.html("<a>"+n+"</a>");var a=(a=t.find("img").attr("src")).replace(o.imagesConfig.regexList.main,"1000-1000");t.find("a").attr("href",a);a=$("<ul>"+s+"</ul>");a.find("> li").each(function(){var t=$(this),s=t.find("img").attr("src");t.find("a").attr("data-zoom",s)}),o.productData.thumbs=a,o.breakpoints.desktop?o.applySlickVerticalDesktop():o.breakpoints.mobile&&o.applySlickHorizontalMobile()},applySlickHorizontalMobile:function(){$(".ajp-product__image--thumbs").html("<ul>"+o.productData.thumbs[0].innerHTML+"</ul>");var t=$(".ajp-product__image--thumbs > ul");if(t.children().length<4)return $(".ajp-product__image--thumbs > ul").addClass("no-slick"),void o.applyClickChangeImages();var s=o.arrowsSlick();t.slick({slidesToShow:4,slidesToScroll:1,prevArrow:'<button type="button" class="slick-prev">'+s.prev+"</button>",nextArrow:'<button type="button" class="slick-next">'+s.next+"</button>",arrows:!0,dots:!1}),t.each(function(){$(this).find(".slick-arrow").wrapAll('<div class="slick-nav" />')}),o.changeImageSlickAndMainMobile()},applySlickVerticalDesktop:function(){var t=o.productData.thumbs,s=$(".ajp-product__imageaside--vertical");if(s.append("<ul>"+t[0].innerHTML+"</ul>"),s.find("> ul > li").length<5)return $(".ajp-product__imageaside--vertical > ul").addClass("no-slick"),o.applyEasyZoomFirstTime(),void o.applyClickChangeImages();t=o.arrowsSlickVertical();s.find("> ul").slick({slidesToShow:1,slidesToScroll:1,dots:!1,vertical:!0,prevArrow:'<button type="button" class="slick-prev">'+t.up+"</button>",nextArrow:'<button type="button" class="slick-next">'+t.down+"</button>",arrows:!0}),o.applyEasyZoomFirstTime(),o.changeImageSlickVerticalAndMainImage()},changeImageSlickVerticalAndMainImage:function(){$(".ajp-product__imageaside--vertical .slick-initialized.slick-slider").on("beforeChange",function(t,s,e,n){var g=$(this).find(".slick-current").next(),a=(a=g.find("a").attr("data-zoom")).replace(o.imagesConfig.regexList.thumb,o.imagesConfig.image.configZoom),g=(g=g.find("a").attr("data-zoom")).replace(o.imagesConfig.regexList.thumb,o.imagesConfig.image.configMain);$(".ajp-product__image--main a").attr("href",a),$(".ajp-product__image--main img").attr("src",g),o.destroyAndInitEasyzoom()})},changeImageSlickAndMainMobile:function(){$(".ajp-product__image--thumbs .slick-initialized.slick-slider").on("beforeChange",function(t,s,e,n){var g=(g=$(this).find(".slick-current").next().find("img").attr("src")).replace(o.imagesConfig.regexList.thumb,o.imagesConfig.image.configMainMobile);$(".ajp-product__image--main img").attr("src",g)})},applyEasyZoomFirstTime:function(){$(".easyzoom").easyZoom().data("easyZoom")},destroyAndInitEasyzoom:function(){var t=$(".easyzoom").easyZoom().data("easyZoom");t.teardown(),t._init()},arrowsSlick:function(){return{prev:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="18" height="18" x="0" y="0" viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8    c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712    L143.492,221.863z" fill="#000000" data-original="#000000" style=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>',next:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="18" height="18" x="0" y="0" viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M336.226,209.591l-204.8-204.8c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.712l192.734,192.734    L107.294,414.391c-6.663,6.664-6.663,17.468,0,24.132c6.665,6.663,17.468,6.663,24.132,0l204.8-204.8    C342.889,227.058,342.889,216.255,336.226,209.591z" fill="#000000" data-original="#000000" style="" class=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>'}},arrowsSlickVertical:function(){return{up:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 240.835 240.835" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><g xmlns="http://www.w3.org/2000/svg"><path id="Expand_Less" d="M129.007,57.819c-4.68-4.68-12.499-4.68-17.191,0L3.555,165.803c-4.74,4.74-4.74,12.427,0,17.155   c4.74,4.74,12.439,4.74,17.179,0l99.683-99.406l99.671,99.418c4.752,4.74,12.439,4.74,17.191,0c4.74-4.74,4.74-12.427,0-17.155   L129.007,57.819z" fill="#ffffff" data-original="#000000" style=""/><g></g><g></g><g></g><g></g><g></g><g></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>',down:'<?xml version="1.0"?>\n                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 240.811 240.811" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><path id="Expand_More" d="M220.088,57.667l-99.671,99.695L20.746,57.655c-4.752-4.752-12.439-4.752-17.191,0   c-4.74,4.752-4.74,12.451,0,17.203l108.261,108.297l0,0l0,0c4.74,4.752,12.439,4.752,17.179,0L237.256,74.859   c4.74-4.752,4.74-12.463,0-17.215C232.528,52.915,224.828,52.915,220.088,57.667z" fill="#ffffff" data-original="#000000" style=""/><g></g><g></g><g></g><g></g><g></g><g></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>'}},getSkuInfos:function(){var s,t,i=$(".ajp-product__sellers--list");1<skuJson.skus.length?$(document).on("skuChanged.vtex",function(t,s,e){$(".ajp-product__sellers--open").addClass("hide"),$(".ajp-product__sellers--close").removeClass("hide"),$(".ajp-product__sellers--menssage").hide("fast");var n=o.productData.items.filter(function(t){return t.itemId==e.sku}),g=n[0].sellers,a="";g.forEach(function(t){1!=t.sellerId&&(t='\n                                <div class="seller-box--item">\n                                    <div class="box-item--infos">\n                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="20" height="20" x="0" y="0" viewBox="0 0 489.4 489.4" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M347.7,263.75h-66.5c-18.2,0-33,14.8-33,33v51c0,18.2,14.8,33,33,33h66.5c18.2,0,33-14.8,33-33v-51    C380.7,278.55,365.9,263.75,347.7,263.75z M356.7,347.75c0,5-4.1,9-9,9h-66.5c-5,0-9-4.1-9-9v-51c0-5,4.1-9,9-9h66.5    c5,0,9,4.1,9,9V347.75z" fill="#a61f67" data-original="#000000" style="" class=""/><path d="M489.4,171.05c0-2.1-0.5-4.1-1.6-5.9l-72.8-128c-2.1-3.7-6.1-6.1-10.4-6.1H84.7c-4.3,0-8.3,2.3-10.4,6.1l-72.7,128    c-1,1.8-1.6,3.8-1.6,5.9c0,28.7,17.3,53.3,42,64.2v211.1c0,6.6,5.4,12,12,12h66.3c0.1,0,0.2,0,0.3,0h93c0.1,0,0.2,0,0.3,0h221.4    c6.6,0,12-5.4,12-12v-209.6c0-0.5,0-0.9-0.1-1.3C472,224.55,489.4,199.85,489.4,171.05z M91.7,55.15h305.9l56.9,100.1H34.9    L91.7,55.15z M348.3,179.15c-3.8,21.6-22.7,38-45.4,38c-22.7,0-41.6-16.4-45.4-38H348.3z M232,179.15c-3.8,21.6-22.7,38-45.4,38    s-41.6-16.4-45.5-38H232z M24.8,179.15h90.9c-3.8,21.6-22.8,38-45.5,38C47.5,217.25,28.6,200.75,24.8,179.15z M201.6,434.35h-69    v-129.5c0-9.4,7.6-17.1,17.1-17.1h34.9c9.4,0,17.1,7.6,17.1,17.1v129.5H201.6z M423.3,434.35H225.6v-129.5    c0-22.6-18.4-41.1-41.1-41.1h-34.9c-22.6,0-41.1,18.4-41.1,41.1v129.6H66v-193.3c1.4,0.1,2.8,0.1,4.2,0.1    c24.2,0,45.6-12.3,58.2-31c12.6,18.7,34,31,58.2,31s45.5-12.3,58.2-31c12.6,18.7,34,31,58.1,31c24.2,0,45.5-12.3,58.1-31    c12.6,18.7,34,31,58.2,31c1.4,0,2.7-0.1,4.1-0.1L423.3,434.35L423.3,434.35z M419.2,217.25c-22.7,0-41.6-16.4-45.4-38h90.9    C460.8,200.75,441.9,217.25,419.2,217.25z" fill="#a61f67" data-original="#000000" style="" class=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>\n                                        <span class="item-name">'+t.sellerName+'</span>\n                                    </div>\n                                    <div class="box-item--button">\n                                        <label class="container">\n                                        <input type="radio" seller-id="'+t.sellerId+'" value="'+t.addToCartLink+'" name="lojas">\n                                        <span class="checkmark"></span>\n                                    </label>\n                                    </div>\n                                </div>',a+=t,i.html('<form data-sku-id="'+n[0].itemId+'">'+a+"</form>"))}),o.setSellerIdInBuyButton(g)}):(t=o.productData.items[0].sellers,$(".ajp-product__sellers--open").hide(),s="",t.forEach(function(t){1!=t.sellerId&&(t='\n                            <div class="seller-box--item one">\n                                <div class="box-item--infos">\n                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="20" height="20" x="0" y="0" viewBox="0 0 489.4 489.4" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M347.7,263.75h-66.5c-18.2,0-33,14.8-33,33v51c0,18.2,14.8,33,33,33h66.5c18.2,0,33-14.8,33-33v-51    C380.7,278.55,365.9,263.75,347.7,263.75z M356.7,347.75c0,5-4.1,9-9,9h-66.5c-5,0-9-4.1-9-9v-51c0-5,4.1-9,9-9h66.5    c5,0,9,4.1,9,9V347.75z" fill="#a61f67" data-original="#000000" style="" class=""/><path d="M489.4,171.05c0-2.1-0.5-4.1-1.6-5.9l-72.8-128c-2.1-3.7-6.1-6.1-10.4-6.1H84.7c-4.3,0-8.3,2.3-10.4,6.1l-72.7,128    c-1,1.8-1.6,3.8-1.6,5.9c0,28.7,17.3,53.3,42,64.2v211.1c0,6.6,5.4,12,12,12h66.3c0.1,0,0.2,0,0.3,0h93c0.1,0,0.2,0,0.3,0h221.4    c6.6,0,12-5.4,12-12v-209.6c0-0.5,0-0.9-0.1-1.3C472,224.55,489.4,199.85,489.4,171.05z M91.7,55.15h305.9l56.9,100.1H34.9    L91.7,55.15z M348.3,179.15c-3.8,21.6-22.7,38-45.4,38c-22.7,0-41.6-16.4-45.4-38H348.3z M232,179.15c-3.8,21.6-22.7,38-45.4,38    s-41.6-16.4-45.5-38H232z M24.8,179.15h90.9c-3.8,21.6-22.8,38-45.5,38C47.5,217.25,28.6,200.75,24.8,179.15z M201.6,434.35h-69    v-129.5c0-9.4,7.6-17.1,17.1-17.1h34.9c9.4,0,17.1,7.6,17.1,17.1v129.5H201.6z M423.3,434.35H225.6v-129.5    c0-22.6-18.4-41.1-41.1-41.1h-34.9c-22.6,0-41.1,18.4-41.1,41.1v129.6H66v-193.3c1.4,0.1,2.8,0.1,4.2,0.1    c24.2,0,45.6-12.3,58.2-31c12.6,18.7,34,31,58.2,31s45.5-12.3,58.2-31c12.6,18.7,34,31,58.1,31c24.2,0,45.5-12.3,58.1-31    c12.6,18.7,34,31,58.2,31c1.4,0,2.7-0.1,4.1-0.1L423.3,434.35L423.3,434.35z M419.2,217.25c-22.7,0-41.6-16.4-45.4-38h90.9    C460.8,200.75,441.9,217.25,419.2,217.25z" fill="#a61f67" data-original="#000000" style="" class=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>\n                                    <span class="item-name">'+t.sellerName+'</span>\n                                </div>\n                                <div class="box-item--button">\n                                    <label class="container inp-closed">\n                                    <input type="radio" seller-id="'+t.sellerId+'" value="'+t.addToCartLink+'" name="lojas">\n                                    <span class="checkmark"></span>\n                                </label>\n                                </div>\n                            </div>',s+=t,i.html('<form data-sku-id="'+skuJson.skus[0].sku+'">'+s+"</form>"))}),(t=$(".box-item--button input")).attr("checked",!0),$("#ajp-buybutton").attr("this-seller",t.attr("seller-id")))},setSellerIdInBuyButton:function(t){t=t.find(function(t){if(1==t.sellerDefault)return t.sellerId});$(".buy-button.buy-button-ref").attr("this-seller",t.sellerId),$("#ajp-buybutton").attr("this-seller",t.sellerId)},changeSellerIdInBuyButton:function(){$(document).on("change",".ajp-product__sellers--list input",function(){var t=$(this);$(".buy-button.buy-button-ref").attr("this-seller",t.attr("seller-id")),$("#ajp-buybutton").attr("this-seller",t.attr("seller-id"))})},toggleSellers:function(){var t=$(".ajp-product__sellers--menssage");$(".ajp-product__sellers--open").on("click",function(){0!=$(".ajp-product__sellers--list").children().length?($(".ajp-product__sellers--list").slideToggle("fast"),$(this).addClass("hide"),$(".ajp-product__sellers--close").removeClass("hide")):t.show("fast")}),$(".ajp-product__sellers--close").on("click",function(){0!=$(".ajp-product__sellers--list").children().length&&($(".ajp-product__sellers--list").slideToggle("fast"),$(this).addClass("hide"),$(".ajp-product__sellers--open").removeClass("hide"))})},applyClickChangeImages:function(){o.breakpoints.desktop?$(document).on("click",".ajp-product__imageaside--vertical a",function(){var t=$(this).find("img").attr("src"),s=$(".ajp-product__image--main img"),t=t.replace(o.imagesConfig.regexList.thumb,o.imagesConfig.image.configMain);s.attr("src",t),o.destroyAndInitEasyzoom()}):o.breakpoints.mobile&&$(document).on("click",".ajp-product__image--thumbs a",function(){var t=$(this).find("img").attr("src"),s=$(".ajp-product__image--main img"),t=t.replace(o.imagesConfig.regexList.thumb,o.imagesConfig.image.configMainMobile);s.attr("src",t)})},applyTextsMobile:function(){var t=$(".ajp-product__infosmobile"),s=$(".ajp-product__name div").text(),e=$(".ajp-product__brand a").clone(),n=$(".ajp-product__yourviews #yv-review-quickreview").clone();t.find(".mobile-brand").html(e),t.find(".mobile-name").html("<span>"+s+"</span>"),t.find(".mobile-yourviews").html(n)},fixersMobile:function(){$(".ajp-product__image--main a").removeAttr("href")},applyDescriptionProduct:function(t){0!=t.description.length?(t="<h3>"+t.description+"</h3>",$(".ajp-product__spec").append($(t))):$(".ajp-product__spec").hide()},applyAtribbutes:function(t){var s=/attributes-ordenar|inativo/g,e=t.productId,n=t.items[0].itemId;try{$.ajax({type:"POST",url:"/attributes/get/snippet/"+e+"/"+n,data:""}).done(function(t){t&&t.length&&(t.match(s)?$(".ajp-product__att").hide():$(".ajp-product__att").html(t))})}catch(t){console.log("Erro ao buscar atributos: ",t)}},applySlickInShelfs:function(){$(".ajp-product__whobought.j-shelf .main-shelf > ul"),$(".ajp-product__similars.j-shelf .main-shelf > ul")},getSimilars:function(){var t="/api/catalog_system/pub/products/crossselling/similars/"+o.productData.id;$.ajax({type:"GET",url:t,dataType:"json",contentType:"application/json",headers:{"Content-Type":"application/json",Accept:"application/vnd.vtex.ds.v10+json"}}).done(function(t){t.length?o.renderSimilars(t):$(".ajp-product__selection--colors").hide()})},renderSimilars:function(t){var s=$(".ajp-product__selection--colors ul"),e="";t.forEach(function(t){var s=t.items[0].images[0].imageTag;s=(s=s.replace(o.imagesConfig.regexList.uncle,"")).replace(o.imagesConfig.regexList.size,o.imagesConfig.image.configSimilars);s='\n                        <li>\n                            <a href="/'+t.linkText+'/p?lid=55c83568-108d-47a4-b281-ef7069b7bff2" data-toggle="tooltip" title="'+t.Cor[0]+'">\n                                '+s+"\n                            </a>\n                        </li>\n                    ";e+=s}),s.append(e),$(".ajp-product__selection--colors > svg").hide()},accordionToSellers:function(){var t,s;o.breakpoints.mobile&&(t=$(".select.skuList"),s=$(".ajp-product__sellers--list"),t.on("change",function(){$("html, body").stop().animate({scrollTop:s.offset().top-130},1e3,"swing")}))},includeButtonCEP:function(){$("#empty-shipping").length||$(".content .prefixo").append('<button id="empty-shipping" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 26.741 26.08"><g id="Grupo_5303" data-name="Grupo 5303" transform="translate(0.5 0.5)" opacity="0.6"><path id="Caminho_7677" data-name="Caminho 7677" d="M665.748,124.792h-8.012v-1.916a1.933,1.933,0,0,0-1.916-1.916H650.6a1.933,1.933,0,0,0-1.916,1.916v1.916h-8.012a.348.348,0,1,0,0,.7h3.483v17.73a2.832,2.832,0,0,0,2.821,2.821h12.435a2.832,2.832,0,0,0,2.821-2.821v-17.73h3.483a.329.329,0,0,0,.348-.348C666.061,124.931,665.957,124.792,665.748,124.792Zm-16.371-1.916a1.234,1.234,0,0,1,1.219-1.219h5.225a1.234,1.234,0,0,1,1.219,1.219v1.916h-7.663Zm12.192,20.342a2.133,2.133,0,0,1-2.125,2.125h-12.47a2.133,2.133,0,0,1-2.125-2.125v-17.73h16.72Z" transform="translate(-640.32 -120.96)" fill="none" stroke="#e12b3a" stroke-width="1"/><path id="Caminho_7678" data-name="Caminho 7678" d="M951.708,354.239a.329.329,0,0,0-.348.348v10.8a.348.348,0,0,0,.7,0v-10.8A.329.329,0,0,0,951.708,354.239Z" transform="translate(-938.82 -344.834)" fill="none" stroke="#e12b3a" stroke-width="1"/><path id="Caminho_7679" data-name="Caminho 7679" d="M865.308,354.239a.329.329,0,0,0-.348.348v10.8a.348.348,0,0,0,.7,0v-10.8A.329.329,0,0,0,865.308,354.239Z" transform="translate(-855.904 -344.834)" fill="none" stroke="#e12b3a" stroke-width="1"/><path id="Caminho_7680" data-name="Caminho 7680" d="M1038.108,354.239a.329.329,0,0,0-.348.348v10.8a.348.348,0,0,0,.7,0v-10.8A.329.329,0,0,0,1038.108,354.239Z" transform="translate(-1021.737 -344.834)" fill="none" stroke="#e12b3a" stroke-width="1"/></g></svg></button>')},applyEventButtonToggleCEP:function(){$(document).on("click","#empty-shipping",function(){$("#txtCep").val(""),$(".freight-values").hide(),$(".freight-values").empty(),$("#empty-shipping").hide()}),$(document).on("click","#btnFreteSimulacao",function(){$("#empty-shipping").show("slow")})}};$(document).ready(o.init),$(document).ajaxStop(function(){o.ajaxStop()}),$(window).load(o.windowOnload)}catch(t){console.log("Erro na instancia [New Product]: ",t)}}();