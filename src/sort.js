import {myProject, myTask, mySortedTask, emptySortedTask, setSortedTask, emptySortedListedTask, mySortedListedTask} from './class.js'
import { isAfter, isBefore, isSameWeek ,isSameDay, parse, differenceInCalendarDays} from 'date-fns'
import { getCurrentDatePH } from './add.js'


export function sortInbox(){
    emptySortedTask()

    myTask.forEach(item =>{
        mySortedTask.push(item)
    })
}

export function sortToday(){
    emptySortedTask()
    let today = parse(getCurrentDatePH(), 'MM/dd/yyyy', new Date())

    myTask.forEach(item =>{
        let dueDate = parse(item.date, 'MM/dd/yyyy', new Date)
        if ( isSameDay(today,dueDate)){
            mySortedTask.push(item)
        }
    })
}

export function sortWeek(){
    emptySortedTask()
    let today = parse(getCurrentDatePH(), 'MM/dd/yyyy', new Date())

    myTask.forEach(item => {
        let dueDate = parse(item.date, 'MM/dd/yyyy', new Date)
        if ((differenceInCalendarDays(dueDate,today) < 7 && differenceInCalendarDays(dueDate,today) >= 0 ) || isSameDay(today,dueDate)){

            mySortedTask.push(item)
        }
    })
}

export function sortByMilestone(){
    emptySortedTask()

    let milestoneList = myTask.filter(item=>{
        if(item.milestone === true && item.dateCompletion !== ''){
            return true
        }
    })

    milestoneList.forEach(item=>{
        mySortedTask.push(item)
    })

}


export function sortByProject(name){
    let SortedList

    

    if (name !== "Default"){
        emptySortedListedTask()
        SortedList = mySortedTask.filter(item=> (item.project === name)? true : false)
        emptySortedTask()
        SortedList.forEach(item=> mySortedListedTask.push(item))
    } else{
        
        emptySortedListedTask()
        mySortedTask.forEach(item=> mySortedListedTask.push(item))
        emptySortedTask()
    }

}   


export function isAlreadyDue(date){
    let today = parse(getCurrentDatePH(), 'MM/dd/yyyy', new Date())    
    let parsedDate = parse(date, 'MM/dd/yyyy', new Date())

    if(isBefore(parsedDate, today)){
        return true 
    }
    return false
}