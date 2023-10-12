const serverUrl = "http://localhost:8000";

const toDoListCont = document.querySelector(".todo-list");
const toDoForm = document.querySelector(".todo-form");
const toDoFormInput = document.querySelector("#task");

const toDoHtml = `
<li class="todo">
  <p class="task">Wash dirty laundry</p>
  <div class="features">
    <button class="status">To-Do Status: Incomplete</button>
    <button class="edit">Edit To-DO</button>
    <button button class="delete">Delete To-Do</button>
  </div>
</li>`;

const rerender = (toDos) => {
  toDoListCont.innerHTML = "";

  toDos.forEach((toDo) => addNewTodo(toDo.task, toDo.status, toDo._id));
};

const toggleToDoStatus = async (e) => {
  const id = e.target.closest("li").dataset.id;

  try {
    const res = await fetch(`${serverUrl}/to-do-status`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const { data } = await res.json();

    rerender(data);
  } catch (error) {
    console.log(error);
  }
};

const addTodoEventListeners = (toggleToDoEl, editToDoEl, deleteToDoEl) => {
  toggleToDoEl.addEventListener("click", toggleToDoStatus);
};

const addNewTodo = (enteredTask, completed, id) => {
  //Creating New To-Do
  const newToDo = document.createElement("li");
  newToDo.classList.add("todo");
  newToDo.setAttribute("data-id", id);

  const task = document.createElement("p");
  // task.textContent = "New to do task here!";
  task.textContent = enteredTask;
  task.classList.add("task");

  const featuresCont = document.createElement("div");
  featuresCont.classList.add("features");

  const statusBtn = document.createElement("button");
  statusBtn.textContent = completed
    ? "Status: Completed"
    : "Status: Incomplete";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit To-Do";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete To-Do";

  addTodoEventListeners(statusBtn, editBtn, deleteBtn);

  //Adding the new to do
  featuresCont.append(statusBtn, editBtn, deleteBtn);

  newToDo.append(task, featuresCont);

  toDoListCont.append(newToDo);
};

const getData = async () => {
  try {
    const res = await fetch(`${serverUrl}/`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const sendToDo = async (e) => {
  e.preventDefault();
  try {
    //get to-do val
    const task = toDoFormInput.value;

    const res = await fetch(`${serverUrl}/add-to-do`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    const { data } = await res.json();

    toDoFormInput.value = "";
    rerender(data);
  } catch (error) {
    console.log(error);
  }
};

//READ FUNCTIONALITY
document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await getData();

  data.forEach((toDo) => {
    addNewTodo(toDo.task, toDo.status, toDo._id);
  });
});

toDoForm.addEventListener("submit", sendToDo);
