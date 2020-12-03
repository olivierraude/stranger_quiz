

export class WordAnimation {

	/**
	 * Classe permettant de créer et d'animer des éléments textuels
	 * @param {Number} posX - position du word sur l'axe des X
	 * @param {Number} posY - position du word sur l'axe des Y
	 * @param {String} word  - chaîne indiquant le word à animer
	 * @param {HTMLElement} parent -  balise HTML pour afficher les words animés
	 */

	constructor(posX, posY, word, parent) {
		//Récupérer les valeurs passées en paramètre			
		this.posX = posX;
		this.posY = posY;
		this.word = word;
		this.parent = parent;

		//Autres propriétés du word animé
		this.opacityPercent = 1;
		this.scalePercent = 1;

		//Créer le word
		this.createWord();
	}

	/**
	 * Méthode pour créer chaque instance de la classe word et pour débuter leur animation
	 */
	createWord () {
		//Créer une balise <div> pour le word et lui attribuer des styles
		this.elHTML = document.createElement('div');
		this.elHTML.style.position = "absolute";
		this.elHTML.style.left = this.posX + "px";
		this.elHTML.style.top = this.posY + "px";
		
		
		//Mettre le point de transformation en haut à gauche
		this.elHTML.style.transformOrigin = "0% 0%";

		//Afficher le word transféré et mettre l'élément HTML dans son conteneur parent
		this.elHTML.innerHTML = this.word;
		this.parent.appendChild(this.elHTML);

		//Partir la première RequestAnimationFrame
		window.requestAnimationFrame(()=> {this.wordAnimate()});
	}


	/**
	 * Méthode pour animer le word et le détruire à la fin de son animation
	 */
	wordAnimate (tempsActuel) {
		//console.log("Animword", this);
		//Décrémenter le pourcentage d'animation pour l'opacité
		this.opacityPercent -= 0.03;
		//Incrémenter le pourcentage d'animation pour l'échelle
		this.scalePercent += 0.03;

		//Si le pourcentage de l'opacité est > 0, on anime le word et on repart une nouvelle requête d'animation
		//Sinon, on enlève l'élément HTML de l'affichage et +

		if (this.opacityPercent > 0) {
			//Animer l'échelle et l'opacité du word (i.e. de l'élément HTML)
			this.elHTML.style.opacity = this.opacityPercent + "";
			this.elHTML.style.transform = `scale(${this.scalePercent})`;

			//Prochaine requête d'animation
			this.requeteID = window.requestAnimationFrame(()=> {this.wordAnimate()});
			
		} else {

			//Enlever l'élément HTML de l'affichage
			this.parent.removeChild(this.elHTML);
			
			//Détruire les références
			this.elHTML = null;
			this.parent = null;

		}
	}
} //Fin animword