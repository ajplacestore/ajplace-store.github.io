/**
 * Avanti Comunicação <contato@penseavanti.com.br>
 * almeidajunior
 * @date Mon Mar 15 2021 12:46:12 GMT-0300 (GMT-03:00)
 */

"use strict";!function(){try{var n={init:function(){n.getInfo(),$(document.body).is(".product")&&(n.addProdutcInList(),n.removeProductInList()),n.addShelfProductInList(),n.removeShelfProductInList()},dataUser:null,dataUserEmail:null,dataProduct:{prodId:null,sku:null},dataShelf:{prodId:null,sku:null},getInfo:function(){vtexjs.checkout.getOrderForm().done(function(t){var e=t.clientProfileData;e&&e.email?(t=e.email,n.dataUserEmail=t,$.ajax({type:"GET",url:"/api/dataentities/favoritos/search?_schema=ajp-body&email="+t,dataType:"json",contentType:"application/json",headers:{"Content-Type":"application/json",Accept:"application/vnd.vtex.ds.v10+json"}}).done(function(t){return t.length?(n.dataUser=t[0],n.dataShelf=t[0],$(document.body).is(".product")&&n.setDataInFrontProduct(t[0]),$(document.body).is(".wishlist")&&n.showProductsInFavorites(),n.showProductInShowAlreadyAdd(),void $(".shelf-item__wishlist button").removeClass("list-loaded")):(console.log("Nenhum item na lista..."),void $(".shelf-wishlist--button").removeClass("list-loaded"))})):null!=e&&null!=e.email||($(".shelf-item__wishlist button").removeClass("list-loaded"),$(document.body).is(".wishlist")&&($(".wishlist-products--loader").addClass("hide"),$(".wishlist-products--empty").removeClass("hide")))})},setDataInFrontProduct:function(t){var e=!1;t.userItems.forEach(function(t){t==skuJson.productId&&(e=!0)}),e&&($(".product-wishlist--button.add").addClass("hide"),$(".product-wishlist--button.remove").removeClass("hide"))},addProdutcInList:function(){$(document).one("click",".product-wishlist--button.add",function(t){if(console.log("Clicado!"),null==n.dataUser&&null==n.dataUserEmail)return vtexid.start(),void n.verifyVtexId();var e,s,a=skuJson.productId;null==n.dataUser?(e={email:n.dataUserEmail,userItems:[a]},n.sendPostToMD(e)):n.dataUser&&(s=n.dataUser.userItems,e=n.dataUser.id,(s=s).push(a),s={userItems:s},n.sendPatchToMD(e,s))})},removeProductInList:function(){$(document).one("click",".product-wishlist--button.remove",function(t){if(null==n.dataUser&&null==n.dataUserEmail)return vtexid.start(),void n.verifyVtexId();var e=n.dataUser.userItems,s=n.dataUser.id,e=e.filter(function(t){return t!==skuJson.productId});e.length?(e={userItems:e},n.sendPatchToMD(s,e)):n.deleteListWhenEmpty(s)})},sendPatchToMD:function(t,e){$.ajax({type:"PATCH",url:"/api/dataentities/favoritos/documents/"+t+"?_schema=ajp-body",dataType:"json",contentType:"application/json",headers:{"Content-Type":"application/json",Accept:"application/vnd.vtex.ds.v10+json"},data:JSON.stringify(e)}).done(function(t){swal({title:"Lista de desejos atualizada!",icon:"success"}).then(function(){location.reload()})})},sendPostToMD:function(t){$.ajax({type:"POST",url:"/api/dataentities/favoritos/documents?_schema=ajp-body",dataType:"json",contentType:"application/json",headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify(t)}).done(function(t){swal({title:"Sua lista de desejos foi criada!",text:"Confira seus itens salvos na página de favoritos.",icon:"success"}).then(function(){location.reload()})})},showProductsInFavorites:function(){var e,a,t;null!=n.dataUser?(e=$(".wishlist-products--wrapper"),a=null,n.dataUser.userItems.forEach(function(t,e,s){a=0==e?"fq=productId:"+t:a+"&fq=productId:"+t}),t="/buscapagina?"+a+"&PS=50&sl=ff2a9142-b3a3-4bb4-94ed-02884096891f&cc=1&sm=0",$.ajax({type:"GET",url:t}).done(function(t){e.append(t),n.removeShelfProductInListUser(),$(".wishlist-products--loader").hide()})):vtexid.start()},showProductInShowAlreadyAdd:function(){$(".shelf-item__wishlist.shelf-default").each(function(){var t=$(this),e=t.closest(".shelf-item").attr("data-product-id");n.dataShelf.userItems.find(function(t){return t==e})&&(t.find(".shelf-wishlist--button.shelf.add").addClass("hide"),t.find(".shelf-wishlist--button.shelf.remove").removeClass("hide"))})},addShelfProductInList:function(){$(document).one("click",".shelf-wishlist--button.shelf.add",function(t){if(null==n.dataUser&&null==n.dataUserEmail)return vtexid.start(),void n.verifyVtexId();var e,s,a=$(this).closest(".shelf-item").attr("data-product-id"),a=parseInt(a);null==n.dataUser?(e={email:n.dataUserEmail,userItems:[a]},n.sendPostToMD(e)):n.dataUser&&(s=n.dataUser.userItems,e=n.dataUser.id,(s=s).push(a),s={userItems:s},n.sendPatchToMD(e,s))})},removeShelfProductInList:function(){$(document).one("click",".shelf-wishlist--button.shelf.remove",function(t){if(null==n.dataUser&&null==n.dataUserEmail)return vtexid.start(),void n.verifyVtexId();var e=$(this),s=n.dataUser.id,a=e.closest(".shelf-item").attr("data-product-id"),a=parseInt(a),e=n.dataUser.userItems.filter(function(t){return t!==a});e.length?(e={userItems:e},n.sendPatchToMD(s,e)):n.deleteListWhenEmpty(s)})},removeShelfProductInListUser:function(){$(document).one("click",".shelf-wishlist--button.shelf-button--remove.shelf-user",function(t){var e=$(this),s=n.dataUser.id,a=e.closest(".shelf-item").attr("data-product-id"),a=parseInt(a),e=n.dataUser.userItems.filter(function(t){return t!==a});e.length?(e={userItems:e},n.sendPatchToMD(s,e)):n.deleteListWhenEmpty(s)})},deleteListWhenEmpty:function(t){var e=n.headersDelete.headers;$.ajax({headers:e,url:"/api/dataentities/favoritos/documents/"+t,type:"DELETE",dataType:"json",contentType:"application/json"}).done(function(t){swal({title:"Lista de desejos limpa.",icon:"success"}).then(function(){location.reload()})})},reloadClickFunctionsIfCloseModal:function(){$("#dtbot-script").siblings("#vtexIdContainer.ng-scope").find(".vtexIdUI-page.ng-scope.vtexIdUI-confirm-email .close.vtexIdUI-close, .vtexIdUI-page.ng-scope.vtexIdUI-page-active .close.vtexIdUI-close").on("click",function(){n.addProdutcInList(),n.removeProductInList(),n.addShelfProductInList(),n.removeShelfProductInList()})},verifyVtexId:function(){var t=setInterval(function(){$("#vtexIdContainer.ng-scope").length&&(clearInterval(t),n.reloadClickFunctionsIfCloseModal())},50)},headersDelete:{headers:{"Content-Type":"application/json",Accept:"application/vnd.vtex.ds.v10+json","x-vtex-api-appkey":"vtexappkey-almeidajunior-MDITUY","x-vtex-api-apptoken":"CDINPPQASIYVUHBODRPGFEBJPISGACIQPFOHAZUHRRKDZPEDBNMSFIWXBYYGXJAPZHGPSUODWIONUYKZEOEMPQLHIRGBBNJHRUDRJPKHYJWXTJDCOZCIFNAJWYGBOMCI"}}};$(document).ready(n.init)}catch(t){console.log("Erro na instancia [Wishlist]: ",t)}}();