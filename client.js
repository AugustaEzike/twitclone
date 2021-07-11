console.log ("hello everyone");
const form = document.querySelector('form'); //anytime you see document, that is for client side javascript
const mewsElement = document.querySelector('.mews')
const API_URL = 'http://localhost:5000/mews';


listAllMews();

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

    fetch(API_URL, { // fetch requests data from the server. it is built into the browser
        method: 'POST',
        body: JSON.stringify(mew), // JSON.stringify takes the mew object (which is a JS object) and turns it into somthing that the server can parse and understand
        headers: {
            'content-type': 'application/json'
        }
    }) .then(response => response.json())
        .then(createdMew => {
           form.reset();
           form.style.display = '';
           setTimeout(() => {

           }, 30000);
           listAllMews();


        })
})


function listAllMews() {
    mewsElement.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(mews => {
            mews.reverse();
            mews.forEach(mew => {
                const div = document.createElement('div')

                const header = document.createElement('h3')
                header.textContent = mew.name;

                const contents = document.createElement('p')
                contents.textContent = mew.content;

                const date = document.createElement('small')
                date.textContent = new Date(mew.created);
                               
                
                div.appendChild(header);
                div.appendChild(contents)
                div.appendChild(date);

                mewsElement.appendChild(div);

            })
        })
}