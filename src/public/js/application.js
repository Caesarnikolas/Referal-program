const form = document.querySelector('#aplicantForm');
const formData = Object.fromEntries(new FormData(form).entries());
console.log(formData);
// const fileField = document.querySelector('#photo');
// console.log(fileField, 'asdasdasdasd');
// console.log(fileField.files[0]);
// formData.append('avatar', fileField.files[0]);
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/user', {
      method: 'POST',
      body: JSON.stringify(
        formData,
      ),
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
      
      const aplicantContainer = document.querySelector("#aplicantContainer");
      userJson.insertAdjacentHTML('beforeend', generateInnerHtml(userJson));
      const div = document.createElement('div')
      aplicantContainer.append(div);
      window.location.replace('http://localhost:3000'); 
    }
  });
}

