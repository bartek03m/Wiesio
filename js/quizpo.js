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
        quizData = data.po; // Assign to global variable
        liczbaPytan = Object.keys(quizData).length;
        wczytajPytanie(quizData);

        // Add event listeners to answer options
        A.addEventListener("click", () => { sprawdzOdpowiedz(0); });
        B.addEventListener("click", () => { sprawdzOdpowiedz(1); });
        C.addEventListener("click", () => { sprawdzOdpowiedz(2); });
        D.addEventListener("click", () => { sprawdzOdpowiedz(3); });

        // Add event listener for the new continue button
        continueButton.addEventListener("click", nastepnePytanie);
    })
    .catch(error => {
        console.warn("nie udało się załadować pytania", error);
    });

function wczytajPytanie(quiz) {
    // Reset styles and enable answer buttons
    answers.forEach(answer => {
        answer.classList.remove('correct', 'incorrect');
        answer.style.pointerEvents = 'auto'; // Enable clicks
    });
    continueButton.style.display = "none"; // Hide continue button

    const pytanieTresc = quiz[aktualnePytanie].pytanie;
    const odpowiedzi = quiz[aktualnePytanie].odpowiedzi;

    pytanieBox.textContent = pytanieTresc; // Zmieniono na textContent
    A.textContent = "A. " + odpowiedzi[0]; // Zmieniono na textContent
    B.textContent = "B. " + odpowiedzi[1]; // Zmieniono na textContent
    C.textContent = "C. " + odpowiedzi[2]; // Zmieniono na textContent
    D.textContent = "D. " + odpowiedzi[3]; // Zmieniono na textContent
}

function sprawdzOdpowiedz(odpowiedzWybrana) {
    const poprawnaOdpowiedzIndex = quizData[aktualnePytanie].poprawna_odpowiedz;
    const poprawnaOdpowiedzElement = answers[poprawnaOdpowiedzIndex];

    // Disable further clicks on answer options
    answers.forEach(answer => {
        answer.style.pointerEvents = 'none';
    });

    if (odpowiedzWybrana === poprawnaOdpowiedzIndex) {
        punkty++;
        answers[odpowiedzWybrana].classList.add('correct');
        // alert("Dobra odpowiedź!"); // Remove alert
    } else {
        answers[odpowiedzWybrana].classList.add('incorrect');
        poprawnaOdpowiedzElement.classList.add('correct'); // Highlight correct answer
        // alert(`Zła odpowiedź! Poprawna to: ${quizData[aktualnePytanie].odpowiedzi[poprawnaOdpowiedzIndex]}`); // Remove alert
    }
    continueButton.style.display = "block"; // Show continue button
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
    let HS = localStorage.getItem("highscorePO");
    if (HS == null || punkty > HS) {
        HS = punkty;
        localStorage.setItem("highscorePO", HS);
    }
    pytanieBox.innerHTML = `Koniec quizu! Zdobyłeś ${punkty}/${liczbaPytan} punktów.<br>Twój rekord to: ${HS} punktów.`;
    // Clear answer options and hide them
    answers.forEach(answer => {
        answer.innerHTML = "";
        answer.style.display = "none";
    });
    continueButton.style.display = "none"; // Ensure continue button is hidden at the end
}