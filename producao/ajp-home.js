/**
 * Avanti Comunicação <contato@penseavanti.com.br>
 * almeidajunior
 * @date Mon May 10 2021 12:27:30 GMT-0300 (GMT-03:00)
 */

"use strict";!function(){try{var e={init:function(){e.buildMainBanners(),e.applySlickInShelfs(),e.throttleScroll(),e.loadImagesByScroll(),e.buildPosts()},buildMainBanners:function(){$(".ajp-home__mainbanner").removeAttr("style");var e=991<$(window).width(),o=$(window).width()<=991,t=$(".ajp-home__mainbanner--wrapper.desktop"),s=$(".ajp-home__mainbanner--wrapper.mobile");e?(e=t.find("noscript").text(),t.html(e),1!=e.match(/box-banner/g).length&&t.slick({autoplay:!0,autoplaySpeed:3e3,slidesToScroll:1,slidesToShow:1,dots:!0,arrows:!1})):o&&(o=s.find("noscript").text(),s.html(o),1!=o.match(/box-banner/g).length&&s.slick({autoplay:!0,autoplaySpeed:3e3,slidesToScroll:1,slidesToShow:1,dots:!0,arrows:!1}))},applySlickInShelfs:function(){var e=$(".home-products.home-products-1");e.find("h2").prependTo(e.find(".main-shelf")),$(".home-products-1 .main-shelf > ul, .home-products-3 .main-shelf > ul").not(".slick-initialized").slick({autoplay:!0,dots:!0,infinite:!0,slidesToShow:4,slidesToScroll:4,arrows:!0,responsive:[{breakpoint:992,settings:{slidesToShow:2,slidesToScroll:2,dots:!0}}]}),$(".home-products-2 .main-shelf > ul").not(".slick-initialized").slick({autoplay:!0,dots:!0,infinite:!0,slidesToShow:3,slidesToScroll:3,arrows:!0,responsive:[{breakpoint:992,settings:{slidesToShow:2,slidesToScroll:2,dots:!0}}]})},throttleScroll:function(){var e=void 0;$(document).on("scroll",function(){e=!0}),setInterval(function(){e&&(e=!1,$(window).trigger("ajp.home-throttle-scroll"))},100)},loadImagesByScroll:function(){$(window).on("ajp.home-throttle-scroll",function(e){e.stopPropagation(),450<=window.scrollY&&$(".home-medium-banners").find(".box-banner").each(function(){var e,o=$(this);0!=o.find("span[data-src-url]").length&&(e=o.find("span[data-src-url]").attr("data-src-url"),e=$('<img src="'+e+'" />'),o.find("a").html(e))}),2900<=window.scrollY&&($(".list-seo .loader").hide("fast"),$(".list-seo .banner").attr("src","https://almeidajunior.vteximg.com.br/arquivos/banner-seo.png"),$(".list-seo .banner").removeClass("hide")),$(".home-medium-banners img").attr("src")})},buildPosts:function(){var t=[{acf:{imagem_mais_vistos:{url:"http://placehold.it/464x648"}},excerpt:{protected:!1,rendered:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."},link:"/"},{acf:{imagem_mais_vistos:{url:"http://placehold.it/464x648"}},excerpt:{protected:!1,rendered:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."},link:"/"},{acf:{imagem_mais_vistos:{url:"http://placehold.it/464x648"}},excerpt:{protected:!1,rendered:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."},link:"/"},{acf:{imagem_mais_vistos:{url:"http://placehold.it/464x648"}},excerpt:{protected:!1,rendered:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."},link:"/"},{acf:{imagem_mais_vistos:{url:"http://placehold.it/464x648"}},excerpt:{protected:!1,rendered:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."},link:"/"}],s=function(e){e=e.map(function(e){var o=e.acf,t=e.excerpt,s=e.title,i=e.content,e=e.link,o=o.imagem_vertical,s=s.rendered;return t.protected?i.protected||i.rendered:t.rendered,'<div class="home-wordpress-item">\n                        <div class="ajpost">\n                        <a target="_blank" href="'+e+'"><div class="ajpost__image" style="background-image: url('+o+')"></div></a>\n                        <h5 class="ajpost__title">'+s+'</h5>\n                        <a class="ajpost__details" target="_blank" href="'+e+'">Ler +</a>\n                        </div>\n                        </div>'});$(".home-wordpress-content").append(e),$(".home-wordpress-content").removeClass("loading-before"),$(".home-wordpress-content").not(".slick-initialized").slick({autoplay:!1,slidesToScroll:1,slidesToShow:1,dots:!0,arrows:!1,mobileFirst:!0,responsive:[{breakpoint:992,settings:{slidesToScroll:1,slidesToShow:4,dots:!0,arrows:!0}},{breakpoint:640,settings:{slidesToScroll:1,slidesToShow:2}}]})};$(".home-wordpress-content").addClass("loading-before"),new IntersectionObserver(function(e,o){e.forEach(function(e){e.isIntersecting&&($.ajax({type:"GET",url:"https://blog.ajplace.com.br/wp-json/wp/v2/posts?disponibilizar_post_vtex=1&per_page=4",responseType:"application/json",dataType:"json",cache:!1,statusCode:{404:function(){s(t)}},success:function(e){s(e)},error:function(e){console.log("error",e),s(t)}}),o.unobserve(e.target))})}).observe(document.querySelector(".home-wordpress-content"),{rootMargin:"0px 0px 250px 0px",threshold:0})}};$(document).ready(e.init)}catch(e){console.log("Erro na instancia [Home]: ",e)}}();