function ToggleImgClass(imageSelector, containerSelector, captionSelector, imageClass1, imageClass2, containerClass1, containerClass2, captionClass) 
{
    const image = document.querySelector(imageSelector);
    const container = document.querySelector(containerSelector);
    const caption = document.querySelector(captionSelector);

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
        caption.classList.toggle(captionClass);
        caption.classList.toggle("nic");
    });
}
function ImgHover(textSelector, imageSelector)
{
    const texts = document.querySelectorAll(textSelector);
    const imgs = document.querySelectorAll(imageSelector);

    if (texts.length !== imgs.length) {
        console.warn('ImgHover: różna liczba tekstów i obrazków.');
        return;
    }
    if (!texts || !imgs) {
        console.warn('ImgHover: nie znaleziono elementów tekstowych lub obrazkowych.');
        return;
    }

    texts.forEach((textEl, idx) => 
    {
        const imgEl = imgs[idx];

        textEl.addEventListener('mouseenter', function() 
        {
            imgEl.style.display = 'block';
        });
        
        textEl.addEventListener('mouseleave', function() 
        {
            imgEl.style.display = 'none';
        });
    });
}