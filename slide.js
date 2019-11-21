class Slide {
	constructor(container, timeout, fadeout, fadein) {
        this.slider = $(container); // selecteur du container du slider
        this.slide = this.slider.find('.itemImage'); // selecteur des slides
        this.timeout = timeout; // durée de mise en ligne du slide actif
        this.fadeOut = fadeout;
        this.fadeIn = fadein;
		this.indexSlide = this.slide.length - 1; // index (nombre de slides)
		this.i = 0; // compteur
        this.activeSlide = this.slide.eq(this.i); // image active, qui possède l'index

        this.animationRunning = true;
        const _self =this;
        $(this.slider).bind('mouseover', function(e){
            _self.animationRunning = false
        });
        $(this.slider).bind('mouseleave', function(e){
            _self.animationRunning = true
        });

        this.initSettings(); // lance les premières propriétés + événements

    }; // fin du constructor

   
    
    initSettings() {
        this.activeSlide.css({ // this.activeSlide.css('display', 'block'); // lance la première slide
			display: 'block'
        });
        
        $(document).ready(($) => { // quand le DOM est prêt, on lance ces 2 méthodes
			this.slideLoop();
		});

		$('.btnDroit').on('click', () => { // événement clic sur l'image suivante
            this.nextSlide();
    	});

    	$('.btnGauche').on('click', () => { // événement clic sur l'image précédente
            this.prevSlide();
    	});

        
    	$(document).keyup((touche) => { // événement touche clavier
	        let saisie = touche.code || touche.key;

	        if (saisie === "ArrowRight") {
	           this.nextSlide();
	        } else if (saisie === "ArrowLeft") {
	           this.prevSlide();
	        }
        });

        
    };

	nextSlide() {
        this.i++; // on incrémente l'index
        	if (this.i > this.indexSlide) { // si index supérieur au nombre de slide, on revient au début
            this.i = 0;
            };

        this.changeSlide();
    };

    prevSlide() {
        this.i--; // on décrémente l'index
        if (this.i < 0) { // si index inférieur à 0, on passe au dernier slide
            this.i = this.indexSlide;
        };

        this.changeSlide();
    };

	slideLoop() {
       setTimeout( () => {
           if(this.animationRunning){     
                if (this.i < this.indexSlide) { // si l'index est inférieur au nombre de slides
                this.i++; // on incrémente (on passe au slide suivant) 
                }else {
                    this.i = 0; // sinon, on revient au premier slide (dernier slide => premier slide)
                };
                this.changeSlide();
            };
            this.slideLoop();// on relance la fonction pour créer la boucle*/
        }, this.timeout); // toutes les 5 secondes
        console.log('pas de souris sur le slide');
                
    };  
    
              
	changeSlide() {
		this.activeSlide.fadeOut(this.fadeOut); // fait disparaître lentement la slide active (remplace $slide.css('display', 'none');)
        this.activeSlide = this.slide.eq(this.i); // change l'index
        this.activeSlide.fadeIn(this.fadeIn); // fait apparaître lentement le slide du nouvel index(précédement : $activeSlide.css('display', 'block');)
    };

 
};