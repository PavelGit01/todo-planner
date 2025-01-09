import {
  buttContainer,
  containerTask,
  filtredButt,
} from "./constant/constant.js";
import { tasksObservable } from "./utility/createObservable.js";
import "./utility/switchTheme.js";
import "./taskFeautures/addFormTask.js";
import { renderCards } from "./utility/renderCards.js";
import { updateTasksCards } from "./taskFeautures/updateTaskCards.js";

// Подписка на обновления задач
tasksObservable.subscribe(updateTasksCards);

//первый рендер
renderCards();

// Делегируем удаление задачи
containerTask.addEventListener("click", (e) => {
  if (e.target.closest(".delete-button")) {
    const card = e.target.closest(".task-card");

    const taskId = Number(card.dataset.id);

    //вызываем метод для удаления задачи
    tasksObservable.deleteTask(taskId);
  }
});

//делегируем изменение состояния задачи
containerTask.addEventListener("change", (e) => {
  if (e.target.closest(".task-card__check-active")) {
    const card = e.target.closest(".task-card");

    const taskId = Number(card.dataset.id);

    // Вызываем метод для смены статуса задачи
    tasksObservable.changeActiveTask(taskId);
  }
});

//делегируем смену директории
buttContainer.addEventListener("click", (e) => {
  //проверяем что клик был по кнопке смены директории
  if (e.target.closest(".task-filter-button")) {
    const clickedButt = e.target;

    //удаляем все классы active
    filtredButt.forEach((button) => button.classList.remove("active"));

    //устанавливаем текущей дирректории класс active
    if (clickedButt.closest(".task-filter")) {
      clickedButt.closest(".task-filter").classList.add("active");
    }

    //меняем директорию глобально
    tasksObservable.setDirectory(clickedButt.dataset.statusDirectory);

    //ререндерим все карточки при смене директории
    renderCards();
  }
});
