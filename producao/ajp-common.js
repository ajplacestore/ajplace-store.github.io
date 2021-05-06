(function() {

    try {

        let Common = {
            init: function () {
                Common.applyConfigInSearchField();
                Common.returnPreviousPage();
                Common.mobileSearchFieldToggle();
            },
            mobileSearchFieldToggle: () => {
                let search = $('.header__link--search');
                let close = $('.search__close');
                let field = $('.header__search-field');
                //close.removeClass('hide');

                // Open Field
                search.on('click', e => {
                    e.preventDefault();
                    
                    $(".search__form").slideDown("fast");
                    $(".search__target").empty();

                    if ($(window).width() < 992) {
                        search.hide("fast");
                        close.show("fast");
                    }
                });

                // Close Field
                close.on('click', e => {
                    e.preventDefault();

                    $(".search__form").slideUp("fast");
                    $(".search__target").empty();

                    if ($(window).width() < 992) {
                        close.hide("fast");
                        search.show("fast");
                    }
                });
 

            },
            applyConfigInSearchField: () => {
                let input = $(".search__input");
                input.on('click', function () {
                    $(this).val(' ');
                });
                $(document).click(function(event) {
                    if (!$(event.target).is(".search__input")) {
                        input.val('');
                        // let thisInput = $('.search__input')[0];
                        // thisInput.placeholder = "O QUE VOCÊ DESEJA ENCONTRAR?"; 
                    }
                });
            },
            returnPreviousPage: () => {
                if (localStorage.AJP_prevUrl && localStorage.AJP_prevUrl.length) {
                    $("#return-to-prev-page").attr('href', localStorage.getItem("AJP_prevUrl"));
                    localStorage.setItem("AJP_currentUrl", window.location.href);

                    // Antes de trocar de página seto a pagina atual como anterior na proxima
                    $(window).unload(function() {
                        localStorage.setItem("AJP_prevUrl", window.location.href);
                    });
                } else {
                    console.log('[ELSE]');
                    window.localStorage.setItem("AJP_prevUrl", window.location.href);
                    window.localStorage.setItem("AJP_currentUrl", window.location.href);
                }

                // $(window).on("hashchange", function(e) {
                //     console.log('aquiii')
                //     console.log(window.location.href);
                // })
            }
        }

        // Instanciando a funcao
        $(document).ready(Common.init)

    } catch (e) {
        console.log("Erro na instância do [Common]: ", e);
    }

})();