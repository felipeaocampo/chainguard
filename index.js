console.log(`hello there!`);

const toDoListCont = document.querySelector(".todo-list");

const toDoHtml = `
<li class="todo">
  <p class="task">Wash dirty laundry</p>
  <div class="features">
    <button class="status">To-Do Status: Incomplete</button>
    <button class="edit">Edit To-DO</button>
    <button button class="delete">Delete To-Do</button>
  </div>
</li>`;

const addNewTodo = (enteredTask) => {
  //Creating New To-Do
  const newToDo = document.createElement("li");
  newToDo.classList.add("todo");

  const task = document.createElement("p");
  // task.textContent = "New to do task here!";
  task.textContent = enteredTask;
  task.classList.add("task");

  const featuresCont = document.createElement("div");
  featuresCont.classList.add("features");

  const statusBtn = document.createElement("button");
  statusBtn.textContent = "Status: Incomplete";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit To-Do";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete To-Do";

  //Adding the new to do
  featuresCont.append(statusBtn, editBtn, deleteBtn);

  newToDo.append(task, featuresCont);

  toDoListCont.append(newToDo);
};

addNewTodo(`Wash your teeth before going to bed tonight`);
