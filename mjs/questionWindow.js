import {
	WordAnimation
} from './WordAnimation.js';

import {
	Window
} from './Window.js';

export class Question {

    /**
     * @param {HTMLElement} parent - Élément qui reçoit le contenu de la question 
     * @param {Text} quizList - Objet contenant les questions du quiz
     */


    constructor(parent, quizList,fonction='') {
        this.parent = parent
        this.quiz = quizList
        this.fonction = fonction

        localStorage.bestScore = 0
        
        if(localStorage.getItem("scoreCalcul") === null){
            this.bestScore = 0;
        }else{
            this.bestScore = localStorage.getItem("scoreCalcul");
        }
    }

    initialize = () => {
        this.score = 0
        this.questionNumber = 0
        localStorage.clear()

        this.createNextQuestion()
    }

    questionOut= (e) => {
        console.log(this.questionNumber)
	    /* si le questionnaire n'est pas terminé */
		if (this.questionNumber < this.quiz.questions.length) {
        /* On affiche la prochaine question */
            this.showNextQuestion()
        }
		else {
		    this.endGame()
		}
		//On désactive le bouton suivant
		this.nextBtnState(false, 0.3);
    }

    deleteQuestion = () => {
		/* On détruit les choix de réponses précédent */
		while (this.answers && this.answers.firstChild) {
			this.answers.removeChild(this.answers.firstChild)
		}
		while (this.window && this.window.firstChild) {
			this.window.removeChild(this.window.firstChild)
		}
		if (this.window) {
			this.parent.removeChild(this.window)
		}
	}


	showNextQuestion = (evt) => {
		/* On détruit la question précédente si elle existe */
        this.deleteQuestion()
        
        console.log('ok')
		/* On crée dynamiquement la nouvelle question */
		this.window = document.createElement('div')
        this.questionBox = document.createElement('div')
        this.question = document.createElement('p')

        this.window.classList.add('window')
        this.questionBox.classList.add('window__box')
        this.question.classList.add('question')

        this.parent.appendChild(this.window)
        this.window.appendChild(this.questionBox)
        this.questionBox.appendChild(this.question)
        
        this.question.innerHTML = this.quiz.questions[this.questionNumber].question
        
        this.answers = document.createElement('ul')
        this.questionBox.appendChild(this.answers)

        let answersNumber = this.quiz.questions[this.questionNumber].answers.length
        
        for (let i=0; i < answersNumber; i++) {
            
            let answer = document.createElement('li')
            answer.innerHTML = this.quiz.questions[this.questionNumber].answers[i]

            this.answers.appendChild(answer)
            this.isRight(answer,i)
        }
	} // afficherProchaineQuestion
    
    createNextQuestion = () => {

        this.window = document.createElement('div')
        this.questionBox = document.createElement('div')
        this.question = document.createElement('p')

        this.window.classList.add('window')
        this.questionBox.classList.add('window__box')
        this.question.classList.add('question')

        this.parent.appendChild(this.window)
        this.window.appendChild(this.questionBox)
        this.questionBox.appendChild(this.question)
        
        this.question.innerHTML = this.quiz.questions[this.questionNumber].question
        
        this.answers = document.createElement('ul')
        this.questionBox.appendChild(this.answers)

        let answersNumber = this.quiz.questions[this.questionNumber].answers.length
        
        for (let i=0; i < answersNumber; i++) {
            
            let answer = document.createElement('li')
            answer.innerHTML = this.quiz.questions[this.questionNumber].answers[i]

            this.answers.appendChild(answer)
            this.isRight(answer,i)
        }
    }

    isRight = (answer,i) => {
        
        answer.dataset.id = i

        answer.addEventListener("click", this.chooseAnswer, false);
    }

    chooseAnswer = (e) => {
        
        for (let answer of this.answers.childNodes) {
            answer.removeEventListener("click", this.chooseAnswer, false)
        }

        if (parseInt(e.target.dataset.id) === this.quiz.questions[this.questionNumber].good) {
			//On incrémente le score
			this.score++;
			//On affiche un message en haut du bouton cliqué
			this.showComment(e.target, this.quiz.comments.good);
		} else {
			//On affiche un message en haut du bouton cliqué
			this.showComment(e.target, this.quiz.comments.bad);
        }

        this.questionNumber++;
        //On affiche le score et on ré-active le bouton suivant
        let quizState = document.querySelector("footer > p");

		quizState.innerHTML = `Score: ${this.score}. Next one?`
        
        this.nextBtnState(true,1)
    }
    
    showComment = (btn, msg) => {
        console.log(msg)
        console.log(this.score)

        //On affiche le message au dessus du bouton avec la même fonte que la section
		let elmMsg = document.querySelector(".question")

		let posX = btn.offsetLeft + btn.offsetWidth * .8;
		let posY = btn.offsetTop - btn.offsetHeight * .5;

        // Classe d'animation de la réponse
        let message = new WordAnimation(posX, posY,msg, elmMsg);
    }

    endGame = () => {
		//On désactive le bouton suivant
		this.nextBtnState(false, 0.3);

		//Enregistrement du meilleur score
		this.bestScore = Math.max(this.bestScore, this.score);
		localStorage.setItem("scoreCalcul", this.bestScore);

		//On affiche une fenêtre pour indiquer que le jeu est complété
		this.showWindow()
	}


	showWindow = () => {

        this.deleteQuestion()

		let laPage = document.querySelector("main");
		let width = laPage.offsetWidth,
			height = laPage.offsetHeight,
			text = "Finish!";
	
		//Texte additionnel...
		text += `<br><br>Your score is ${this.score} / ${this.quiz.questions.length}`
		text += `<br>Your best score is ${this.bestScore} / ${this.quiz.questions.length}.`		
		text += `<br><br>Close the window to play again!`

		let window = new Window(0, 0, 800, 400, "lastWindow", text, laPage, this.playAgain)
		
    } // Fin afficherFenetre
    

    nextBtnState = (actif, transparence) => {
		//console.log("gererBoutonSuivant", actif, transparence);
        let nextBtn = document.querySelector("footer > div");
        console.log(nextBtn)

		if (actif == true) {

			nextBtn.addEventListener("mousedown", this.questionOut, false);

		} else {
			nextBtn.removeEventListener("mousedown", this.questionOut, false);
		}

		nextBtn.style.opacity = transparence + "";
    }
    

    playAgain = () => {
		//On réinitialise la question en cours
		this.initialize()
        //On change le message en bas de page pour l'état du jeu
        let quizState = document.querySelector("footer > p"); 

		quizState.innerHTML = "Ready?"
	}
}