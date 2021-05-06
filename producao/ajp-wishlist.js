(function() {

    try {
  
        let Wishlist = {
            init: function() {
                Wishlist.getInfo();

                if ($(document.body).is(".product")) {
                    Wishlist.addProdutcInList();
                    Wishlist.removeProductInList();
                }

                // Funcoes de adicionar e remover nas vitrines
                Wishlist.addShelfProductInList();
                Wishlist.removeShelfProductInList();
            },
            dataUserOrderForm: null,
            dataUserParsed: null, // Wishlist.dataUserParsed;
            getInfo: () => {
                if (localStorage && localStorage.AJP_listUser && localStorage.AJP_listUser.length) {
                    console.log("Do it A");
                    let userInfo = JSON.parse(localStorage.AJP_listUser);
                    Wishlist.dataUserParsed = userInfo; // Seto numa global
                    if (userInfo.userItems == null) {
                        console.log("Do it A-1");
                        Wishlist.emptyListInUserPage();
                    } 
                    else if (userInfo.userItems.length) {
                        console.log("Do it A-2");

                        if ($(document.body).is(".product")) {
                            Wishlist.setDataInFrontProduct();
                        }

                        if ($(document.body).is(".wishlist")) {
                            Wishlist.showProductsInFavorites();
                        }

                        Wishlist.showProductInShowAlreadyAdd();
                        $(".shelf-item__wishlist button").removeClass("list-loaded");
                    }
                } 
                else {
                    console.log("Do it B");
                    vtexjs.checkout.getOrderForm().done(function(orderForm) {
                        console.log("vtexjs with request");
                        if (orderForm.clientProfileData && orderForm.clientProfileData.email != null) {
                            Wishlist.getInfoByOrderForm(orderForm);
                        } 
                        else {
                            console.log("Email not found");
                            vtexid.start();
                            Wishlist.verifyVtexId();
                            return;
                        }
                    });
                }
            },
            getInfoByOrderForm: (orderForm) => {
                let userEmail = orderForm.clientProfileData.email;
                $.ajax({
                    type: "GET",
                    url: `/api/dataentities/favoritos/search?_schema=ajp-body&email=${userEmail}`,
                    dataType: "json",
                    contentType: "application/json",
                    headers: {
                        "Accept": "application/vnd.vtex.ds.v10+json", 
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }).done(function (response) {
                    if (!response.length) {
                        console.log("Primeira vez no wishlist.");

                        Wishlist.registerEmailInMDFirstTime(orderForm);
                    } else {
                        console.log("Usuario com lista");

                        localStorage.setItem("AJP_listUser", JSON.stringify(response[0]));
                        Wishlist.dataUserParsed = response[0];

                        if ($(document.body).is(".product")) {
                            Wishlist.setDataInFrontProduct();
                        }

                        if ($(document.body).is(".wishlist")) {
                            Wishlist.showProductsInFavorites();
                        }

                        Wishlist.showProductInShowAlreadyAdd();
                        $(".shelf-item__wishlist button").removeClass("list-loaded");
                    }
                });
            },
            registerEmailInMDFirstTime: (orderForm) => {
                let dataJson = {
                    email: orderForm.clientProfileData.email,
                    userItems: null
                }
                $.ajax({
                    type: "POST",
                    url: "/api/dataentities/favoritos/documents?_schema=ajp-body",
                    dataType: "json",
                    contentType: "application/json",
                    headers: { 
                        "Accept": "application/vnd.vtex.ds.v10+json", 
                        "Content-Type": "application/json; charset=utf-8" 
                    },
                    data: JSON.stringify(dataJson)
                }).done(function (response) {
                    dataJson["id"] = response.DocumentId;
                    localStorage.setItem("AJP_listUser", JSON.stringify(dataJson));
                });
            },
            setDataInFrontProduct: () => {
                // Verificando se esse produto na PDP ja está na lista de favoritos do usuario e destacando-o
                let existsItem = false;
                Wishlist.dataUserParsed.userItems.forEach(item => {
                    if (item == skuJson.productId) {
                        existsItem = true;
                    }
                });

                // Destaco ele no front
                if (existsItem) {
                    $(".product-wishlist--button.add").addClass("hide");
                    $(".product-wishlist--button.remove").removeClass("hide");
                } 
            },
            showProductsInFavorites: () => {
                // PAG. Favoritos
                let wrapperList = $(".wishlist-products--wrapper");
                let fieldQuery = null;

                // Monto a URL com os produtos do usuario
                Wishlist.dataUserParsed.userItems.forEach((item, index, arr) => {
                    if (index == 0) {
                        fieldQuery = `fq=productId:${item}`;
                    } else {
                        fieldQuery = `${fieldQuery}&fq=productId:${item}`;
                    }
                });
                
                let idShelf = 'ff2a9142-b3a3-4bb4-94ed-02884096891f'; // ID da prateleira
                let sle = '&cc=1&sm=0'; // config do seller da loja
                const urlProductsList = `/buscapagina?${fieldQuery}&PS=50&sl=${idShelf}${sle}`;
                $.ajax({
                    type: "GET",
                    url: urlProductsList,
                }).done(function (responseHtml) {
                    wrapperList.append(responseHtml);
                    Wishlist.removeShelfProductInListUser();

                    // Removendo o loader
                    $(".wishlist-products--loader").hide();
                });
            },
            showProductInShowAlreadyAdd: function () {
                // Destaca o item que está na lista do usuario na prateleira
                let wrapperShelfs = $(".shelf-item__wishlist.shelf-default");
                wrapperShelfs.each(function () {
                    let $t = $(this);
                    let thisIdShelf = $t.closest(".shelf-item").attr("data-product-id");
                    let findItems = Wishlist.dataUserParsed.userItems.find(function(item) {
                        return item == thisIdShelf;
                    });
                    if (findItems) {
                        $t.find(".shelf-wishlist--button.shelf.add").addClass("hide");
                        $t.find(".shelf-wishlist--button.shelf.remove").removeClass("hide");
                    }
                });
            },
            addProdutcInList: function () {
                // PG PRODUTO
                let buttonAddProduct = ".product-wishlist--button.add";
                $(document).one("click", buttonAddProduct, function(event) {   
                    
                    let updateList = Wishlist.dataUserParsed.userItems;
                    if (updateList == null) {
                        updateList = [skuJson.productId];
                    } else {
                        updateList.push(skuJson.productId);
                    }
                    let dataJson = {
                        id: Wishlist.dataUserParsed.id,
                        email: Wishlist.dataUserParsed.email,
                        userItems: updateList
                    }

                    // Atualizo os dados no MD
                    Wishlist.sendPatchToMD(dataJson);
                });
            },
            addShelfProductInList: function () {
                // SHELF - ADD
                let buttonShelfAdd = ".shelf-wishlist--button.shelf.add";
                $(document).one("click", buttonShelfAdd, function(event) {
                    let $t = $(this);
                    let thisIdShelfProduct = $t.closest(".shelf-item").attr("data-product-id");
                    thisIdShelfProduct = parseInt(thisIdShelfProduct);

                    let updateList = Wishlist.dataUserParsed.userItems;
                    if (updateList == null) {
                        updateList = [thisIdShelfProduct];
                    } else {
                        updateList.push(thisIdShelfProduct);
                    }
                    
                    let dataJson = {
                        id: Wishlist.dataUserParsed.id,
                        email: Wishlist.dataUserParsed.email,
                        userItems: updateList
                    }

                    // Atualizo os dados no MD
                    Wishlist.sendPatchToMD(dataJson);
                });
            },
            removeProductInList: function () {
                // PG PRODUTO
                let buttonRemoveProduct = ".product-wishlist--button.remove";
                $(document).one("click", buttonRemoveProduct, function(event) {
                    // Removo o item da lista vinda vindo do MD
                    let listUpdated = Wishlist.dataUserParsed.userItems.filter(function(item) {
                        return item !== skuJson.productId;
                    });

                    // Caso zere os produtos na lista
                    if (!listUpdated.length) {
                        listUpdated = null;
                    }
                    
                    // Preparo o JSON no formato correto
                    let dataJson = {
                        id: Wishlist.dataUserParsed.id,
                        email: Wishlist.dataUserParsed.email,
                        userItems: listUpdated
                    }

                    // Atualizo os dados no MD
                    Wishlist.sendPatchToMD(dataJson);
                });
            },
            removeShelfProductInList: function () {
                // SHELF - REMOVE
                let buttonShelfRemove = ".shelf-wishlist--button.shelf.remove";
                $(document).one("click", buttonShelfRemove, function(event) {
                    let $t = $(this);
                    let thisProdId = $t.closest(".shelf-item").attr("data-product-id");
                    thisProdId = parseInt(thisProdId);

                    // Removo o item da lista vinda vindo do MD
                    let listUpdated = Wishlist.dataUserParsed.userItems.filter(function(item) {
                        return item !== thisProdId;
                    });

                    // Caso zere os produtos na lista
                    if (!listUpdated.length) {
                        listUpdated = null;
                    } 
                    
                    // Preparo o JSON no formato correto
                    let dataJson = {
                        id: Wishlist.dataUserParsed.id,
                        email: Wishlist.dataUserParsed.email,
                        userItems: listUpdated
                    }

                    // Atualizo os dados no MD
                    Wishlist.sendPatchToMD(dataJson);
                    
                });
            },
            removeShelfProductInListUser: () => {
                // Remove o item na página de favoritos da lista dos usuarios
                let buttonShelfs = ".shelf-wishlist--button.shelf-button--remove.shelf-user";
                $(document).one("click", buttonShelfs, function(event) {
                    let $t = $(this);
                    let thisProdId = $t.closest(".shelf-item").attr("data-product-id");
                    thisProdId = parseInt(thisProdId);

                    // Removo o item da lista vinda vindo do MD
                    let userItems = Wishlist.dataUserParsed.userItems;
                    let listUpdated = userItems.filter(function(item) {
                        return item !== thisProdId;
                    });

                    // Caso zere os produtos na lista
                    if (!listUpdated.length) {
                        listUpdated = null;
                    }
                    
                    // Preparo o JSON no formato correto
                    let dataJson = {
                        id: Wishlist.dataUserParsed.id,
                        email: Wishlist.dataUserParsed.email,
                        userItems: listUpdated
                    }

                    // Atualizo os dados no MD
                    Wishlist.sendPatchToMD(dataJson);
                });
            },
            emptyListInUserPage: () => {
                $(".shelf-item__wishlist button").removeClass("list-loaded");
                if ($(document.body).is(".wishlist")) {
                    $(".wishlist-products--loader").addClass("hide");
                    $(".wishlist-products--empty").removeClass("hide");
                }
            },
            sendPatchToMD: (dataUpdated) => {
                let thisId = Wishlist.dataUserParsed.id;

                // Atualiza a lista
                $.ajax({
                    type: "PATCH",
                    url: `/api/dataentities/favoritos/documents/${thisId}?_schema=ajp-body`,
                    dataType: "json",
                    contentType: "application/json",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/vnd.vtex.ds.v10+json",
                    },
                    data: JSON.stringify(dataUpdated)
                }).done(function (data) {
                    localStorage.setItem("AJP_listUser", JSON.stringify(dataUpdated));

                    swal({
                        title: "Lista de desejos atualizada!",
                        icon: "success",
                    }).then(() => {
                        location.reload();
                    });
                });
            },
            reloadClickFunctionsIfCloseModal: function () {
                let find = ".vtexIdUI-page.ng-scope.vtexIdUI-confirm-email .close.vtexIdUI-close, .vtexIdUI-page.ng-scope.vtexIdUI-page-active .close.vtexIdUI-close, .vtexIdUI-page.ng-scope.vtexIdUI-no-permission .close.vtexIdUI-close, .vtexIdUI-page.ng-scope.vtexIdUI-multiple-link-account .close.vtexIdUI-close, .vtexIdUI-page.ng-scope.vtexIdUI-change-pswd .close.vtexIdUI-close";
                let buttonClose = $("#dtbot-script").siblings("#vtexIdContainer.ng-scope").find(find);
                buttonClose.on("click", function () {
                    Wishlist.addProdutcInList();
                    Wishlist.removeProductInList();

                    Wishlist.addShelfProductInList();
                    Wishlist.removeShelfProductInList();
                });
            },
            verifyVtexId: function () {
                let intervalCheck = setInterval(function () {
                    if ($("#vtexIdContainer.ng-scope").length) {
                        clearInterval(intervalCheck);
                        Wishlist.reloadClickFunctionsIfCloseModal();
                    }
                }, 50)
            }
        }

        // Instanciando a funcao
        $(document).ready(Wishlist.init)
    
    } catch (e) {
        console.log("Erro na instância do [Wishlist]: ", e);
    }

})();