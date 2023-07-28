import {myProject, myTask, mySortedTask, emptySortedTask} from './class.js'
import { isAfter, isBefore, isSameWeek ,isSameDay, parse, differenceInCalendarDays} from 'date-fns'
import { getCurrentDatePH } from './add.js'


export function sortInbox(){
    myTask.forEach(item =>{
        mySortedTask.push(item)
    })
}

export function sortToday(){

    let today = parse(getCurrentDatePH(), 'MM/dd/yyyy', new Date())

    myTask.forEach(item =>{
        let dueDate = parse(item.date, 'MM/dd/yyyy', new Date)
        if ( isSameDay(today,dueDate)){
            mySortedTask.push(item)
        }
    })
}

export function sortWeek(){

    let today = parse(getCurrentDatePH(), 'MM/dd/yyyy', new Date())

    myTask.forEach(item => {
        let dueDate = parse(item.date, 'MM/dd/yyyy', new Date)
        if ((differenceInCalendarDays(dueDate,today) < 7 && differenceInCalendarDays(dueDate,today) >= 0 ) || isSameDay(today,dueDate)){

            mySortedTask.push(item)
        }
    })
}

export function isAlreadyDue(date){
    let today = parse(getCurrentDatePH(), 'MM/dd/yyyy', new Date())    
    let parsedDate = parse(date, 'MM/dd/yyyy', new Date())

    if(isBefore(parsedDate, today)){
        return true 
    }
    return false
}