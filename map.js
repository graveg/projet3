class MyMap{
    constructor(map, latLng=[45.764043, 4.835659], zoom=13.5, layer='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',minZoom=13.5, maxZoom=18){
        this.map = map;
        this.latLng = latLng;
        this.zoom = zoom;
        this.layer = layer;
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;
        this.init();
    }//-- end constructor --
    
    init(){
        this.myMap = L.map(this.map).setView(this.latLng,this.zoom);
        L.tileLayer(this.layer, {minZoom: this.minZoom, maxZoom: this.maxZoom}).addTo(this.myMap);
        this.greenIcon = new L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
        });
        
        this.orangeIcon = new L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41]
        });
        
        this.redIcon = new L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41]
        });

    }
    
    stationsRecovery(source){
        ajaxGet(source, reponse => {
            let easyLocation = JSON.parse(reponse);
            console.log(easyLocation);
            easyLocation.forEach(easyLocation => {
                // utilisation des données de position pour afficher cahque markers au positions des stations velov
                this.myIcon = this.greenIcon;
                    if (easyLocation.status === "CLOSED") { // si la station est FERMÉE
                    easyLocation.available_bikes === 0; // elle n'a plus de vélos disponibles
                    };
                    
                    if (easyLocation.available_bikes < 10) { // moins de 10 places restantes, il devient orange
                        this.myIcon = this.orangeIcon;
                        if (easyLocation.available_bikes === 0) { // à 0, il devient rouge
                            this.myIcon = this.redIcon;
                        }
                    };
    
                this.createIcon = L.marker([easyLocation.position.lat, easyLocation.position.lng], {icon: this.myIcon}).addTo(this.myMap)
                
                this.createIcon.on('click', e => {
                    $('#stationInfos').css('display', 'block'); // affiche les infos de easyLocations
                    $('#stationInfos').html(''); // efface les dernières valeurs d'informations
                    $('#map').css('width', '75%');
                    $('#formContainer').css('width', '25%');
                    $('#formContainer').css('display', 'block');
                    $('#canvasContainer').css('display', 'none'); 

                    document.querySelector ('#stationInfos')
                        .innerHTML +=
                        `<div id="item">
                                <h1 class="easyLocationName">${easyLocation.name}</h1>
                                <p class="adresse">${easyLocation.address}</p>
                                <p class="placeDisponible">${easyLocation.available_bike_stands} place(s) disponible(s)</p>
                                <p class="Quantity"> ${easyLocation.available_bikes}  vélo(s) diponible(s)</p>
                        </div>`
                          
                    //condition de reservation 
                    if (easyLocation.available_bikes > 0) {
                        $('#form').css('display', 'block');
                        $('#pasDeVelos img').css('display', 'none');
                    }else {
                        $('#form').css('display', 'none');
                        $('#pasDeVelos img').css('display', 'block');
                    }
                                           
                });

            })//-- end foreach --

        })//-- end ajaxGet --
        
    }//-- end stationsRevovery --
                
}//-- end class MyMap --