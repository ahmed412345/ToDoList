const iconsControlNav = document.querySelector(".icon-control-nav");

const boardHeader = document.querySelector(".board .header");

const sideBar = document.querySelector(".tasks-body .side-bar");

let hasShrinked = false;

const shrink = () => {
    sideBar.insertAdjacentElement("afterbegin", iconsControlNav);
    iconsControlNav.classList.remove("expand-nav");
    iconsControlNav.classList.add("shrink-nav");
    hasShrinked = false;
};
const expand = () => {
    boardHeader.insertAdjacentElement("afterbegin", iconsControlNav);
    iconsControlNav.classList.remove("shrink-nav");
    iconsControlNav.classList.add("expand-nav");
    hasShrinked = true;
};

if (window.innerWidth <= 800) {
    expand();
    sideBar.classList.add("hide-side-bar");
}

iconsControlNav.addEventListener("click", () => {
    if (hasShrinked) {
        shrink();
    } else {
        expand();
    }
    sideBar.classList.toggle("hide-side-bar");
});

//task-card element

const taskCardElement = (title, content, date, cardColor, taskId, complete = false) => {
    const ele = `<div class="task-card" data-taskid="${taskId}" data-complete="${complete}" style="background-color : ${cardColor || "#75b25f"}">
    <div class="task-header">
        <h3 class="task-title">${title || "empty"}</h3>
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="tasks-icons-width-acc  pen-icon">
            <path
            style="fill: #fff;"
            d="M497.9 74.16L437.8 14.06c-18.75-18.75-49.19-18.75-67.93 0l-56.53 56.55l127.1 128l56.56-56.55C516.7 123.3 516.7 92.91 497.9 74.16zM290.8 93.23l-259.7 259.7c-2.234 2.234-3.755 5.078-4.376 8.176l-26.34 131.7C-1.921 504 7.95 513.9 19.15 511.7l131.7-26.34c3.098-.6191 5.941-2.141 8.175-4.373l259.7-259.7L290.8 93.23z"
            />
        </svg>

    </div>
    <div class="task-content">${content || ""}</div>
    <div class="task-footer">
        <div class="date">${date || "can't get time"}</div>
        <svg
            version="1.1"
            viewBox="0 0 1364 1142"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="tasks-icons-width-acc trash-icon"
        >
            <defs>
                <style type="text/css">
                    .trashiconfill {
                        fill: #fefefe;
                    }
                </style>
            </defs>
            <g id="Layer_x0020_1">
                <g id="_586686536">
                    <ellipse class="tasks-icons-fill-acc trash-icon-hover" cx="682" cy="938" rx="682" ry="203" />
                    <path
                        class="tasks-icons-fill-acc trash-icon-hover"
                        d="M1080 224c-52,67 -106,134 -159,202 45,36 89,72 133,109 63,55 132,105 172,181 26,49 -3,103 -47,119 -8,12 -17,24 -25,36 -26,35 -50,70 -96,79 -1,0 -1,1 -2,1 -88,50 -209,-88 -267,-141 -32,-28 -63,-55 -94,-83 -70,101 -135,205 -190,315 -13,26 -38,42 -65,44 -64,21 -130,-18 -182,-54 -50,-34 -98,-72 -133,-123 -44,-28 -58,-92 -18,-135 9,-10 19,-21 28,-31 2,-1 3,-2 4,-3 85,-89 173,-175 262,-259 -80,-62 -160,-126 -231,-199 -40,-40 -24,-103 18,-128 55,-60 128,-98 197,-140 49,-29 106,-5 126,41 30,27 54,58 80,88 4,3 7,5 10,8l64 34 -14 18c8,7 17,14 25,22 59,-56 118,-113 175,-171 15,-41 65,-68 111,-47 28,14 56,27 84,42 47,4 88,49 80,99 -1,31 -19,61 -46,76z"
                    />
                    <path
                        class="trashiconfill"
                        d="M1169 746c-34,-65 -102,-115 -157,-163 -59,-50 -120,-99 -180,-147 69,-88 140,-177 209,-266 13,0 23,-15 21,-28 6,-17 -15,-35 -31,-28 -31,-18 -65,-34 -96,-49 -13,-6 -28,7 -23,19 -76,77 -155,152 -234,227 -33,-28 -66,-57 -98,-87 0,0 0,0 0,0 -1,-6 -3,-11 -8,-15 -2,-2 -4,-3 -5,-4l0 0c0,0 -1,0 -1,-1 -6,-4 -12,-9 -18,-13 -30,-35 -59,-73 -93,-100 -1,-17 -18,-33 -37,-22 -62,38 -139,77 -187,133 -1,2 -2,4 -3,6 -13,0 -23,19 -13,30 87,88 187,163 284,239 -108,101 -215,203 -316,310 -1,0 -1,1 -2,1 -9,10 -18,19 -27,29 -16,17 -3,39 14,42 31,50 78,88 126,121 33,22 93,63 134,43 8,1 16,-1 20,-9 67,-135 149,-261 236,-382 49,43 98,87 147,130 14,12 174,181 201,125 4,1 8,1 12,1 25,-5 45,-36 58,-55 14,-19 29,-40 41,-60 17,11 35,-12 26,-27z"
                    />
                </g>
            </g>
        </svg>
    </div>
</div>
`;
    return ele;
};

