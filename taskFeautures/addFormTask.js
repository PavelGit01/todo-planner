import { newTaskInput } from "../constant/constant.js";
import { tasksObservable } from "../utility/createObservable.js";

//инициализируем изначальный текст
let text = "";

//Инпут текста задачи и его обработчик
newTaskInput.addEventListener("input", (e) => {
  //перезаписываем текст из инпута
  text = e.target.value;
});

//Форма и ее обработчик
const form = document.querySelector(".task-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //проверка что текст в инпуте есть(удаляя пробелы)
  if (text.trim()) {
    //передаем текст в обсервер и вызываем метод добавления
    tasksObservable.addTask(text);

    //обнуляем изначальный текст
    text = "";

    //сбрасываем значение инпута
    newTaskInput.value = "";

    return;
  }

  //если текст задачи пустой выводим алерт
  alert("Enter text on task!");
});
