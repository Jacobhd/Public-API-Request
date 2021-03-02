/* =====================================
   Public API Request
======================================== */

/* fetches employees, parsing data to json,
   returned data displays on screen */

function fetchData() {
  fetch('https://randomuser.me/api/?results=12&nat=us,gb,nz,au')
    .then(checkStatus)
    .then(response => response.json())
    .then(data => appendEmployees(data.results))
    .catch(error => console.log('Looks like there was a problem!', error))
}

fetchData();


/* Returns statusText if error occured */

  function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }


/* Dynamically displays 12 random Employees with basic info,
   click function shows modal with in-depth information */

function appendEmployees(data) {
  const users = data.map((employee, index) => {
    const html = `
    <div class="card" id="${employee.name.first}${employee.name.last}">
      <div class="card-img-container">
        <img class="card-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.location.city}</p>
      </div>
    </div>`;
    click(employee, data, index);
    return html
  }).join('');
  gallery.insertAdjacentHTML('beforeend', users);
}

/* Clickable card displays employee's data in closable modal */

function createModal(employee, data, index) {
  const div = document.createElement('div');
  const dob = getFormattedDOB(employee.dob.date)
  div.className = 'modal-container';

  const html = `<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
      <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
      <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
      <p class="modal-text">${employee.email}</p>
      <p class="modal-text cap">${employee.location.city}</p>
      <hr>
      <p class="modal-text">Cell: ${employee.cell}</p>
      <p class="modal-text cap">Address: ${employee.location.street}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}</p>
      <p class="modal-text">Birthday: ${dob}</p>
    </div>
  </div>`
  div.insertAdjacentHTML('beforeend', html);
  document.querySelector('body').appendChild(div);

  const closeButton = document.getElementById('modal-close-btn');
  closeButton.addEventListener('click', e => {
    div.remove();
  })
}


/* Displays modal when Employee card is clicked */

function click(employee, data, index) {
  setTimeout(event => {
    const person = document.getElementById(`${employee.name.first}${employee.name.last}`);
    person.addEventListener('click', e => createModal(employee, data, index));
  }, 100)
}


/* Formats data for modal => Date of Birth */

function getFormattedDOB(date) {
  let birthday = new Date(date);
  let month = birthday.getMonth() + 1;
  let day = birthday.getDate();
  let year = birthday.getFullYear();
  return month + "/" + day + "/" + year;
}



/*  Comments   *//*

Displays 12 random employees to page
correct data in body Photo / Name / Email / city
correct data in modal photo / name / email / city
------------------seperation -----------------------
cell / address ( city / nationality / postal ) / birthday
closable modal


error pulling address in Modal
placing "modal-container" div at end of body element (after script)

*/
