import {Introduction} from "./Intro.js"
import {Question} from "./questionWindow.js"
import {Quiz} from "./quizList.js"

const main = document.querySelector('main')

const QuestionWindow = new Question(main,
                                    Quiz)

const Intro = new Introduction(main,
                            "Do you know your",
                            QuestionWindow.initialize
                            )

Intro.createWindow()