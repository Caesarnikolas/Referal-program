const form = document.querySelector('#aplicantForm')
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());
    const response = await fetch('/user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        formData,
      ),
    });
    if (response.status === 200) {
        const 
    }
  })
}

