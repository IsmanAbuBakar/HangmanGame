var fruits =[
    "banana",
    "dates",
    "durian",
    "dragonfruit",
    "grapes",
    "lemon",
    "lime",
    "longan",
    "lychee",
    "mango",
    "oranges",
    "papaya",
    "pear",
    "pineapple",
    "strawberries",
    "watermelon",
]

var hpBrands=[
    "samsung",
    "nokia",
    "motorola",
    "oppo",
    "xiaomi",
    "rog",
    "apple",
    "huawei",
    "sony",
    "htc",
    "lenovo",
    "vivo",
]

var asean=[
    "brunei",
    "cambodia",
    "indonesia",
    "laos",
    "malaysia",
    "myanmar",
    "phillipines",
    "singapore",
    "thailand",
    "vietnam"
]

let answer = "";
let maxWrong = 6;
let mistakes= 0;
let guessed = [];
let wordStatus = null;

function showgame(){
    document.getElementById("game").hidden = true;
}

function randomWord(categories,catname){
    answer = categories[Math.floor(Math.random() * categories.length)];
    document.getElementById("game").style.display = "block";
    document.getElementById("game").hidden = false;
    document.getElementById("category").hidden = true;
    document.getElementById("game-title").innerHTML = catname;
    guessedWord();
}

function generateButtons() {
    let buttonsHTML = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => 
        `
        <button 
        class="btn btn-secondary btn-lg m-2"
        id = '` + letter + `'
        onClick = "handleGuess('` + letter + `')"
        >
        ` + letter + `
        </button>
        `).join("");

    document.getElementById("keyboard").innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute("disabled", true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
        hint();
      
    }
}

function updateHangmanPicture(){
    document.getElementById("hangmanPic").src = "image/img" + mistakes + ".jpeg"
}

function checkIfGameWon(){
    if(wordStatus === answer){
        document.getElementById("keyboard").innerHTML = "You Won!";
        document.getElementById("keyboard").style.color= "white";
        document.getElementById("manual1").hidden = true;
    }
}

function checkIfGameLost(){
    if(mistakes === maxWrong){
        document.getElementById("wordSpotLight").innerHTML = "The answer was: " + answer;
        document.getElementById("keyboard").innerHTML = "You Lost!"
        document.getElementById("keyboard").style.color= "white";
        document.getElementById("manual1").hidden = true;
    }
}

function guessedWord(){
    wordStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");
    document.getElementById("wordSpotLight").innerHTML = wordStatus;
}

function updateMistakes(){
    document.getElementById("mistakes").innerHTML = mistakes;
}

function reset(){
    mistakes = 0;
    guessed = [];
    document.getElementById("hangmanPic").src = "image/img0.jpeg";
    window.location.reload()
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

function hint(){
    if(mistakes <= 3){
        document.getElementById("hint-btn").disabled = true;
        document.getElementById("hintPic").hidden = true;
    } else {
        document.getElementById("hint-btn").disabled = false;
    }
}

function hintImg(){
    document.getElementById("hintPic").hidden = false;
    document.getElementById("hintPic").src = "image/" + answer + ".png";
}

generateButtons();
hint();

