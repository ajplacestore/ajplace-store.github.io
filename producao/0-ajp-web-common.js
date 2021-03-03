(function() {

    try {

        let Common = {
            init: function () {
                Common.applyConfigInSearchField();
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
            }
        }

        // Instanciando a funcao
        $(document).ready(Common.init)
    } catch (e) {
        console.log('Erro na instancia [Common]: ', e);
    }

})();