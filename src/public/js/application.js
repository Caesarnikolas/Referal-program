const form = document.querySelector('#aplicantForm');
console.log(form);
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    formData.append("startDate", e.target.startDate.value);
    formData.append("photo", e.target.photo.files[0]);
    console.log(formData.get('photo'));
    const response = await fetch('http://localhost:3000/user', {
      method: 'POST',
      body: formData,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // }
    });
    const userJson = await response.json();
    function generateInnerHtml(user) {
      return `      <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="/uploads/${user.photo}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Name: ${user.name}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Phone: ${user.phone}</li>
        <li class="list-group-item">Started at {{this.startDate}}</li>
        <li class="list-group-item">Status: ${user.status}</li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>`;
    }
    if (response.status === 200) {
      console.log('bfdjbjfs');
      const aplicantContainer = document.querySelector("#aplicantContainer");
      console.log(aplicantContainer);
      aplicantContainer.insertAdjacentHTML('afterbegin', generateInnerHtml(userJson));
    }
  });
}
