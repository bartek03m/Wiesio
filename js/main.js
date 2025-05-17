const search_input = document.querySelector("#search_input");
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

function testClick(){
    subpages_list_container.innerHTML="";
    subpages.forEach(subpage => {
    const li = document.createElement("li");
    li.innerHTML=`${subpage.id} - ${subpage.name} - ${subpage.character} - ${subpage.category} - ${subpage.url}`;
    
    subpages_list_container.appendChild(li);
    });
}