const getTimeNow = () => {
    const now = new Date();

    const options = {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    return now.toLocaleString("en-US", options);
};

const tasksContainer = document.querySelector(".appear-tasks");
//sweetalert library

const popupBody = (title, content, color) => {
    let input1 = "";
    let input2 = "";
    let input3 = "";
    if (color === "#b37ee4") {
        input1 = "checked";
    } else if (color === "#62a3cf") {
        input2 = "checked";
    } else {
        input3 = "checked";
    }
    return `
    <div class="pop-task" >
        <div class="input-boxs">
            <input type="text" name="title-of-task" class="title" placeholder="Title" value="${title || ""}"/>
            <textarea type="text" name="body-of-task" placeholder="Content" class="content"">${content || ""}</textarea>
        </div>
        <div class="radio-inp">
            <div class="color-con">
                <span class="alternative alt1"></span>
                <input type="radio" name="col" ${input1} value="#b37ee4">
            </div>
            <div class="color-con">
                <span class="alternative alt2"></span>
                <input type="radio" name="col" ${input2} value="#62a3cf">
            </div>
            <div class="color-con">
                <span class="alternative alt3"></span>
                <input type="radio" name="col" ${input3} value="#52925a">
            </div>
        </div>
    </div>
        `;
};
const getAllTask = async () => {
    try {
        const result = await fetch("/api/tasks");
        if (!result.ok) {
            throw new Error("can't get all task");
        }
        const parsedResult = await result.json();

        if (parsedResult.length < 1) return;
        parsedResult.forEach(ele => {
            tasksContainer.insertAdjacentHTML("beforeend", taskCardElement(ele.title, ele.content, ele.date, ele.color, ele._id, ele.complete));
        });
    } catch (e) {
        console.log(e);
    }
};
getAllTask();

const postTaskToDB = async data => {
    try {
        const result = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!result.ok) throw new Error("can't send data to db");
        return await result.json();
    } catch (e) {
        console.log(e);
    }
};
const addTaskPopup = () => {
    Swal.fire({
        title: "Add new task",
        html: popupBody(),
        showCloseButton: true,
        confirmButtonText: "save",
    }).then(result => {
        if (result.isConfirmed) {
            const popup = Swal.getPopup();
            const title = popup.querySelector('input[name="title-of-task"]').value;
            const content = popup.querySelector('textarea[name="body-of-task"]').value;
            const color = popup.querySelector('input[name="col"]:checked').value;

            const date = getTimeNow();
            if (!title && !content) return;
            Promise.resolve(
                postTaskToDB({
                    title,
                    content,
                    color,
                    date: date,
                    complete: false,
                })
            ).then(res => {
                tasksContainer.insertAdjacentHTML("beforeend", taskCardElement(title, content, date, color, res.taskId));
            });
        }
    });
};

const newTask = document.getElementById("newTask");

newTask.addEventListener("click", addTaskPopup);

//task operation
const makeTaskComplete = async task => {
    const taskCard = task.closest("[data-complete]");
    taskCard.dataset.complete = taskCard.dataset.complete === "true" ? "false" : "true";
    try {
        const result = await fetch("/api/tasks", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                taskId: taskCard.dataset.taskid,
                taskData: {
                    complete: taskCard.dataset.complete,
                },
            }),
        });
        if (!result.ok) throw new Error("can't do thant");
    } catch (e) {
        console.log(e);
    }
};

const deleteTaskFromDB = async data => {
    const result = await fetch("/api/tasks", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!result.ok) return false;
    return true;
};

const deleteTask = task => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then(result => {
        if (result.isConfirmed) {
            const taskId = task.dataset.taskid;

            const elementData = { taskId };
            const result = Promise.resolve(deleteTaskFromDB(elementData)).then(value => {
                if (value) {
                    task.remove();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Oops",
                        text: "Something went wrong!",
                        icon: "error",
                    });
                }
            });
        }
    });
};
const editTaskInDB = async data => {
    const result = await fetch("/api/tasks", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!result.ok) throw new Error("can't edit task" + data.taskId);
    // console.log(await result.json());
};
const editTaskPopup = (title, content, color, task) => {
    Swal.fire({
        title: "edit task",
        html: popupBody(title, content, color),
        showCloseButton: true,
        confirmButtonText: "save",
    }).then(result => {
        if (result.isConfirmed) {
            const popup = Swal.getPopup();

            //values in the swal pop
            const title = popup.querySelector('input[name="title-of-task"]').value;
            const content = popup.querySelector('textarea[name="body-of-task"]').value;
            const color = popup.querySelector('input[name="col"]:checked').value;

            //element in board
            const taskTitle = task.querySelector(".task-title");
            const taskContent = task.querySelector(".task-content");

            const dataToSend = {
                taskId: task.dataset.taskid,
                taskData: {
                    title,
                    content,
                    color,
                },
            };
            editTaskInDB(dataToSend);

            //update values
            taskTitle.innerText = title;
            taskContent.innerText = content;
            task.style.backgroundColor = color;
        }
    });
};

