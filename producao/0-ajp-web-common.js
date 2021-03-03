/**
 * Avanti Comunicação <contato@penseavanti.com.br>
 * almeidajunior
 * @date Wed Mar 03 2021 16:50:27 GMT-0300 (GMT-03:00)
 */

"use strict";!function(){try{var o={init:function(){o.applyConfigInSearchField(),o.returnPreviousPage()},applyConfigInSearchField:function(){var e=$(".search__input");e.on("click",function(){$(this).val(" ")}),$(document).click(function(o){$(o.target).is(".search__input")||e.val("")})},returnPreviousPage:function(){localStorage.AJP_prevUrl&&localStorage.AJP_prevUrl.length?(console.log("[IF]"),$("#return-to-prev-page").attr("href",localStorage.getItem("AJP_prevUrl")),localStorage.setItem("AJP_currentUrl",window.location.href),$(window).unload(function(){localStorage.setItem("AJP_prevUrl",window.location.href)})):(console.log("[ELSE]"),window.localStorage.setItem("AJP_prevUrl",window.location.href),window.localStorage.setItem("AJP_currentUrl",window.location.href))}};$(document).ready(o.init)}catch(o){console.log("Erro na instancia [Common]: ",o)}}();