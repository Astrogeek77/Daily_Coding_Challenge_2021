const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

// Function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Function to Show the mole at random postions
function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    //prevent same hole from getting the same number
    if (hole === lastHole) {
        // recursion
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    //get a random time to determine how long mole should peep
    const time = randomTime(500, 1000);
    //get the random hole from the randomHole function
    const hole = randomHole(holes);
    //add the CSS class so selected mole can "pop up"
    hole.classList.add('up');

    setTimeout(() => {
        //make the selected mole "pop down" after a random time
        hole.classList.remove('up'); 
        if (!timeUp) {
            // recursion again
            peep();
        }
    }, time);
}

function startGame() {
    // init settings
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000) //show random moles for 15 seconds
}

function wack(e){
    if(!e.isTrusted) return; //** new thing I learned */
    score++;
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack))