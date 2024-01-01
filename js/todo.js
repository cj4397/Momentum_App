

// **********************************Modal*******************************

function openNav() {
    document.querySelector(".todo_container").classList.add("show");
}

function closeNav() {
    document.querySelector(".todo_container").classList.remove("show");
}


let modal_name = document.getElementById("name_input");
let btn = document.getElementById("name_btn");
let span_close = document.getElementById("close_name");
function modal_name_open() {
    modal_name.style.display = "block";
};
function modal_name_close() {
    modal_name.style.display = "none";
};


// ********************************************Time************************************


const clock = document.getElementById("time");
let hh
let ss
function getClock() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let session = "AM";


    if (hours == 0) {
        hours = 12;
    }

    if (hours > 12) {
        hours = hours - 12;
        session = "PM";
    }
    hh = hours
    ss = session
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    clock.innerText = (`⏰ ${hours}:${minutes}:${seconds} ${session}`);
}

getClock();
setInterval(getClock, 1000);




// ****************************************greeting***********************************


const greeting = document.querySelector("#greeting");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login_form_input");

const user_name = document.querySelector("#user_name");
let savedUsername = localStorage.getItem('saved')


// *******************************Storage**********************


let tasknames = [];
let userlist = []
function users(name, task) {
    this.name = name;
    this.task = task;
}

let Lstorage = JSON.parse(localStorage.getItem('user'))

console.log(Lstorage)
console.log(userlist)
// localStorage.clear();

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;


    if (Lstorage === null) {
        userlist.push(new users(username, []));

    } else {

        if (Lstorage.findIndex((user) => user.name == username) > -1) {
            for (let i = 0; i < Lstorage.length; i++) {
                userlist.push(Lstorage[i])
            }
            usersName()
        }
        if (Lstorage.findIndex((user) => user.name == username) == -1) {
            for (let i = 0; i < Lstorage.length; i++) {
                userlist.push(Lstorage[i])
            }
            userlist.push(new users(username, []));
        }
    }




    localStorage.setItem('user', JSON.stringify(userlist));
    localStorage.setItem('saved', username)

    paintGreetings(username);
    modal_name_close()
    alert('Welcome ' + username)
    displayTasks();

}

function paintGreetings(username) {


    switch (true) {
        case ss === 'AM':
            greeting.innerText = `Good Morning, ` + username;

            break;
        case ss === 'PM' && hh <= 6:
            greeting.innerText = `Good Afternoon, ` + username;
            break;
        case ss === 'PM' && hh > 6:
            greeting.innerText = `Good Evening, ` + username;
            break;
    }


}





function onLogoutSubmit() {
    localStorage.removeItem('saved');
    window.location.reload();
}



// *********************************To DO********************************








function usersName() {

    let saved_task = JSON.parse(localStorage.getItem('user'));
    let searchIndex = saved_task.findIndex((user) => user.name === savedUsername)
    if (savedUsername === null) {
        searchIndex = saved_task.findIndex((user) => user.name === loginInput.value)
    }
    let task = saved_task[searchIndex].task


    for (let i = 0; i < task.length; i++) {

        tasknames.push(task[i]);

    }

}





function activity_add(task, ok) {
    this.task = task;
    this.complete = ok;
}




let inputValue = document.getElementById("todo_input").value;
let loginInput2 = document.getElementById("todo_input2");

const taskInput = document.getElementById("todo_input");
let taskList = document.getElementById("todo_list");

let list = document.querySelector('todo_list');




function displayTasks() {
    taskList.innerHTML = "";


    for (let i = 0; i < tasknames.length; i++) {
        const li = document.createElement("li");
        li.setAttribute('id', i)
        li.id = i;
        li.appendChild(document.createTextNode(tasknames[i].task));
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close_li";
        span.onclick = (e) => {
            let li = e.target
            let div = li.parentElement;
            let i = div.getAttribute('id');



            let searchIndex;
            if (savedUsername === null) {
                searchIndex = userlist.findIndex((user) => user.name === loginInput.value)
            }
            else {
                searchIndex = userlist.findIndex((user) => user.name === savedUsername)
            }
            let user = userlist[searchIndex].task

            user.splice(i, 1);
            tasknames = user


            localStorage.setItem("user", JSON.stringify(userlist));
            div.remove();

            displayTasks()

        }
        li.onclick = (ev) => {
            ev.target.classList.toggle('checked');
            let li = ev.target.id
            let searchIndex;
            if (savedUsername === null) {
                searchIndex = userlist.findIndex((user) => user.name === loginInput.value)
            }
            else {
                searchIndex = userlist.findIndex((user) => user.name === savedUsername)
            }
            let user = userlist[searchIndex].task

            if (user[li].complete) {
                user[li].complete = false
            } else {
                user[li].complete = true
            }

            localStorage.setItem("user", JSON.stringify(userlist));

        }

        let searchIndex;
        if (savedUsername === null) {
            searchIndex = userlist.findIndex((user) => user.name === loginInput.value)
        }
        else {
            searchIndex = userlist.findIndex((user) => user.name === savedUsername)
        }


        let complete = userlist[searchIndex].task[i].complete
        if (complete) {
            li.classList.add('checked')
        }


        span.appendChild(txt);
        li.appendChild(span);
        taskList.appendChild(li);

    }

}



function addTask(item) {
    const task = item;

    tasknames.push(new activity_add(task, false));

    let searchIndex = userlist.findIndex((user) => user.name == savedUsername)
    if (savedUsername === null) {
        searchIndex = userlist.findIndex((user) => user.name === loginInput.value)
        userlist[searchIndex].task = tasknames

    }
    else {
        userlist[searchIndex].task = tasknames
    }





    localStorage.setItem('user', JSON.stringify(userlist));
    displayTasks();
    taskInput.value = "";

}

function option() {
    if (taskInput.value === '') {
        alert("You must write something!");
    } else {
        addTask(taskInput.value)
    }
}



loginInput2.onkeydown = function (e) {
    if (e.keyCode == 13) {
        if (e.target.value === '') {
            alert("You must write something!");
        } else {
            addTask(e.target.value)
            e.target.value = '';
        }
    }
};



if (savedUsername === null) {

    modal_name_open();
    loginForm.addEventListener("submit", onLoginSubmit);

} else {

    let array = JSON.parse(localStorage.getItem('user'))
    let index = array.findIndex((user) => user.name === savedUsername)
    let user = array[index]
    paintGreetings(savedUsername);

    userlist.push(user)

    if (user.task.length >= 0) {

        usersName()

    }

    displayTasks();


}









