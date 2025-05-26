const pytanieBox = document.querySelector("#pytanie");
const A = document.querySelector("#a");
const B = document.querySelector("#b");
const C = document.querySelector("#c");
const D = document.querySelector("#d");
let aktualnePytanie = 0;
let punkty = 0;

fetch('/data/quiz.json')
    .then(response => response.json())
    .then(data => {
        const quiz = data.pytania;
        wczytajPytanie(quiz);
        A.addEventListener("click", () => {sprawdzOdpowiedz(quiz, 0)});
        B.addEventListener("click", () => {sprawdzOdpowiedz(quiz, 1)});
        C.addEventListener("click", () => {sprawdzOdpowiedz(quiz, 2)});;
        D.addEventListener("click", () => {sprawdzOdpowiedz(quiz, 3)});
    })
    .catch(error => {
        console.warn("nie udało się załadować pytania", error);
    });

function wczytajPytanie(quiz) 
{
    const pytanieTresc = quiz[aktualnePytanie].pytanie;
    const odpowiedzi = quiz[aktualnePytanie].odpowiedzi;
    
    pytanieBox.innerHTML = pytanieTresc;
    A.innerHTML = "A. " + odpowiedzi[0];
    B.innerHTML = "B. " + odpowiedzi[1];
    C.innerHTML = "C. " + odpowiedzi[2];
    D.innerHTML = "D. " + odpowiedzi[3];
}

function sprawdzOdpowiedz(quiz, odpowiedz) 
{
    const poprawnaOdpowiedz = quiz[aktualnePytanie].poprawna_odpowiedz;
    if (odpowiedz == poprawnaOdpowiedz) 
    {
        punkty++;
        alert("Dobra odpowiedź!");
    } 
    else 
    {
        alert(`Zła odpowiedź! Poprawna to: ${quiz[aktualnePytanie].odpowiedzi[poprawnaOdpowiedz]}`);
    }
    aktualnePytanie++;
    if(aktualnePytanie < quiz.length) {
        wczytajPytanie(quiz);
    }
    else{
        wyswietlWynik();
    }
}

function wyswietlWynik() 
{
    let HS = localStorage.getItem("highscore");
    if (HS == null || punkty > HS) 
    {
        HS = punkty;
        localStorage.setItem("highscore", HS);
    }
    pytanieBox.innerHTML = `Koniec quizu! Zdobyłeś ${punkty} punktów.<br>Twój rekord to: ${HS} punktów.`;
    A.innerHTML = "";
    B.innerHTML = "";
    C.innerHTML = "";
    D.innerHTML = "";
    A.style.display = "none";
    B.style.display = "none";
    C.style.display = "none";
    D.style.display = "none";
}