const search_input = document.querySelector("#search_input");
const selected_category = document.querySelector("#category");
const search_button = document.querySelector("#search_button");
const subpages_list_container = document.querySelector("#subpages_list");

let subpages = [];

fetch('../db.json')
    .then(response => response.json())
    .then(data => {
        subpages = data.subpages;
    })
    .catch(error => {
        console.log(error);
    });

function search(){
    const input_value = search_input.value.toLowerCase();
    const category = selected_category.value;
    let isFound = false;
    subpages_list_container.innerHTML = '';
    subpages.forEach(item => {
        const category_match = item.category == category || category == "wszystko";
        if(category_match && item.character.includes(input_value))
        {
            isFound = true;
            const subpage = document.createElement("li");
            subpage.innerHTML = `<a href="${item.url}">${item.character}</a>`;
            subpages_list_container.appendChild(subpage);
        }
    });
    if(!isFound){
        const subpage = document.createElement("li");
        subpage.innerHTML = 'Nie znaleziono wyników';;
        subpages_list_container.appendChild(subpage);
    }
}
