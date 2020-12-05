export class Introduction{
    /**
     * Création de la fenêtre d'accueil du quiz
     * @param {HTMLElement} parent - Élément qui reçoit le contenu de l'introduction 
     * @param {Text} texte - texte du message
     */

    constructor (parent, text, fonction=''){
        this.parent = parent
        this.text = text
        this.fonction = fonction
    }

    createWindow = () => {
        // Création des éléments HTML
        this.containerWindow = document.createElement('div')
        this.textIntro = document.createElement('div')
        this.paragraph = document.createElement('p')
        this.paragraph.innerHTML = this.text
        this.logo = document.createElement('div')
        this.object = document.createElement('object')

        // Ajout des classes
        this.containerWindow.classList.add('container')
        this.textIntro.classList.add('container__intro')
        this.logo.classList.add('container__logo')

        //Ajout des Éléments HTML
        this.parent.appendChild(this.containerWindow)
        this.containerWindow.appendChild(this.textIntro)
        this.textIntro.appendChild(this.paragraph)
        this.containerWindow.appendChild(this.logo)
        this.logo.appendChild(this.object).setAttribute("data", "./img/typo.svg")
        
        //Animation du logo et créations des particules
        this.animLogo()
        this.createParticles() 
        setTimeout(this.closeIntro, 12000)      
    }

    animLogo = () => {
        window.onload = () => {
            let myObject = document.querySelector('object')
            let mySvg = myObject.contentDocument 
            let svgStyle = mySvg.querySelector('style')
            let paths = mySvg.querySelectorAll('path')

            console.log(svgStyle)
            svgStyle.innerHTML = `.path { 
                                    fill: transparent;
                                    stroke-width: 4;
                                    stroke: #E8221C;
                                    stroke-dasharray: 900;
                                    stroke-dashoffset: 0;
                                    animation: animate-logo 5s linear forwards;
                                }
                            
                                @keyframes animate-logo {
                                    0% {
                                        stroke-dashoffset: 800;
                                        fill: transparent;
                                    }
                                    50% {
                                        stroke-dashoffset: 400;
                                        fill: transparent;
                                    }
                                    90% {
                                        stroke-dashoffset: 0;
                                        fill: #E8221C;
                                    }
                                    100% {
                                        stroke-dashoffset: 0;
                                        fill: #E8221C;
                                        stroke: transparent;
                                    }
                                }`
            
            for(const path of paths) {
                path.classList.add('path')
            }   
        }
    }

    createParticles = () => {
        
        this.particlesContainer = document.createElement('div')
        this.particlesContainer.setAttribute('id', 'particles-container')
        this.containerWindow.appendChild(this.particlesContainer)
        
        let i;
        
        for(i = 0; i < 50; i++) {
            this.particle = document.createElement('div')
            this.particle.classList.add('particle')
            this.particlesContainer.appendChild(this.particle)
        }
    }

    closeIntro = () => {

        this.containerWindow.classList.add('fade-out')
        
        setTimeout(this.removeIntro, 3000)      
    }

    removeIntro = () => {

        this.parent.removeChild(this.containerWindow)
        this.containerWindow.removeChild(this.textIntro)
        this.containerWindow.removeChild(this.logo)
        this.containerWindow.removeChild(this.particlesContainer)
        this.containerWindow.classList.remove('fade-out')

        //Enlever les références
        this.containerWindow = null

        // Fonction passée en paramètre
        this.fonction();
    }
}