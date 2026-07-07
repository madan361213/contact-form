const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (name === "" || email === "" || subject === "" || message === "") {

        formMessage.style.color = "red";
        formMessage.innerHTML = "Please fill all fields.";

        return;

    }

    if (!email.match(emailPattern)) {

        formMessage.style.color = "red";
        formMessage.innerHTML = "Enter a valid email.";

        return;

    }

    formMessage.style.color = "green";
    formMessage.innerHTML = "Form Submitted Successfully ✔";

    form.reset();

});

function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    document.getElementById("taskList").innerHTML = "";

    tasks.forEach(function (task) {

        createTask(task);

    });

}

function addTask() {

    let input = document.getElementById("taskInput");

    let task = input.value.trim();

    if (task === "") {

        alert("Please Enter Task");

        return;

    }

    createTask(task);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

}

function createTask(task) {

    let li = document.createElement("li");

    li.innerHTML = `
        ${task}
        <button onclick="deleteTask(this,'${task}')">
            Delete
        </button>
    `;

    document.getElementById("taskList").appendChild(li);

}

function deleteTask(button, task) {

    button.parentElement.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(function (t) {

        return t !== task;

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

document.getElementById("taskInput").addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        addTask();

    }

});

const images = [

    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg"

];

let currentImage = 0;

document.getElementById("addImage").addEventListener("click", function () {

    if (currentImage >= images.length) {

        alert("No More Images");

        return;

    }

    let img = document.createElement("img");

    img.src = images[currentImage];

    document.getElementById("galleryBox").appendChild(img);

    currentImage++;

});


document.getElementById("removeImage").addEventListener("click", function () {

    let gallery = document.getElementById("galleryBox");

    if (gallery.lastElementChild) {

        gallery.removeChild(gallery.lastElementChild);

    }

});

window.onload = function () {

    loadTasks();

};