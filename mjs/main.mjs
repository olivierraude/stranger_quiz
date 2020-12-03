import {Introduction} from "./Intro.mjs"
import {Question} from "./questionWindow.mjs"
import {Quiz} from "./quizList.mjs"

const main = document.querySelector('main')

const QuestionWindow = new Question(main,
                                    Quiz)

const Intro = new Introduction(main,
                            "Do you know your",
                            QuestionWindow.initialize
                            )

Intro.createWindow()