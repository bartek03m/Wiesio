function toggleClassesOnClick(imageSelector, containerSelector, imageClass1, imageClass2, containerClass1, containerClass2) 
{
    const image = document.querySelector(imageSelector);
    const container = document.querySelector(containerSelector);

    if (image==null || container==null) 
    {
        console.log("Nie znaleziono jednego z elementów:", imageSelector, containerSelector);
        return;
    }

    image.addEventListener("click", function () 
    {
        image.classList.toggle(imageClass1);
        image.classList.toggle(imageClass2);
        container.classList.toggle(containerClass1);
        container.classList.toggle(containerClass2);
    });
}

toggleClassesOnClick("#zdjecie", "#kontener", "zdjecie-male", "zdjecie-duze", "kontener-maly-prawy", "kontener-duzy");

document.addEventListener("DOMContentLoaded", function () {
    const hoverText = document.querySelector(".hovertx");
    const hoverImg = hoverText.querySelector(".hoverimg");

    hoverText.addEventListener("mouseenter", function () {
        hoverImg.style.display = "block";
    });

    hoverText.addEventListener("mouseleave", function () {
        hoverImg.style.display = "none";
    });
});