const pytanieBox = document.querySelector("#pytanie");
const A = document.querySelector("#a");
const B = document.querySelector("#b");
const C = document.querySelector("#c");
const D = document.querySelector("#d");
const answers = [A, B, C, D];
const continueButton = document.querySelector("#continue-btn");
const quizInfo = document.querySelector("#quiz-info");
const restartButton = document.querySelector("#restart-btn"); // Nadal odwołujemy się do tego elementu
const startQuizBtn = document.querySelector("#start-quiz-btn");
const resumeQuizBtn = document.querySelector("#resume-quiz-btn");
const startQuizContainer = document.querySelector("#start-quiz-container");
const quizContent = document.querySelector(".quiz-content");

let aktualnePytanie = 0;
let punkty = 0;
let liczbaPytan;
let quizData;

// --- Funkcje do Local Storage ---
function zapiszStanQuizu() {
    localStorage.setItem('aktualnePytanieWWW', aktualnePytanie);
    localStorage.setItem('punktyWWW', punkty);
}

function wczytajStanQuizu() {
    const savedAktualnePytanie = localStorage.getItem('aktualnePytanieWWW');
    const savedPunkty = localStorage.getItem('punktyWWW');

    if (savedAktualnePytanie !== null && savedPunkty !== null) {
        aktualnePytanie = parseInt(savedAktualnePytanie, 10);
        punkty = parseInt(savedPunkty, 10);
        return true;
    }
    return false;
}

function resetujStanQuizu() {
    localStorage.removeItem('aktualnePytanieWWW');
    localStorage.removeItem('punktyWWW');
    aktualnePytanie = 0;
    punkty = 0;
}

// --- Inicjalizacja Quizu (pobieranie danych i ustawienie listenerów) ---
fetch('../data/quiz.json')
    .then(response => response.json())
    .then(data => {
        quizData = data.www;
        liczbaPytan = Object.keys(quizData).length;

        A.addEventListener("click", () => { sprawdzOdpowiedz(0); });
        B.addEventListener("click", () => { sprawdzOdpowiedz(1); });
        C.addEventListener("click", () => { sprawdzOdpowiedz(2); });
        D.addEventListener("click", () => { sprawdzOdpowiedz(3); });

        if (continueButton) {
            continueButton.addEventListener("click", nastepnePytanie);
        }

        if (restartButton) {
            restartButton.addEventListener("click", rozpocznijQuizOdNowa);
        }

        if (startQuizBtn) {
            startQuizBtn.addEventListener("click", () => {
                resetujStanQuizu();
                rozpocznijQuiz();
            });
        }
        if (resumeQuizBtn) {
            resumeQuizBtn.addEventListener("click", () => {
                rozpocznijQuiz();
            });
        }

        // Sprawdzenie, czy istnieje zapisany stan quizu przy ładowaniu strony
        if (wczytajStanQuizu() && aktualnePytanie < liczbaPytan) {
            startQuizContainer.style.display = "block";
            resumeQuizBtn.style.display = "inline-block";
        } else {
            startQuizContainer.style.display = "block";
            resumeQuizBtn.style.display = "none";
            resetujStanQuizu();
        }
    })
    .catch(error => {
        console.warn("Nie udało się załadować pytań quizu:", error);
        if (pytanieBox) {
            pytanieBox.textContent = "Wystąpił błąd podczas ładowania quizu. Spróbuj odświeżyć stronę.";
        }
    });

// --- Funkcje główne quizu ---
function rozpocznijQuiz() {
    startQuizContainer.style.display = "none";
    quizContent.style.display = "block";
    if (restartButton) {
        restartButton.style.display = "block"; // Teraz pokazujemy go, gdy quiz się zaczyna
    }
    wczytajPytanie(quizData);
}

function wczytajPytanie(quiz) {
    answers.forEach(answer => {
        if (answer) {
            answer.classList.remove('correct', 'incorrect');
            answer.style.pointerEvents = 'auto';
            answer.style.display = "block";
        }
    });

    if (continueButton) {
        continueButton.style.display = "none";
    }

    const procentPoprawnych = aktualnePytanie > 0 ? ((punkty / aktualnePytanie) * 100).toFixed(0) : 0;
    if (quizInfo) {
        quizInfo.textContent = `Pytanie ${aktualnePytanie + 1} z ${liczbaPytan} | Poprawność: ${procentPoprawnych}%`;
    }

    const pytanieTresc = quiz[aktualnePytanie].pytanie;
    const odpowiedzi = quiz[aktualnePytanie].odpowiedzi;

    pytanieBox.textContent = pytanieTresc;
    A.textContent = "A. " + odpowiedzi[0];
    B.textContent = "B. " + odpowiedzi[1];
    C.textContent = "C. " + odpowiedzi[2];
    D.textContent = "D. " + odpowiedzi[3];

    zapiszStanQuizu();
}

function sprawdzOdpowiedz(odpowiedzWybrana) {
    const poprawnaOdpowiedzIndex = quizData[aktualnePytanie].poprawna_odpowiedz;
    const poprawnaOdpowiedzElement = answers[poprawnaOdpowiedzIndex];

    answers.forEach(answer => {
        if (answer) {
            answer.style.pointerEvents = 'none';
        }
    });

    if (odpowiedzWybrana === poprawnaOdpowiedzIndex) {
        punkty++;
        if (answers[odpowiedzWybrana]) {
            answers[odpowiedzWybrana].classList.add('correct');
        }
    } else {
        if (answers[odpowiedzWybrana]) {
            answers[odpowiedzWybrana].classList.add('incorrect');
        }
        if (poprawnaOdpowiedzElement) {
            poprawnaOdpowiedzElement.classList.add('correct');
        }
    }

    if (continueButton) {
        continueButton.style.display = "block";
    }
    zapiszStanQuizu();
}

function nastepnePytanie() {
    aktualnePytanie++;
    if (aktualnePytanie < liczbaPytan) {
        wczytajPytanie(quizData);
    } else {
        wyswietlWynik();
    }
}

function wyswietlWynik() {
    const HS = localStorage.getItem("highscoreWWW");
    const procentPoprawnychKoncowy = ((punkty / liczbaPytan) * 100).toFixed(0);

    pytanieBox.innerHTML = `Koniec quizu! Zdobyłeś ${punkty}/${liczbaPytan} punktów.<br>Poprawność: ${procentPoprawnychKoncowy}%<br>Twój rekord to: ${HS !== null ? HS : 0} punktów.`;
    
    answers.forEach(answer => {
        if (answer) {
            answer.innerHTML = "";
            answer.style.display = "none";
        }
    });

    if (quizInfo) {
        quizInfo.textContent = "";
    }
    if (continueButton) {
        continueButton.style.display = "none";
    }
    // Przycisk restartu pozostaje widoczny, bo jest w quiz-header-info, które jest widoczne
    resetujStanQuizu();
}

function rozpocznijQuizOdNowa() {
    resetujStanQuizu();
    aktualnePytanie = 0;
    punkty = 0;
    
    startQuizContainer.style.display = "block";
    quizContent.style.display = "none";
    resumeQuizBtn.style.display = "none";

    // Ukryj przycisk restartu, gdy wracamy do ekranu początkowego
    if (restartButton) {
        restartButton.style.display = "none";
    }

    const popodp = document.querySelector("#popodp");
    if (popodp) {
        popodp.style.display = "block";
    }
}