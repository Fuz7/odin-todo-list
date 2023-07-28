import './static/styles.css'
import { renderProjectSidebar, renderOverviewContent, renderProjectList } from './display.js'
import {myTask, Task, myProject, Project} from './class.js'


let task1 = new Task('First Task', 'HEHE', '03/23/2021','General', false)
let task2 = new Task('Second Task', '', '03/24/2024','Project 1', false)
let task3 = new Task('Third Task', '', '07/28/2023','Project 1', true)
let task4 = new Task('Fourth Task', 'EA','',"General", true)
let task5 = new Task('Fifth Task', 'EA','03/21/2022',"General", true)

task4.dateCompletion = "09/23/2023"
task5.dateCompletion = '05/23/2022'
myTask.push(task1)
myTask.push(task2)
myTask.push(task3)
myTask.push(task4)
myTask.push(task5)

let project1 = new Project('Coding')
let project2 = new Project('Exercise')
myProject.push(project1)
myProject.push(project2)

renderProjectSidebar()
renderOverviewContent('Inbox')
renderProjectList()
let dropdown = document.getElementById('dropdown')
dropdown.addEventListener('click',function(){
    dropdown.classList.toggle('active')
})


