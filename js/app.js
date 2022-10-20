const { createApp } = Vue;

const fetchApp = (url) => {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

const app = createApp({ //Es una instancia de Vue
    components: {
        'home-component': Home, //El nombre del componente es home-component y el valor es el objeto Home
        'about-component': About,
        'wine-component': Wine,
        'contact-component': Contact
    },
    data() {
        return {
            home: false,
            about: false,
            wineFilter: false,
            wine: false,
            contact: false,
            url: 'https://api.sampleapis.com/wines/reds',
            wines: [], //TODOS LOS VINOS
            winesByNameTitle: [], // FILTRADO POR TIPO DE VINO
            itemWines: [],
            loading: false,
            loading: true,
            kilometros: 0,
            metros: 0,
        }
    },
    watch: { //Es un objeto que tiene como propiedades funciones
        kilometros(value) { //value es el valor que tiene la propiedad kilometros

            this.kilometros = value;
            this.metros = value * 1000;

        },
        metros(value) { //value es el valor que tiene la propiedad metros

            this.kilometros = value / 1000;
            this.metros = value;


        },
    },
    methods: { //Metodos de la instancia de Vue
        async showMenu(component) { //Metodo para mostrar el menu
            //console.log(component);

            this.home = false;
            this.about = false;
            this.wineFilter = false;
            this.wine = false;
            this.contact = false;

            switch (component) {
                case 'home':
                    this.home = true;
                    break;
                case 'about':
                    this.about = true;
                    break;
                case 'wineFilter':
                    this.wineFilter = true;
                    this.loadingFilter = true;

                    const infoLocations = await fetchApp(this.url); //Espera a que se resuelva la promesa

                    this.itemWines = infoLocations.filter((wine) => (wine.winery == 'Bond' || wine.winery == 'Maselva')); //Filtramos los vinos que tengan la bodega Bond o Malselva


                    break;
                case 'wine':
                    this.wine = true;

                    const infoApp = await fetchApp(this.url); //Espera a que se resuelva la promesa

                    this.wines = infoApp.filter((wine) => (wine.winery == 'Bond' || wine.winery == 'Maselva')); //Filtramos los vinos que tengan la bodega Bond o Malselva

                    this.loading = true; //Cambia el estado de la variable loading a true

                    break;
                case 'contact':
                    this.contact = true;
                    break;
                default:
                    this.home = true;
            }

        },
        async getWines() {

            this.loadingFilter = false;

            console.log(this.$refs.search.value); //Muestra todos los elementos del DOM

            const search = this.$refs.search.value; //Obtenemos el valor del input
            const infoApp = await fetchApp(this.url); //Espera a que se resuelva la promesa

            // console.log(infoApp);
            //Filtramos los vinos que tengan el nombre que se ha introducido en el input)
            this.winesByNameTitle = infoApp.filter((wine) => {
                return wine.winery.trim().toUpperCase() == search.trim().toUpperCase()
            });

            this.loadingFilter = true;
        }

    }

}).mount('#app'); //Monto la app en el elemento con id app