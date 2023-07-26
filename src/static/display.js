import { checkValidity, checkTitleInput, addTask, emptyInputs } from './add.js'


let displayValidity = (function(){
    let submitButton = document.getElementById('submitButton')
    let cancelButton = document.getElementById('cancelButton')
    let titleInput = document.getElementById('titleAdd')
    let modal = document.getElementById('modal')

    titleInput.addEventListener('input', checkTitleInput) 

    submitButton.addEventListener('click', ()=>{
        if(checkValidity() === true){
            addTask()
            modal.classList.remove('active')
        }

    })

    cancelButton.addEventListener('click', ()=>{
        modal.classList.remove('active')
        emptyInputs()
    })

})()

let displayAddMenu = (function(){
    let addButton = document.getElementById('addButton')
    let modal = document.getElementById('modal')

    addButton.addEventListener('click',function(){
        modal.classList.add('active')
    })

})()

export { displayValidity, displayAddMenu }