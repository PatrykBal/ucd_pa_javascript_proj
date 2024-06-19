/* SLIDER */

const excerciseContainers = [...document.querySelectorAll('.excercise-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

excerciseContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })           
})

/* FORM */

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form-message");

    messageElement.textContent = message;
    messageElement.classList.remove("form-message-success", "form-message-error");
    messageElement.classList.add(`form-message--${type}`);
}

function setInputError (inputElement, message) {
    inputElement.classList.add("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", " Invalid username/password combination");
    });

    document.querySelectorAll(".form-input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

/* EXERCISE LIBRARY */

const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=4&offset=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b7158ec930mshde39d189ea9e94fp177b2fjsn5149093c923e',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

document.getElementById('search-btn').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    fetchData(searchQuery);
});

async function fetchData(searchQuery = '') {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const filteredExercises = result.filter(exercise =>
            exercise.name.toLowerCase().includes(searchQuery)
        );
        displayExercises(filteredExercises);
    } catch (error) {
        console.error(error);
    }
}

function displayExercises(exercises) {
    const container = document.querySelector('.excer-search-container');
    if (!container) {
        console.error('Container element not found');
        return;
    }

    container.innerHTML = '';
    exercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.className = 'excer-card';

        const imgElement = document.createElement('img');
        imgElement.src = exercise.gifUrl || 'https://placehold.co/600x400';
        imgElement.alt = exercise.name;

        const nameElement = document.createElement('h2');
        nameElement.textContent = exercise.name;

        const bodyPartElement = document.createElement('p');
        bodyPartElement.textContent = `Body Part: ${exercise.bodyPart}`;

        const equipmentElement = document.createElement('p');
        equipmentElement.textContent = `Equipment: ${exercise.equipment}`;

        exerciseElement.appendChild(imgElement);
        exerciseElement.appendChild(nameElement);
        exerciseElement.appendChild(bodyPartElement);
        exerciseElement.appendChild(equipmentElement);

        container.appendChild(exerciseElement);
    });
}