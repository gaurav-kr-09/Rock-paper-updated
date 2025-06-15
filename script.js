let computerMove ='';
let score = JSON.parse(localStorage.getItem('score')) || 
{
    win:0,
    loose:0,
    tie:0,
}

renderScore();

function calculateComputerMove(){
    let num = Math.random();

    if(num < 1/3){
        computerMove = '✊';
    }else if(num < 2/3){
        computerMove = '🤚';
    }else{
        computerMove = '✌️';
    }

    return computerMove;
}

function calculateResult(userMove){
    computerMove = calculateComputerMove();
    if(userMove === '✊'){
        if(computerMove === '✊'){
            result = 'Tie!'
        }else if(computerMove === '🤚'){
            result = 'You Loose!';
        }else{
            result = 'You Win!'
        }
    }else if(userMove === '🤚'){
        if(computerMove === '✊'){
            result = 'You Win!'
        }else if(computerMove === '✌️'){
            result = 'You Loose!';
        }else{
            result = 'Tie!';
        }
    }else{
        if(computerMove === '✊'){
            result = 'You Loose!';
        }else if(computerMove === '✌️'){
            result = 'Tie!';
        }else{
            result = 'You Win!'
        }
    }

    document.querySelector('.result-div')
        .innerHTML = `<p>${result}</p>`;

    document.querySelector('.moves')
        .innerHTML = `<p>You <span>${userMove}</span> &#38; <span>${computerMove}</span> Computer</p>`

    updateScore(result);
    
}

function updateScore(result){
    if(result === 'You Win!'){
        score.win += 1;
    }else if (result === 'Tie!'){
        score.tie += 1;
    }else{
        score.loose += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    renderScore();
}

document.querySelector('.js-rock-button')
    .addEventListener('click',() => calculateResult('✊'));

document.querySelector('.js-paper-button')
    .addEventListener('click',() => calculateResult('🤚'));

document.querySelector('.js-scissor-button')
    .addEventListener('click',() => calculateResult('✌️'));

document.querySelector('.reset-button')
    .addEventListener('click', () => {
        resetWarning();
    })

function resetWarning(){
    document.querySelector('.warning-div')
        .innerHTML = `
        <p>Are You Sure Yow want to reset Score ? <button class="yes-button">YES</button> <button class="no-button">NO</button></p>
        `;

    document.querySelector('.yes-button')
        .addEventListener('click', () => {
            score.win = 0;
            score.loose = 0;
            score.tie = 0;
        
            localStorage.removeItem('score');

            renderScore();        

            document.querySelector('.warning-div')
            .innerHTML = ``;
            
            confirmationMessage();
        });

    document.querySelector('.no-button')
        .addEventListener('click', () => {
            document.querySelector('.warning-div')
            .innerHTML = ``;    
        });
}

let messaageShown = false;

function confirmationMessage(){
    if(messaageShown) return;
    messaageShown = true;

    const conformationDiv = document.querySelector('.confirmation-div');

    conformationDiv.innerHTML = `<p>&#10003; score reseted!...</p>`

    setTimeout(() => {
        conformationDiv.innerHTML = ``;
        messaageShown = false;
    }, 1500);
}

let isAutoPlaying = false;
let intervalId;
const buttonElement = document.querySelector('.autoplay-button');

buttonElement.addEventListener('click', () => autoPlay());

function autoPlay(){
    if(!isAutoPlaying){
        buttonElement.classList.add('autoplay-on');
        buttonElement.innerHTML = 'Stop Autoplay';

        intervalId = setInterval(() => {
            const userMove = calculateComputerMove();
            calculateResult(userMove);
        }, 1000);
        isAutoPlaying = true;
    }else{
        buttonElement.classList.remove('autoplay-on');
        buttonElement.innerHTML = 'Start Autoplay';
        clearInterval(intervalId);
        isAutoPlaying = false;
    };
}

function renderScore(){
    document.querySelector('.score-container')
        .innerHTML = `<p>Score: Wins: ${score.win}, Losses: ${score.loose}, Ties: ${score.tie}</p>`
}