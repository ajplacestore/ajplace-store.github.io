/*Dev - Orion Ecommerce - almeidajunior @date Mon May 31 2021 18:04:19 GMT-0300 (GMT-03:00) */

"use strict";!function(){try{var e={init:function(){e.buildMainBanners(),e.throttleScroll(),e.buildPosts()},buildMainBanners:function(){var e=991<$(window).width(),t=$(window).width()<=991,o=$(".ajp-home__mainbanner--wrapper.desktop"),r=$(".ajp-home__mainbanner--wrapper.mobile");e?(e=o.find("noscript").text(),o.html(e),1!=e.match(/box-banner/g).length&&o.slick({autoplay:!0,autoplaySpeed:3e3,slidesToScroll:1,slidesToShow:1,dots:!0,arrows:!1})):t&&(t=r.find("noscript").text(),r.html(t),1!=t.match(/box-banner/g).length&&r.slick({autoplay:!0,autoplaySpeed:3e3,slidesToScroll:1,slidesToShow:1,dots:!0,arrows:!1}))},throttleScroll:function(){var e=void 0;$(document).on("scroll",function(){e=!0}),setInterval(function(){e&&(e=!1,$(window).trigger("ajp.home-throttle-scroll"))},100)},buildPosts:function(){var t=$(".ajp-home__wordpress.wrapper"),o=[{acf:{imagem_mais_vistos:{url:"http://placehold.it/464x648"}},excerpt:{protected:!1,rendered:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."},link:"/"},{acf:{imagem_mais_vistos:{url:"http://placehold.it/464x648"}},excerpt:{protected:!1,rendered:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."},link:"/"},{acf:{imagem_mais_vistos:{url:"http://placehold.it/464x648"}},excerpt:{protected:!1,rendered:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."},link:"/"},{acf:{imagem_mais_vistos:{url:"http://placehold.it/464x648"}},excerpt:{protected:!1,rendered:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."},link:"/"},{acf:{imagem_mais_vistos:{url:"http://placehold.it/464x648"}},excerpt:{protected:!1,rendered:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."},link:"/"}],r=function(e){e=e.map(function(e){var t=e.acf,o=e.excerpt,r=e.title,i=e.content,e=e.link,t=t.imagem_vertical,r=r.rendered;return o.protected?i.protected||i.rendered:o.rendered,'\n                            <div class="ajp-home__wordpress post">\n                                <div class="post wrapper">\n                                    <a target="_blank" href="'+e+'">\n                                        <img src="'+t+'" />\n                                    </a>\n                                    <h5>'+r+'</h5>\n                                    <a class="post-link" target="_blank" href="'+e+'">Clique & Confira</a>\n                                </div>\n                            </div>'});t.append(e),t.removeClass("loading-before")};t.addClass("loading-before"),new IntersectionObserver(function(e,t){e.forEach(function(e){e.isIntersecting&&($.ajax({type:"GET",url:"https://blog.ajplace.com.br/wp-json/wp/v2/posts?disponibilizar_post_vtex=1&per_page=4",responseType:"application/json",dataType:"json",cache:!1,statusCode:{404:function(){r(o)}},success:function(e){r(e)},error:function(e){r(o)}}),t.unobserve(e.target))})}).observe(document.querySelector(".ajp-home__wordpress.wrapper"),{rootMargin:"0px 0px 250px 0px",threshold:0})}};$(document).ready(e.init)}catch(e){console.log("Erro na instancia [Home]: ",e)}}();