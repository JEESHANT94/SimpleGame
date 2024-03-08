var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();

}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; 
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();

    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num => num != 0); 
}

function slide(row) {
 
    row = filterZero(row); 
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } 
    row = filterZero(row); 

    while (row.length < columns) {
        row.push(0);
    } 
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide(row)            //[4, 2, 0, 0]
        board[r] = row.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
       
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { 
                return true;
            }
        }
    }
    return false;
}

// Define quiz questions and answers
const quizQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is 5 * 3?", options: ["10", "15", "20", "25"], answer: "15" },
   {question: "What is 8 multiplied by 4?", answer: "32", type: "open_ended" },
    { question: "What is 15 divided by 3?", answer: "5", type: "open_ended" },
    { question: "What is the value of pi (π) to two decimal places?", answer: "3.14", type: "open_ended" },
    { question: "What is 10 / 2?", options: ["2", "4", "5", "10"], answer: "5" },
    { question: "What is the square root of 9?", options: ["3", "6", "9", "12"], answer: "3" },
    { question: "What is 3 squared?", options: ["6", "9", "12", "15"], answer: "9" },
    { question: "What is 4 cubed?", options: ["12", "16", "32", "64"], answer: "64" },
    { question: "What is 10 - 7?", options: ["1", "2", "3", "4"], answer: "3" },
    { question: "What is 20 % of 50?", options: ["5", "10", "15", "20"], answer: "10" },
    { question: "What is the next number in the sequence: 2, 4, 6, 8, ...?", options: ["10", "11", "12", "14"], answer: "10" },
    { question: "What is 15 squared?", options: ["225", "250", "275", "300"], answer: "225" },
    { question: "What is the value of pi (π) rounded to two decimal places?", options: ["3.14", "3.16", "3.18", "3.20"], answer: "3.14" },
    { question: "What is 100 divided by 5?", options: ["15", "20", "25", "30"], answer: "20" },
    { question: "What is the area of a rectangle with length 6 and width 8?", options: ["30", "36", "42", "48"], answer: "48" },
    { question: "What is 7 multiplied by itself?", options: ["35", "42", "49", "56"], answer: "49" }
    // Add more quiz questions here
];

let currentQuestionIndex = 0;

// Function to display current quiz question
function displayQuestion() {

    document.getElementById("quiz").style.display = "block";
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.onclick = () => selectOption(option);
        optionsElement.appendChild(optionButton);
    });

    // Set timeout to move to next question after 30 seconds
   
}

// Function to select an option
function selectOption(option) {

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const userAnswer = option;

    if (userAnswer === currentQuestion.answer) {
        alert("Correct! You earned a Super Point.");
        document.getElementById("quiz").style.display = "none";
        awardSuperPoint();
    } else {
        alert("Incorrect answer. Try again later.");
    }

    // Move to the next question
    nextQuestion();
}

// Function to move to the next question
function nextQuestion() {

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        setTimeout( displayQuestion, 30000);

    } else {
        endQuiz();
    }
}

// Function to award a Super Point
function awardSuperPoint() {

    score+=5;
    // Update score display
    document.getElementById("score").innerText = score;
}

// Function to start the quiz
function startQuiz() {

    displayQuestion();
    document.getElementById("quiz").style.display = "block";
}

// Function to end the quiz
function endQuiz() {

    document.getElementById("quiz").style.display = "none";
}

// Call startQuiz function after 30 seconds
setTimeout(startQuiz, 30000);
