import './static/styles.css'
import { renderProjectSidebar } from './display.js'
import {myTask, Task, myProject, Project} from './class.js'


let task1 = new Task('First Task', 'HEHE', '2-14-2024','General', false)
let task2 = new Task('Second Task', '', '2-14-2024','Project 1', false)
myTask.push(task1)
myTask.push(task2)

let project1 = new Project('Coding')
let project2 = new Project('Exercise')
myProject.push(project1)
myProject.push(project2)

renderProjectSidebar()