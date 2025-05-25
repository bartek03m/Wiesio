document.addEventListener('DOMContentLoaded', () => {
  const spoilers = document.querySelectorAll('.spoiler');

  spoilers.forEach(spoiler => {
    spoiler.addEventListener('click', () => {
      spoiler.classList.toggle('revealed');
    });
  });
});