(function() {

    try {

        let Common = {
            init: function () {
                Common.testCommon();
            },
            testCommon: () => {
                console.log('Common load');
            }
        }

        // Instanciando a funcao
        $(document).ready(Common.init)
    } catch (e) {
        console.log('Erro na instancia [Common]: ', e);
    }

})();