import { newTaskInput } from "../constant/constant.js";
import { store } from "../utils/createStore.js";

const form = document.querySelector(".task-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const textInput = newTaskInput.value;

  if (textInput.trim()) {
    store.addTask(textInput);

    newTaskInput.value = "";

    return;
  }

  alert("Enter text on task!");
});
