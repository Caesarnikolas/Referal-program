const button = document.getElementById('payButton');
console.log(button);

if (button) {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    button.innerText = 'Оплачено';
    button.color = 'green';
  });
}
