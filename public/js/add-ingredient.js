const ingredientForm  = document.querySelector('form');
const name = document.querySelector('#name');
const shelfLife = document.querySelector('#shelf-life');
const storageDetails = document.querySelector('#storage-details');
const formResponse = document.querySelector('#form-response');


ingredientForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    formResponse.classList.add("alert-primary")
    formResponse.textContent = "Loading...";

    fetch('/add-ingredient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            shelfLife: shelfLife.value,
            storageDetails: storageDetails.value,
        })
    }).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error){
                formResponse.classList.remove("alert-primary");
                formResponse.classList.remove("alert-success");
                formResponse.classList.add("alert-danger");
                formResponse.textContent = data.error;
            }
            else{
                formResponse.classList.remove("alert-primary");
                formResponse.classList.remove("alert-danger");
                formResponse.classList.add("alert-success");
                formResponse.textContent = "Successfully added ingredient!";
            }
        })
    }).catch((error) => {
        formResponse.classList.remove("alert-primary");
        formResponse.classList.remove("alert-success");
        formResponse.classList.add("alert-danger");
        formResponse.textContent = "The API is currently unavailable";
    })
})