import * as add from './add.js'
import { myProject } from './class.js'


export let renderProjectSidebar = function(){

    let projectList = document.getElementById('projectList')
    projectList.innerHTML = ""
    let oldProjects = Array.from(document.getElementsByClassName('project'))
    oldProjects.forEach(item=>{
        item.removeEventListener('click',toggleProjectActive)
    })

    myProject.forEach(item =>{
        let div = document.createElement('div')
        div.classList.add('project')
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        let span3 = document.createElement('span')
        div.innerHTML = item.title
        div.append(span1)
        div.append(span2)
        div.append(span3)

        
        projectList.append(div)
    })

    let projects = Array.from(document.getElementsByClassName('project'))

    projects.forEach(item =>{
        item.addEventListener('click',toggleProjectActive)
    })
    
}

let toggleProjectActive = function(){

    let projects = Array.from(document.getElementsByClassName('project'))

    projects.forEach(item =>{
        item.classList.remove('active')
    })

    this.classList.add('active')
    
}

let displayValidity = (function(){
    let submitButton = document.getElementById('submitButton')
    let cancelButton = document.getElementById('cancelButton')
    let titleInput = document.getElementById('titleAdd')
    let dateInput = document.getElementById('dateAdd')
    let modal = document.getElementById('modal')

    titleInput.addEventListener('input', add.checkTitleInput) 
    dateInput.addEventListener('input', add.checkDateInput)


    submitButton.addEventListener('click', ()=>{
        if(add.checkValidity() === true){
            add.addTask()
            modal.classList.remove('active')
        }

    })

    cancelButton.addEventListener('click', ()=>{
        modal.classList.remove('active')
        add.emptyInputs()
    })

})()

let displayProjectValidity = (function(){
    let submitButton = document.getElementById('submitProjectButton')
    let titleInput = document.getElementById('projectTitleAdd')
    let modal = document.getElementById('modal')
    let cancelButton = document.getElementById('cancelProjectButton')

    titleInput.addEventListener('input', add.checkProjectTitleInput)

    submitButton.addEventListener('click',()=>{
        if(add.checkProjectValidity() === true){
            add.addProject()
            modal.classList.remove('activeProject')
            add.emptyProjectInput()
            renderProjectSidebar()
        }
    })

    cancelButton.addEventListener('click',()=>{
        modal.classList.remove('activeProject')
        add.emptyProjectInput()
    })

})()


let displayAddMenu = (function(){
    let addButton = document.getElementById('addButton')
    let modal = document.getElementById('modal')

    addButton.addEventListener('click',function(){
        modal.classList.add('active')
    })

})()

let displayAddProjectMenu = (function(){
    let addProjectButton = document.getElementById('addProjectButton')
    let modal = document.getElementById('modal')

     addProjectButton.addEventListener('click',()=>{
        modal.classList.add('activeProject')
    })
})()


let sidebarDisplay = (function(){

    let overviewItem = Array.from(document.getElementsByClassName('overviewItem'))

    overviewItem.forEach(item => {
        item.addEventListener('click', function(){
            overviewItem.forEach(item => item.classList.remove('active'))
            this.classList.add('active')
        })
    });

})()