const editTask = task => {
    const taskTitle = task.querySelector(".task-title").innerText === "empty" ? "" : task.querySelector(".task-title").innerText;
    const taskContent = task.querySelector(".task-content").innerText;
    const bgColor = rgbToHex(getComputedStyle(task).backgroundColor);

    editTaskPopup(taskTitle, taskContent, bgColor, task);
};

tasksContainer.addEventListener("click", event => {
    const taskElement = event.target.closest(".task-card");
    if (!taskElement) return;

    const task = event.target;
    if (task.closest(".pen-icon")) {
        editTask(taskElement);
    } else if (task.closest(".trash-icon")) {
        deleteTask(taskElement);
    } else if (task.closest("[data-complete]")) {
        makeTaskComplete(taskElement);
    }
});

//delete task

tasksContainer.addEventListener("click", event => {
    const task = event.target.closest(".trash-icon");
});

//grid system direction btn
const gridIcon = document.getElementById("gridIcon");

gridIcon.parentElement.addEventListener("click", () => {
    tasksContainer.classList.toggle("grid");
});

//convert rgb to hex

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return null;
    return (
        "#" +
        result
            .slice(0, 3)
            .map(x => Number(x).toString(16).padStart(2, "0"))
            .join("")
    );
}

//sort data by element choosen

const dashboardTitle = document.getElementById("chosen");
const eleChoosenInSlide = document.querySelectorAll(".options");

const allTasksInDash = () => Array.from(tasksContainer.children);

//show all tasks
eleChoosenInSlide[0].addEventListener("click", _ => {
    dashboardTitle.innerText = eleChoosenInSlide[0].innerText;
    allTasksInDash().forEach(el => el.classList.remove("hide-task"));
});
//show only tasks maden in this day
eleChoosenInSlide[1].addEventListener("click", _ => {
    dashboardTitle.innerText = eleChoosenInSlide[1].innerText;

    const now = new Date();
    const options = {
        day: "numeric",
        month: "short",
    };
    const query = now.toLocaleString("en-US", options);

    allTasksInDash().forEach(el => {
        const dateInEle = el.querySelector(".date").innerText;

        el.classList.remove("hide-task");

        if (!dateInEle.includes(query)) el.classList.add("hide-task");
    });
});
//show only tasks has completed
eleChoosenInSlide[2].addEventListener("click", _ => {
    allTasksInDash().forEach(el => {
        const eleStatus = el.dataset.complete === "true" ? true : false;
        el.classList.remove("hide-task");

        if (!eleStatus) el.classList.add("hide-task");
    });
});
//show only tasks has incompleted
eleChoosenInSlide[3].addEventListener("click", _ => {
    allTasksInDash().forEach(el => {
        const eleStatus = el.dataset.complete === "true" ? true : false;
        el.classList.remove("hide-task");

        if (eleStatus) el.classList.add("hide-task");
    });
});

const settingBtn = document.getElementById("settingBtn");

const settingsBody = `        <div class="settingsBody">
            <div class="font-family">
                <h2>font family</h2>
                <select name="font" id="selectFont">
                    <option value="Margarine" celected>Margarine</option>
                    <option value="Sriracha">Sriracha</option>
                    <option value="CaveatBrush">CaveatBrush</option>
                    <option value="FreckleFace">FreckleFace</option>
                    <option value="IndieFlower">IndieFlower</option>
                    <option value="Miltonian">Miltonian</option>
                    <option value="Ranchers">Ranchers</option>
                    <option value="SedgwickAveDisplay">SedgwickAveDisplay</option>
                </select>
            </div>
        </div>`;

settingBtn.addEventListener("click", () => {
    Swal.fire({
        title: "settings",
        html: settingsBody,
        denyButtonText: "log out",
        showDenyButton: true,
        showCloseButton: true,
        showConfirmButton: false,
    }).then(result => {
        if (result.isDenied) {
            window.location.href = "/logout";
        }
    });
});
document.addEventListener("change", e => {
    if (e.target.id === "selectFont") {
        document.body.style.fontFamily = e.target.value;
        localStorage.setItem("fontFamily", e.target.value);
    }
});
