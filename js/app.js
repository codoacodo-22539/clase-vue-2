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
            wine: false,
            contact: false,
            url: 'https://api.sampleapis.com/wines/reds',
            wines: [],
            loading: false,
            kilometros: 0,
            metros: 0,
        }
    },
    watch: { //Es un objeto que tiene como propiedades funciones
        kilometros(value){ //value es el valor que tiene la propiedad kilometros
            
            this.kilometros = value;
            this.metros = value * 1000; 

        },
        metros(value){ //value es el valor que tiene la propiedad metros
            
            this.kilometros = value / 1000;
            this.metros = value;


        },
    },
    methods: { //Metodos de la instancia de Vue
        async showMenu(component) { //Metodo para mostrar el menu
            console.log(component);

            if (component == 'home') {
                this.home = true;
                this.about = false;
                this.wine = false;
                this.contact = false;
            }

            if (component == 'about') {
                this.home = false;
                this.about = true;
                this.wine = false;
                this.contact = false;
            }

            if (component == 'wine') {
                this.home = false;
                this.about = false;
                this.wine = true;
                this.contact = false;

                const infoApp = await fetchApp(this.url); //Espera a que se resuelva la promesa

                this.wines = infoApp.filter((wine) => (wine.winery == 'Bond' || wine.winery == 'Maselva')); //Filtramos los vinos que tengan la bodega Bond o Malselva

                this.loading = true; //Cambia el estado de la variable loading a true


            }

            if (component == 'contact') {
                this.home = false;
                this.about = false;
                this.wine = false;
                this.contact = true;
            }




        }
    }

}).mount('#app'); //Monto la app en el elemento con id app