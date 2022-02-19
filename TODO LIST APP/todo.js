'use strict'


// input
const todoInput = document.querySelector('.todoInput');
const todoAdd = document.querySelector('.todoAdd');
const todoItems = document.querySelector('.todoItems')
const todoWord = document.querySelector('.todoWord')
const clearBtn = document.querySelector('.clearBtn')
const complete = document.querySelector('.complete')
const totalNum = document.querySelector('.totalNum')
const todoCancel =  document.querySelectorAll('.todoCancel')
const remainingTasks =  document.querySelector('.remainingTasks')
const todoName = document.querySelector('.todoName')
const innerValue = document.querySelector('.innerValue')
let totalTasks

const todoItem = document.querySelectorAll('.todoItem')

//alertbox
const alertBox = document.querySelector('.alertBox')
const alertBoxVisible = document.querySelector('.alertBoxVisible')


const removeBtn = document.querySelector('.removebtn')




const arr =[]

//////////////////////////////////////////////////////////////////////////////////////////////////




    todoAdd.addEventListener('click',(e) =>{


        if(todoInput.value.length === 0){
            alertBox.classList.remove('alertBoxVisible')
            todoInput.focus()
        }else{
           
            alertBox.classList.add('alertBoxVisible')
            let val = todoInput.value
            arr.push(val)
            setItem()
            createTask(val)
        }
    })






// create task
function createTask(input){


    const date = new Date();
            const newDate = `${date.getDate()}`.padStart(2,0)
            const newMonth = `${date.getMonth()+1}`.padStart(2,0)
            const newHour = `${date.getHours()}`.padStart(2,0)
            const newMinute = `${date.getMinutes()}`.padStart(2,0)
    

            const html = `<li class="todoItem">
            <div class="listContent">
                <input type="checkbox" class="checkBox">
                <div class="todoName"><p class='innerValue'>${input}</p></div>
                <i class="fas fa-times todoCancel"></i>
            </div>
            <div class="dateContent">
                <p>${newDate}/${newMonth}/${date.getFullYear()}</p>
                <p>${newHour}:${newMinute} ${newHour<12?'AM':'PM'}</p>
            </div>
        </li>`;

            todoItems.insertAdjacentHTML('afterbegin',html)
            document.querySelector('.todoItem').classList.add('todoItemAnime')
            todoInput.value = ""
            todoInput.focus()



        totalTask()
        todoTasks()
        checkBoxAnime()
        remainingTask()
        
}




// set item localstorage
function setItem(){
    localStorage.setItem('value',JSON.stringify(arr))
}




// get item localstorag
function getItem(){

    let item = localStorage.getItem('value')
    let res = JSON.parse(item)
    res.forEach(e =>{
        createTask(e)
    })
    
}
getItem()




// remove from localstorage
function removeItem(){

    const todoItem = document.querySelectorAll(".todoItem");
    for (let i = 0; i <todoItem.length; i++){
    
        todoItem[i].querySelector(".todoCancel").addEventListener("click",
        function(){
            let val = this.closest(".todoItem").querySelector('.innerValue').innerHTML
            let value = JSON.parse(localStorage.getItem("value"));


            let result = value.filter(e => e!==val)
            localStorage.setItem('value',JSON.stringify(result))
        
        })
    }    
}
removeItem()





// remove todos
function todoTasks() {

    const todoItem = document.querySelectorAll(".todoItem");
   
    let sum
    for (let i = 0; i <todoItem.length; i++){
        
       todoItem[i].querySelector(".todoCancel").addEventListener("click",
       function(){
          this.closest(".todoItem").remove()
          totalNum.innerHTML = todoItem.length - 1
          sum -= 1
          totalTask()
          completed()
          remainingTask()
        todoInput.focus()
       });
       
    }    
}





// check box 
function checkBoxAnime(){
    const checkBox = document.querySelector('.checkBox')
    const todoItem = document.querySelector(".todoItem")

    checkBox.addEventListener('click',() => {
        todoItem.classList.toggle('checkBoxCancel')
        todoInput.focus()
        completed()
        remainingTask()
     })
}




// completed
function completed(){

    
    const checkBox = document.querySelectorAll('.checkBox')

    let sum = 0
   
    checkBox.forEach((e)=>{

        if(e.checked == true){
            sum++ 
        }
    })
    complete.innerHTML = sum
   return sum
    
}






// num of tasks
function totalTask(){
    
    const totalNum = document.querySelector('.totalNum')
    const todoItem = document.querySelectorAll('.todoItem')

    totalNum.innerHTML = todoItem.length
    return todoItem.length
   
}





// remaining
function remainingTask(){

    let rem =  completed()
    let total = totalTask()
    let remTotal = (total - rem)

     remainingTasks.innerHTML = remTotal
 }



 



// clear
clearBtn.addEventListener('click',function(){
    todoItems.innerHTML =" "
    complete.innerHTML = 0
    totalNum.innerHTML = 0
    remainingTasks.innerHTML = 0
    todoInput.focus()
    localStorage.clear()
})


todoInput.addEventListener('keyup',function(event){
    let x= event.keyCode
    if(x == 13){
        event.preventDefault();
       todoAdd.click()
       todoInput.value = ""
        todoInput.focus()
    }
    
})



