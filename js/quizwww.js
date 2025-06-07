const pytanieBox = document.querySelector("#pytanie");
const A = document.querySelector("#a");
const B = document.querySelector("#b");
const C = document.querySelector("#c");
const D = document.querySelector("#d");
const answers = [A, B, C, D]; // Array to easily iterate through answer elements
const continueButton = document.querySelector("#continue-btn"); // New button

let aktualnePytanie = 0;
let punkty = 0;
let liczbaPytan;
let quizData; // Store quiz data globally once fetched

fetch('../data/quiz.json')
    .then(response => response.json())
    .then(data => {
        quizData = data.www; // Assign to global variable, pobieramy dane z 'www'
        liczbaPytan = Object.keys(quizData).length;
        wczytajPytanie(quizData);

        // Add event listeners to answer options
        A.addEventListener("click", () => { sprawdzOdpowiedz(0); });
        B.addEventListener("click", () => { sprawdzOdpowiedz(1); });
        C.addEventListener("click", () => { sprawdzOdpowiedz(2); });
        D.addEventListener("click", () => { sprawdzOdpowiedz(3); });

        // Add event listener for the new continue button
        // Upewnij się, że continueButton istnieje zanim dodasz event listener
        if (continueButton) {
            continueButton.addEventListener("click", nastepnePytanie);
        }
    })
    .catch(error => {
        console.warn("nie udało się załadować pytania", error);
    });

function wczytajPytanie(quiz) {
    // Reset styles and enable answer buttons
    answers.forEach(answer => {
        // Upewnij się, że element odpowiedzi istnieje
        if (answer) {
            answer.classList.remove('correct', 'incorrect');
            answer.style.pointerEvents = 'auto'; // Enable clicks
        }
    });
    // Upewnij się, że continueButton istnieje
    if (continueButton) {
        continueButton.style.display = "none"; // Hide continue button
    }

    const pytanieTresc = quiz[aktualnePytanie].pytanie;
    const odpowiedzi = quiz[aktualnePytanie].odpowiedzi;

    // Używamy textContent zamiast innerHTML, aby znaczniki były wyświetlane jako tekst
    pytanieBox.textContent = pytanieTresc;
    A.textContent = "A. " + odpowiedzi[0];
    B.textContent = "B. " + odpowiedzi[1];
    C.textContent = "C. " + odpowiedzi[2];
    D.textContent = "D. " + odpowiedzi[3];
}

function sprawdzOdpowiedz(odpowiedzWybrana) {
    const poprawnaOdpowiedzIndex = quizData[aktualnePytanie].poprawna_odpowiedz;
    const poprawnaOdpowiedzElement = answers[poprawnaOdpowiedzIndex];

    // Disable further clicks on answer options
    answers.forEach(answer => {
        if (answer) { // Sprawdź, czy element istnieje
            answer.style.pointerEvents = 'none';
        }
    });

    if (odpowiedzWybrana === poprawnaOdpowiedzIndex) {
        punkty++;
        if (answers[odpowiedzWybrana]) { // Sprawdź, czy element istnieje
            answers[odpowiedzWybrana].classList.add('correct');
        }
    } else {
        if (answers[odpowiedzWybrana]) { // Sprawdź, czy element istnieje
            answers[odpowiedzWybrana].classList.add('incorrect');
        }
        if (poprawnaOdpowiedzElement) { // Sprawdź, czy element poprawnej odpowiedzi istnieje
            poprawnaOdpowiedzElement.classList.add('correct'); // Highlight correct answer
        }
    }
    // Show continue button
    if (continueButton) {
        continueButton.style.display = "block";
    }
}

function nastepnePytanie() {
    aktualnePytanie++;
    if (aktualnePytanie < quizData.length) {
        wczytajPytanie(quizData);
    } else {
        wyswietlWynik();
    }
}

function wyswietlWynik() {
    let HS = localStorage.getItem("highscoreWWW"); // Używamy "highscoreWWW" dla tego quizu
    if (HS == null || punkty > HS) {
        HS = punkty;
        localStorage.setItem("highscoreWWW", HS);
    }
    pytanieBox.innerHTML = `Koniec quizu! Zdobyłeś ${punkty}/${liczbaPytan} punktów.<br>Twój rekord to: ${HS} punktów.`;
    // Clear answer options and hide them
    answers.forEach(answer => {
        if (answer) { // Sprawdź, czy element istnieje
            answer.innerHTML = "";
            answer.style.display = "none";
        }
    });
    // Ensure continue button is hidden at the end
    if (continueButton) {
        continueButton.style.display = "none";
    }
}