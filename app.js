import {
  buttContainer,
  containerTask,
  filtredButt,
} from "./constant/constant.js";
import "./utils/switchTheme.js";
import "./task-utils/addTaskForm.js";
import { renderCards } from "./utils/renderCards.js";
import { updateTasksCards } from "./task-utils/updateTaskCard.js";
import { store } from "./utils/createStore.js";

// Подписка на обновления задач
store.subscribe(updateTasksCards);

//первый рендер
renderCards();

// Делегируем удаление задачи
containerTask.addEventListener("click", (e) => {
  if (e.target.closest(".delete-button")) {
    const card = e.target.closest(".task-card");

    const taskId = Number(card.dataset.id);

    //вызываем метод для удаления задачи
    store.deleteTask(taskId);
  }
});

//делегируем изменение состояния задачи
containerTask.addEventListener("change", (e) => {
  if (e.target.closest(".task-card__check-active")) {
    const card = e.target.closest(".task-card");

    const taskId = Number(card.dataset.id);

    // Вызываем метод для смены статуса задачи
    store.changeActiveTask(taskId);
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
    store.setDirectory(clickedButt.dataset.statusDirectory);

    //ререндерим все карточки при смене директории
    renderCards();
  }
});
