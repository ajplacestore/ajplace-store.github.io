(function() {

    try {
  
        let Home = {
            init: function() {
                Home.bringBanners();
            },
            bringBanners: () => {
                console.log('[bringBanners]');
            }
        }

        // Instanciando a funcao
        $(document).ready(Home.init)
    
    } catch (e) {
        console.log('Erro na instancia [Home]: ', e);
    }

})();