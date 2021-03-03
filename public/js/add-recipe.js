const recipeForm  = document.querySelector('form');
const name = document.querySelector('#name');
const serves = document.querySelector('#serves');
const instructions = document.querySelector('#instructions');
const picture = document.querySelector('#picture');
const formResponse = document.querySelector('#form-response');


recipeForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    formResponse.classList.add("alert-primary")
    formResponse.textContent = "Loading...";

    var data = new FormData()
    data.append('name', name.value)
    data.append('serves', serves.value)
    data.append('instructions', instructions.value)
    data.append('ingredients', $('#ingredients').val())
    data.append('picture', document.querySelector('input[type="file"]').files[0])

    fetch('/add-recipe', {
        method: 'POST',
        body: data
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
                formResponse.textContent = "Successfully added recipe!";
            }
        })
    }).catch((error) => {
        formResponse.classList.remove("alert-primary");
        formResponse.classList.remove("alert-success");
        formResponse.classList.add("alert-danger");
        formResponse.textContent = "The API is currently unavailable";
    })
})