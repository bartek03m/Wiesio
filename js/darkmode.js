const toggleDarkmode = document.querySelector('#toggle-darkmode');
if(localStorage.getItem("darkmode") == 'true') {
    document.body.classList.add('darkmode');
    document.querySelector("#logo").src="../images/logo-darkmode.png";
    toggleDarkmode.checked = true;
}

toggleDarkmode.addEventListener('change', function() {
    document.body.classList.toggle('darkmode');
    if(toggleDarkmode.checked) {
        document.querySelector("#logo").src="../images/logo-darkmode.png";
    }
    else{
        document.querySelector("#logo").src="../images/logo-lightmode.png";
    }
    localStorage.setItem('darkmode', document.body.classList.contains('darkmode'));
});