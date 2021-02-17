/**
 * Avanti Comunicação <contato@penseavanti.com.br>
 * almeidajunior
 * @date Mon Feb 15 2021 16:41:50 GMT-0200 (GMT-02:00)
 */

"use strict";!function(){try{var n={init:function(){n.getInfo(),$(document.body).is(".product")&&(n.addProdutcInList(),n.removeProductInList()),n.addShelfProductInList(),n.removeShelfProductInList()},dataUser:null,dataUserEmail:null,dataProduct:{prodId:null,sku:null},dataShelf:{prodId:null,sku:null},getInfo:function(){vtexjs.checkout.getOrderForm().done(function(t){var e=t.clientProfileData;e&&e.email?(t=e.email,n.dataUserEmail=t,$.ajax({type:"GET",url:"/api/dataentities/favoritos/search?_schema=ajp-body&email="+t,dataType:"json",contentType:"application/json",headers:{"Content-Type":"application/json",Accept:"application/vnd.vtex.ds.v10+json"}}).done(function(t){t.length?(n.dataUser=t[0],n.dataShelf=t[0],$(document.body).is(".product")&&n.setDataInFrontProduct(t[0]),$(document.body).is(".wishlist")&&n.showProductsInFavorites(),n.showProductInShowAlreadyAdd()):console.log("Nenhum item na lista.")})):null!=e&&null!=e.email||$(document.body).is(".wishlist")&&($(".wishlist-products--loader").addClass("hide"),$(".wishlist-products--empty").removeClass("hide"))})},setDataInFrontProduct:function(t){var e=!1;t.userItems.forEach(function(t){t==skuJson.productId&&(e=!0)}),e&&($(".product-wishlist--button.add").addClass("hide"),$(".product-wishlist--button.remove").removeClass("hide"))},addProdutcInList:function(){$(document).one("click",".product-wishlist--button.add",function(t){var e,a,s;null!=n.dataUser||null!=n.dataUserEmail?(e=skuJson.productId,null==n.dataUser?(a={email:n.dataUserEmail,userItems:[e]},n.sendPostToMD(a)):n.dataUser&&(s=n.dataUser.userItems,a=n.dataUser.id,(s=s).push(e),s={userItems:s},n.sendPatchToMD(a,s))):vtexid.start()})},removeProductInList:function(){$(document).one("click",".product-wishlist--button.remove",function(t){var e,a;null!=n.dataUser||null!=n.dataUserEmail?(a=n.dataUser.userItems,e=n.dataUser.id,(a=a.filter(function(t){return t!==skuJson.productId})).length?(a={userItems:a},n.sendPatchToMD(e,a)):n.deleteListWhenEmpty(e)):vtexid.start()})},sendPatchToMD:function(t,e){$.ajax({type:"PATCH",url:"/api/dataentities/favoritos/documents/"+t+"?_schema=ajp-body",dataType:"json",contentType:"application/json",headers:{"Content-Type":"application/json",Accept:"application/vnd.vtex.ds.v10+json"},data:JSON.stringify(e)}).done(function(t){swal({title:"Lista de desejos atualizada!",icon:"success"}).then(function(){location.reload()})})},sendPostToMD:function(t){$.ajax({type:"POST",url:"/api/dataentities/favoritos/documents?_schema=ajp-body",dataType:"json",contentType:"application/json",headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify(t)}).done(function(t){swal({title:"Sua lista de desejos foi criada!",text:"Confira seus itens salvos na página de favoritos.",icon:"success"}).then(function(){location.reload()})})},showProductsInFavorites:function(){var e,s,t;null!=n.dataUser?(e=$(".wishlist-products--wrapper"),s=null,n.dataUser.userItems.forEach(function(t,e,a){s=0==e?"fq=productId:"+t:s+"&fq=productId:"+t}),t="/buscapagina?"+s+"&PS=50&sl=ff2a9142-b3a3-4bb4-94ed-02884096891f&cc=1&sm=0",$.ajax({type:"GET",url:t}).done(function(t){e.append(t),n.removeShelfProductInListUser(),$(".wishlist-products--loader").hide()})):vtexid.start()},showProductInShowAlreadyAdd:function(){$(".main-shelf li[layout]").find(".store-shelf").each(function(){var t=$(this),e=t.closest(".shelf-item").attr("data-product-id");n.dataShelf.userItems.find(function(t){return t==e})&&(t.find(".shelf-wishlist--button.add").addClass("hide"),t.find(".shelf-wishlist--button.remove").removeClass("hide"))})},addShelfProductInList:function(){$(document).one("click",".shelf-wishlist--button.add",function(t){var e,a,s;null!=n.dataUser?(s=$(this).closest(".shelf-item").attr("data-product-id"),s=parseInt(s),null==n.dataUser?(e={email:n.dataUserEmail,userItems:[s]},n.sendPostToMD(e)):n.dataUser&&(a=n.dataUser.userItems,e=n.dataUser.id,(a=a).push(s),a={userItems:a},n.sendPatchToMD(e,a))):vtexid.start()})},removeShelfProductInList:function(){$(document).one("click",".shelf-wishlist--button.remove",function(t){null==n.dataUser&&vtexid.start();var e=$(this),a=n.dataUser.id,s=e.closest(".shelf-item").attr("data-product-id"),s=parseInt(s),e=n.dataUser.userItems.filter(function(t){return t!==s});e.length?(e={userItems:e},n.sendPatchToMD(a,e)):n.deleteListWhenEmpty(a)})},removeShelfProductInListUser:function(){$(document).one("click",".shelf-wishlist--button.shelf-button--remove.shelf-user",function(t){var e=$(this),a=n.dataUser.id,s=e.closest(".shelf-item").attr("data-product-id"),s=parseInt(s),e=n.dataUser.userItems.filter(function(t){return t!==s});e.length?(e={userItems:e},n.sendPatchToMD(a,e)):n.deleteListWhenEmpty(a)})},deleteListWhenEmpty:function(t){var e=n.headersDelete.headers;$.ajax({headers:e,url:"/api/dataentities/favoritos/documents/"+t,type:"DELETE",dataType:"json",contentType:"application/json"}).done(function(t){swal({title:"Lista de desejos limpa.",icon:"success"}).then(function(){location.reload()})})},reloadClickFunctionsIfCloseModal:function(){console.log("[reloadClickFunctionsIfCloseModal]")},getEmail:function(){var e=$("#wishlist-form");e.validate({rules:{email:{required:!0,email:!0}}}),e.on("submit",function(t){return t.preventDefault(),t.stopPropagation(),e[0].checkValidity()?$.ajax({type:"POST",url:"/api/dataentities/favoritos/documents?_schema=ajp-body",dataType:"json",contentType:"application/json",headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify(dataJson)}).done(function(t){swal({title:"Sua lista de desejos foi criada!",text:"Confira seus itens salvos na página de favoritos.",icon:"success"}).then(function(){location.reload()})}):console.log("Novalid"),!1})},headersDelete:{headers:{"Content-Type":"application/json",Accept:"application/vnd.vtex.ds.v10+json","x-vtex-api-appkey":"vtexappkey-almeidajunior-MDITUY","x-vtex-api-apptoken":"CDINPPQASIYVUHBODRPGFEBJPISGACIQPFOHAZUHRRKDZPEDBNMSFIWXBYYGXJAPZHGPSUODWIONUYKZEOEMPQLHIRGBBNJHRUDRJPKHYJWXTJDCOZCIFNAJWYGBOMCI"}}};$(document).ready(n.init)}catch(t){console.log("Erro na instancia [Wishlist]: ",t)}}();