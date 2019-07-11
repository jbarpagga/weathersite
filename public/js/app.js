//fetch takes url and callback function.  We are saying fetch data from the url and then run the function
//response is the data received from url.  .json() turns into java script object and then whatever "data" is received from response.json is printed to the console.

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then(
        (data) => {
            console.log(data);
        }
    )
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//There are many event listners like click,hoverover etc.  addEvenListner takes two arguments, name of the event and a callback function to run when event occurs. In this case we are using submit event.

//preventDefault() function allow us to stop the default behaviour of the form.  Like clearning all values of the form while browser is reloaded.

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ' ';
    fetch(`/weather?address=${location}`).then(
        (response) => {
            response.json().then(
                (data) => {
                    if(data.error) {
                        messageOne.textContent = error;
                    }
                    else {
                        console.log(data);
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast
                    }
                }
                )
           //messageTwo.textContent = response;
        })
})
