let zdj=[];
let aktualne_zdj=0;
const slajd=document.querySelector("#slide");
const podpis=document.querySelector("#podpis-slider")
fetch('/data/slider.json')
    .then(response => response.json())
    .then(data => {
        zdj=data[slajd.dataset.slider];
        pokazSlajd(0);
    })
    .catch(error => {
        console.warn("nie udalo się zaladować slidera", error);
    });
function pokazSlajd(idx){
    console.log(idx)
    
    if (idx<0){
        aktualne_zdj=zdj.length-1;
    }
    else if (idx>zdj.length-1){
        aktualne_zdj=0;
    }
    else{
        aktualne_zdj=idx;
    }
    slajd.src=zdj[aktualne_zdj];
}
document.querySelector("#poprzednie").addEventListener("click",function(){
    pokazSlajd(aktualne_zdj-1);
});
document.querySelector("#nastepne").addEventListener("click",function(){
    pokazSlajd(aktualne_zdj+1);
});
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
        pokazSlajd(aktualne_zdj - 1);
    } else if (e.key === "ArrowRight") {
        pokazSlajd(aktualne_zdj + 1);
    }
});

document.querySelector("#slideract").addEventListener("click", function(){
    slider.style.display = 'flex';
});
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") 
    {
        slider.style.display = "none";
    }
});
slajd.addEventListener("click", function(){
    slider.style.display = "none";
});