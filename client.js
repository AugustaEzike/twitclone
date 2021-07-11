console.log ("hello everyone");
const form = document.querySelector('form'); //anytime you see document, that is for client side javascript
const API_URL = 'http://localhost:5000/mews';

form.addEventListener('submit', (event) => {
    event.preventDefault(); // this tells the browser that the form should not be submmited but handled with JS
    const formData = new FormData(form); //formData is built into the web browser and works by passing in a reference to the form
    const name = formData.get('name');
    const content = formData.get('content')
    //when the form is submitted, this grabs whats in the form, puts it in an object(mew) and then turning into a JSON object that can be parsed by the browser
    const mew = {
        name,
        content
    };
    console.log('form was submitted');

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew), // JSON.stringify takes the mew object (which is a JS object) and turns it into somthing that the server can parse and understand
        headers: {
            'content-type': 'application/json'
        }
    })
})