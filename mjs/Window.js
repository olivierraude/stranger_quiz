
export class Window {
	/**
	 * Classe permettant de créer et d'afficher une fenêtre
	 * et, d'appeler une function de l'application passée en paramètre
	 * @param {Number} posX - position du mot sur l'axe des X
	 * @param {Number} posY - position du mot sur l'axe des Y
	 * @param {Number} width - width de la fenêtre
	 * @param {Number} height - height de la fenêtre
	 * @param {String} classeCSS  - classe CSS pour la mise en forme de la fenêtre
	 * @param {String} text  - text à afficher dans la fenêtre
	 * @param {HTMLElement} parent -  balise HTML pour afficher les mots animés
	 * @param {Function} function  - function référencée à appeler sur un mousedown
	 */

	constructor(posX, posY, width, height, classeCSS, text, parent, fonction) {
		//Récupérer les valeurs passées en paramètre			
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.classeCSS = classeCSS;
		this.text = text;
		this.parent = parent;
		this.fonction = fonction;

		//Autre propriété de la fenêtre
		this.scalePercent = 0;
        console.log('hello World!')
		//Créer la fenêtre
		this.createWindow();
	}

	/**
	 * Méthode pour créer et afficher les instances de la classe Fenetre
	 */
	createWindow = () => {
		//Créer une balise <div>
		this.elHTML = document.createElement('div');
		//Appliquer les éléments de style
		this.elHTML.style.width = this.width + "px";
		this.elHTML.style.height = this.height + "px";
		this.elHTML.style.left = this.posX + "px";
		this.elHTML.style.top = this.posY + "px";
		this.elHTML.classList.add(this.classeCSS);
		
		//Mettre un bouton dans l'élément HTML en créant simplement une division
		this.leBouton = document.createElement('div');
		this.leBouton.innerHTML = "X";
		this.elHTML.appendChild(this.leBouton);
		
		//Mettre le text dans une seconde division
		let theText = document.createElement('div');
		theText.innerHTML = this.text;
		this.elHTML.appendChild(theText);

		//Au départ on place la fenêtre en haut de l'écran
		this.posY_temp = -this.height;
		this.elHTML.style.top = this.posY_temp + "px";

		//Mettre la fenêtre dans son conteneur parent		
		this.parent.appendChild(this.elHTML);

		//Mettre un écouteur sur le bouton pour fermer la fenêtre et appeler la function passée en paramètre
		this.leBouton.addEventListener("mousedown", (evt) => this.fermerFenetre(evt), false);

		//Partir la première requête d'animation
		window.requestAnimationFrame(() => this.animerFenetre());
	}


	/**
	 * Méthode pour faire descendre la fenêtre au moment de son affichage
	 */
	animerFenetre() {
		//On fait descendre la fenêtre tant qu'elle n'a pas atteint sa position finale

		if (this.posY_temp < this.posY) {
			//Descendre la fenêtre
			this.posY_temp += 8;
			this.elHTML.style.top = this.posY_temp + "px";

			//Prochaine requête d'animation
			window.requestAnimationFrame(() => this.animerFenetre());
		}
	}
	

	fermerFenetre(evt) {
		//Enlever l'écouteur sur l'élément HTML
		this.elHTML.removeEventListener("mousedown", (evt) => this.fermerFenetre(evt), false);

		//Enlever la fenetre
		this.parent.removeChild(this.elHTML);

		//Appeler la function passée en paramètre
		this.fonction();
		
		//Arrêter la propagation de l'événement???
		evt.stopPropagation();

		//Enlever les références
		this.elHTML = null;
		this.parent = null;
		this.function = null;
		this.leBouton = null;

	}

} //Fin classe Fenetre