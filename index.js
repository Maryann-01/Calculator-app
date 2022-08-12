//initialization of all variables needed

let buffer = "399981";
let prevOp = null;
let runningTotal = 0;

//initialization of DOM variables

const screen = document.querySelector('.header');
const calcButton = document.querySelectorAll('.button button');

//implementation of the handleClick fxn

function handleClick(event){

    const value = event.target.innerText;
    if (isNaN(value) && value !== "."){
        handleSymbol(value);
    }else if(value === "."){
        handleNumber(value)
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

//implementation of the handleNumber fxn

function handleNumber(value){
    if (buffer === "0"){
        buffer = value;
    }else {
        buffer += value;
    }
}

//implementation of the handleSymbol fxn

function handleSymbol(value){
    switch(value){
        case 'RESET':
            buffer = "0";
            runningTotal = 0;
            break;

        case 'DEL':
            if (screen.innerText.length === 1 | buffer === "0"){
                buffer = "0";
                break;
            }else{
                buffer = buffer.slice(0, buffer.length-1);
                break;
            }
        case '=':
            if(prevOp === null){
                return;
            }else{
                handleOperation(parseInt(buffer));
                prevOp = null;
                buffer = runningTotal.toString();
                runningTotal = 0;
                break;
            }

        case '/':
        case '−':
        case '+':
        case '×':
            handleMath(value);
            break;
    }
}


//implementation of the handleMath fxn

function handleMath(value){
    if (buffer === "0"){
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        handleOperation(intBuffer);
    }
    prevOp = value;

    buffer = "0"
}

//implementation of the handleOperation fxn

function handleOperation(intBuffer){
    switch(prevOp){
        case '+':
            runningTotal += intBuffer;
            break;
        case '−':
            runningTotal -= intBuffer;
            break;
        case '×':
            runningTotal *= intBuffer;
            break;
        case '/':
            runningTotal /= intBuffer;
            break;

    }
}


//adding eventListeners to all calc buttons

for (const buttn of  calcButton){
    buttn.addEventListener('click', handleClick);
}