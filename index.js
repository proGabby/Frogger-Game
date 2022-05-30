const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplayer = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logLeft = document.querySelectorAll('.log-left')
const logRight = document.querySelectorAll('.log-right')
const carsRight = document.querySelectorAll('.car-right')
const carsLeft = document.querySelectorAll('.car-left')


let timerId
let resultTimer 
let currentIndex = 76
const gridPerRow = 9

let currentTime = 20

function autoMoveBlocks(){

    currentTime--
    timeLeftDisplay.textContent = currentTime

    logLeft.forEach((singleLog)=>{
        moveBlocksLeft(singleLog)
    })

    logRight.forEach((rightLog)=>{
        moveBlocksRight(rightLog)
    })
    
    carsRight.forEach((rightcar)=>{
        moveCarRight(rightcar)
    })

    carsLeft.forEach((Leftcar)=>{
        moveCarLeft(Leftcar)
    })

}



//move the block leftward
function moveBlocksLeft(logLeft){
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break;
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break;
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break;
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break;
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break;
        }
        
    }
    
    
    //move the block rightward
    function moveBlocksRight(rightlogs){
    switch (true) {
        case rightlogs.classList.contains('l5'):
            rightlogs.classList.remove('l5')
            rightlogs.classList.add('l4')
            break;
            case rightlogs.classList.contains('l4'):
                rightlogs.classList.remove('l4')
            rightlogs.classList.add('l3')
            break;
        case rightlogs.classList.contains('l3'):
            rightlogs.classList.remove('l3')
            rightlogs.classList.add('l2')
            break;
        case rightlogs.classList.contains('l2'):
            rightlogs.classList.remove('l2')
            rightlogs.classList.add('l1')
            break;
            case rightlogs.classList.contains('l1'):
                rightlogs.classList.remove('l1')
            rightlogs.classList.add('l5')
            break;
    }
    
}

//move the cars rightward
function moveCarRight(rightcars){
    switch (true) {
        case rightcars.classList.contains('c3'):
            rightcars.classList.remove('c3')
            rightcars.classList.add('c2')
            break;
            case rightcars.classList.contains('c2'):
            rightcars.classList.remove('c2')
            rightcars.classList.add('c1')
            break;
        case rightcars.classList.contains('c1'):
            rightcars.classList.remove('c1')
            rightcars.classList.add('c3')
            break;
        
    }
    
}

//move the cars leftward
function moveCarLeft(leftcars){
    switch (true) {
        case leftcars.classList.contains('c1'):
            leftcars.classList.remove('c1')
            leftcars.classList.add('c2')
            break;
            case leftcars.classList.contains('c2'):
                leftcars.classList.remove('c2')
            leftcars.classList.add('c3')
            break;
        case leftcars.classList.contains('c3'):
            leftcars.classList.remove('c3')
            leftcars.classList.add('c1')
            break;
        
    }
    
}

function loss(){
    if(
        squares[currentIndex].classList.contains('c2')||
        squares[currentIndex].classList.contains('c2')||
        squares[currentIndex].classList.contains('l2')||
        squares[currentIndex].classList.contains('l3')||
        squares[currentIndex].classList.contains('l1')||
        currentTime <= 0
    ){
        resultDisplayer.textContent = 'You lose'
        clearInterval(timerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keydown', moveFrog)
    }

}



//move the frog
function moveFrog(e){
    // console.log(e)
    squares[currentIndex].classList.remove('frog')

    switch(e.key){    
        case 'ArrowLeft':
            if(currentIndex% gridPerRow != 0) 
            currentIndex-=1
            break;
            case 'ArrowRight':
                if((currentIndex % gridPerRow)< gridPerRow-1)
            currentIndex+=1
            break;
        case 'ArrowUp':
            if((currentIndex - gridPerRow)>0)
            currentIndex-=gridPerRow
            break;
            case 'ArrowDown':
                if((currentIndex + gridPerRow)<(gridPerRow * gridPerRow))
                currentIndex+=gridPerRow
                break;
                
    }
    squares[currentIndex].classList.add('frog')
}


function win(){
    if(squares[currentIndex].classList.contains('ending-block')){
        resultDisplayer.textContent = 'You Win'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveFrog)
    }
}

startPauseButton.addEventListener('click',()=>{
    if(timerId){
        clearInterval(timerId)
        clearInterval(resultTimer)
        timerId = null
        resultTimer = null
        document.removeEventListener('keydown', moveFrog)
    }else{
        timerId = setInterval(autoMoveBlocks, 1000) 
        document.addEventListener('keydown', moveFrog)
    }
})

function checkResult(){
    loss()
    win()
}

resultTimer = setInterval(checkResult, 50)