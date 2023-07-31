import { myProject } from "./class"

export function checkValidities(){

    let titleInput = document.getElementById('titleAdd')
    let dateInput = document.getElementById('dateAdd')


    if (titleInput.value === "" && (!(dateInput.checkValidity()))){
        titleInput.classList.add('invalid')
        dateInput.classList.add('invalid')
        return false
    }

    if (titleInput.value === ""){
        titleInput.classList.add('invalid')
        return false
    } 
    
    
    if (!(dateInput.checkValidity())){
        dateInput.classList.add('invalid')
        return false
    }

    return true

}

export function checkEditTaskValidity(){

    let titleInput = document.getElementById('titleEdit')
    let dateInput = document.getElementById('dateEdit')


    if (titleInput.value === "" && (!(dateInput.checkValidity()))){
        titleInput.classList.add('invalid')
        dateInput.classList.add('invalid')
        return false
    }

    if (titleInput.value === ""){
        titleInput.classList.add('invalid')
        return false
    } 
    
    
    if (!(dateInput.checkValidity())){
        dateInput.classList.add('invalid')
        return false
    }

    return true

}

export function checkEditValidity(){
    let titleInput = document.getElementById('projectEditTitle')
    let dateInput = document.getElementById('dateEdit')
    let span = document.getElementById('editErrorSpan')
    
    if (titleInput.value === ""){
        span.innerText = "Please fill out this field."
        titleInput.classList.add('invalid')
        return false
    } else if(titleInput.value === "General"){
        span.innerText = "This name is already taken.(Projectless task default value)"
        titleInput.classList.add('invalid')
        return false
    }

    if (!(dateInput.checkValidity())){
        dateInput.classList.add('invalid')
    }

    return true 
}


export function checkTitleInput(){
    
    let titleInput = document.getElementById('titleAdd')

    if (titleInput.value !== ""){
        titleInput.classList.remove('invalid')
    }

}


export function checkProjectTitleInput(){

    let titleInput = document.getElementById('projectTitleAdd')

    if (titleInput.value !== ""){
        titleInput.classList.remove('invalid')
    }    
    
}

export function checkDateInput(){

    let dateInput = document.getElementById('dateAdd')
    dateInput.classList.add('active')
    if (dateInput.checkValidity()){
        dateInput.classList.remove('invalid')
    }
}

export function checkProjectInput(){
    let projectInput = document.getElementById('projectAdd')
    projectInput.classList.add('active')
}

export function checkEditTitleInput(){
    
    let titleEditInput = document.getElementById('titleEdit')
    if (titleEditInput.value!==""){
        titleEditInput.classList.remove('invalid')
    }
}

export function checkEditDateInput(){
    
    let dateEditInput = document.getElementById('dateEdit')
    dateEditInput.classList.add('active')
    if (dateEditInput.checkValidity()){
        dateEditInput.classList.remove('invalid')
    }
}

export function checkProjectValidity(){

    let titleInput = document.getElementById('projectTitleAdd')
    let span = document.getElementById('addErrorSpan')

    if (titleInput.value === ""){
        span.innerText = "Please fill out this field."
        titleInput.classList.add('invalid')
        return false
    } else if(titleInput.value === "General"){
        span.innerText = "This name is already taken.(Projectless task default value)"
        titleInput.classList.add('invalid')
        return false
    }

    let checkValid = true

    myProject.forEach(item=>{
        if (item.title === titleInput.value){
            span.innerText = "This name is already taken."
            titleInput.classList.add('invalid')
            checkValid =  false
        }
    })

    if(checkValid){
        return true
    }
    return false


}
