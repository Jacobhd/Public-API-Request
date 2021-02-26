/* =====================================
   Public API Request
======================================== */

//const gallery = document.getElementById('gallery');

// fetches employees parsing it to json
function fetchData(url) { // requesting url data
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())  // calls .json() on response/results
    .catch(error => console.log('Looks like there was a problem!', error))
}

Promise.all([ fetchData('https://randomuser.me/api/?results=12') ])
  .then(data => console.log(data))
  //.then(data => {})


  // HELPER Function

  function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  function generateEmployee(data) {}

  function generateCards() {}









/*  Comments   *//*

Sucessfully pulling 12 users randomized each refresh
Data is returned as array of objects containing these key:value pairs
gender:   name:   location:   email:    login:    id:(SSN)
dob:    age:    cell:   nat:(us)    phone:    picture:    registered:



create the Modal
add the modal
give modal correct information
modal to display and hide on demand

create and append a new modal each time one is needed
*do not create a separate modal for each employee*

create and append just once all the parts of the modal that never change:
modal container div
  modal div
    close button
      modal info container div
then in click handler add the cards
can just hide/display the modal and update the markup
and info in the modal info container div




*/
