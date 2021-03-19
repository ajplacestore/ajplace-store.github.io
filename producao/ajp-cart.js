/**
 * Avanti Comunicação <contato@penseavanti.com.br>
 * almeidajunior
 * @date Fri Mar 19 2021 15:43:04 GMT-0300 (GMT-03:00)
 */

"use strict";!function(){try{var n={init:function(){n.toggleCart()},toggleCart:function(){$(".header__minicart-icon").off();var n=$("#ajp-cart-close"),c=$("#ajp-cart-continuebuy"),o=$(".header__minicart-icon");n.on("click",function(){$(document.body).removeClass("cart-on")}),o.on("click",function(){$(document.body).addClass("cart-on")}),c.on("click",function(){$(document.body).removeClass("cart-on")})}};$(document).ready(n.init)}catch(n){console.log("Erro na instancia [Cart]: ",n)}}();