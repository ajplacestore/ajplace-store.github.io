(function() {

    try {

        let Development = {
            init: () => {
                Development.teste();
            },
            teste: () => {
                console.log("Carregado!!!");
            }
        }

        // Instanciando a funcao
        $(document).ready(Development.init)
    
    } catch (e) {
        console.log("Erro na instância do [Development]: ", e);
    }

})();