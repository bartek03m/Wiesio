const search_input = document.querySelector("#search_input");
const selected_category = document.querySelector("#category");
const subpages_list_container = document.querySelector("#subpages_list");

let subpages = [];

fetch('/data/db.json')
    .then(response => response.json())
    .then(data => {
        subpages = data.subpages;
        search();
    })
    .catch(error => {
        console.warn("nie udało się załadować podstron", error);
    });

function search(){
    const input_value = search_input.value.toLowerCase();
    const category = selected_category.value;
    let isFound = true;
    subpages_list_container.innerHTML = '';
    subpages.forEach(item => {
        const category_match = item.category == category || category == "wszystko";
        const subpage = document.createElement("a");
        if(category_match && item.character.toLowerCase().includes(input_value))
        {
            isFound = true;
            const subpage = document.createElement("a");
            subpage.href=item.url;
            subpage.innerHTML = item.character;
            subpages_list_container.appendChild(subpage);
        }
    });
    if(!isFound){
        const subpage = document.createElement("p");
        subpage.innerHTML = 'Nie znaleziono wyników';
        subpages_list_container.appendChild(subpage);
    }
}
search_input.addEventListener("input", search);
selected_category.addEventListener("change", search);