class reservation{
    constructor(){
        this.timerContainer =document.getElementById('timer');//selecteur du container du timer
        this.textTimer = document.getElementById('textTimer');//selecteur du container du text du Timer
        this.timerStationName = document.getElementById('station');//selecteur du container de la station
        this.annulResa = document.getElementById('btAnnul');//selecteur du container du bouton annuler
        this.station = document.getElementsByClassName('easyLocationName');//selecteur du container de la class contenant le nom de la station selectionée
        this.init();
    }//-- end constructor --
    
    init(){
        this.myCanvas = new CanvasObjet();// on initialise et on appel la class du Canvas
        //on initialise les differente fonctions
        this.displayCanvas();
        this.submitCanvas();
        this.endTimeEvent();
        this.refresh();
    }//-- end init --
    
    displayCanvas(){
         $('#btnSelection').on('click', (e) => {//au click du bouton de selection 
            e.preventDefault();//on stop le submit car pas d'envoie a faire
            if(document.formSaisie.name.value && document.formSaisie.firstname.value !=''){//si le nom ou le prenom sont saisis
                $('#canvasContainer').css('display', 'block');// on display canvas contener 
                //on ajustes la map à 50%, le formulair à 25%, et n integre le canvas avec un width à 25% de la div 
                $('#map').css('width', '50%');
                $('#formContainer').css('width', '25%');
                $('#canvasContainer').css('width', '25%');
            }
            else{//si nom et prenom non reseigné on lance une alert
                alert('Entrez votre Nom et Prénom avant de valider, merci.'); 
            };

        });
    }//-- end displayCanvas --
    
    create(){
        console.log('entree dans la section create')
        if(this.textTimer.style.display === 'none'){ //affichage du text timer s'il n'est pas affiché
            this.textTimer.style.display = 'block';
        }
        if(document.getElementById('expired').style.display === 'block'){//cache le text expired si il est affiché
            document.getElementById('expired').style.display = 'none';
        }
        sessionStorage.setItem('dateExpiration', this.expiration);
        this.timerContainer.style.display = 'block';
        
        this.timerStationName.innerHTML = this.stationName;
        sessionStorage.setItem('station', this.stationName);
        console.log(this.stationName);

        
    }//-- end create --
    
    refresh(){
        if(sessionStorage.station){
            $(this.timerStationName).html(sessionStorage.station);
        };    

         if(sessionStorage.dateExpiration){
            let dateExpiration = Number(sessionStorage.dateExpiration);
            let time = dateExpiration - Date.now();
            this.timer = new Timer(time);
            this.recovery();
        }
    }//-- end refresh --
    
    recovery(){
        this.timerContainer.style.display = 'block';
       $('#station').innerHTML = sessionStorage.station;  
    }//-- end recovery --
    
    clear(){//permet de stoper le timer a la fin du decompte
        sessionStorage.clear();
        this.textTimer.style.display = 'none';
        document.getElementById('expired').style.display = 'block';
        console.log('section clear')
        }//-- end clear --
    
    
    
    submitCanvas(){
        $('#btValider').on('click', () =>{
            if(this.myCanvas.painted){
                console.log('ok');
                console.log(sessionStorage.station);
                if( sessionStorage.station != undefined){
                    if(confirm('Cette nouvelle réservation annulera la réservation sur la station : ' + this.stationName +'.')){
                        this.timer.stop();

                    }else{
                        $('#canvasContainer').css('display', 'none');
                        $('#map').css('width', '100%');
                        $('#formContainer').css('display', 'none');
                        return false;
                    }
                
                }
                this.myCanvas.saveCanvas();
                this.myCanvas.resetCanvas();
                this.signature = this.myCanvas.canvasData;
                $('#canvasContainer').css('display', 'none');
                $('#map').css('width', '100%');
                $('#formContainer').css('display', 'none');
                this.station = $('.easyLocationName');
                this.timer = new Timer(1200000);
                this.expiration = Date.now() + (this.timer.time*1000);
                this.stationName = $(this.station).html();
                this.bookingButton = document.getElementById('btnValider ');
                this.create();
                $('html,body').animate({scrollTop: $('#timer').offset().top}, 'slow');
               
            }else{
               alert('Merci de signer avant de valider !');
            };  
        });
    }//-- end submitCanvas --
    
           
    endTimeEvent(){
        document.addEventListener('endTimeEvent', () => {
            this.clear();
        })
    }//-- end endTimeEvent
}

