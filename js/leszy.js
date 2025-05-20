function toggleClassesOnClick(imageSelector, containerSelector, imageClass1, imageClass2, containerClass1, containerClass2) {
    const image = document.querySelector(imageSelector);
    const container = document.querySelector(containerSelector);

    if (image==null || container==null) {
        console.log("Nie znaleziono jednego z elementów:", imageSelector, containerSelector);
        return;
    }

    image.addEventListener("click", function () {
        image.classList.toggle(imageClass1);
        image.classList.toggle(imageClass2);
        container.classList.toggle(containerClass1);
        container.classList.toggle(containerClass2);
    });
}

toggleClassesOnClick("#zdjecie-leszego", "#kontener-leszego", "zdjecie-male", "zdjecie-duze", "kontener-maly", "kontener-duzy");
