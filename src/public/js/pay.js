const button = document.getElementById('payButton');
console.log(button);

if (button) {
  button.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.innerText === 'Оплатить') { e.target.innerText = 'Оплачено'; }

    // e.target.innerText = 'Оплатить';
  });
}
