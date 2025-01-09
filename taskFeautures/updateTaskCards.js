import { CardTask } from "../component/cardTask.js";
// import { createCardTask } from "../component/cardTask.js";
import { containerTask } from "../constant/constant.js";
import { counterTasks } from "../utility/counterTasks.js";
import { tasksObservable } from "../utility/createObservable.js";
import { toggleEmptyMessage } from "../utility/emptyTasksMessage.js";
import { updateTaskInDirectory } from "../utility/updateTaskInDirectory.js";

//функция подписчик для изменение в списке задач через обсервер и точечного ререндера измененной задачи
export const updateTasksCards = (allTasks, action, id = null) => {
  //находим нашу карточку из массива по атрибуту
  const card = containerTask.querySelector(`[data-id='${id}']`);

  //создаем массив для отображения в других дирректориях
  let currentTasks = allTasks;

  //получаем текущую директорию
  const directory = tasksObservable.getDirectory();

  //смотрим дирректорию и создаем массив из актуальных для нее задач
  if (directory === "now") {
    currentTasks = allTasks.filter((task) => !task.isActive);
  } else if (directory === "ends") {
    currentTasks = allTasks.filter((task) => task.isActive);
  }

  // Если действие - удалить
  if (action === "delete") {
    card.remove();
  }

  // Если действие - редактировать
  if (action === "edit") {
    const task = allTasks.find((task) => task.id === id);

    //отдельная функция для работы с изменением карточки в директории
    updateTaskInDirectory(task, card, directory);
  }

  // Если действие - добавить
  if (action === "add") {
    //если директория 'ends' то мы не добавляем в дом новую задачу
    // так как она изначально в состоянии 'не выполнена',при смене дериктории произойдет ререндер и она сама появится
    if (directory !== "ends") {
      //создаем экземпляр класса для последней добавленной карточки через обсервер
      const newCard = new CardTask(allTasks[allTasks.length - 1]);

      containerTask.prepend(newCard.create());
    }
  }

  // Обновляем сообщение о пустом списке, если длина задач изменилась чтобы не вызывать постоянно эту функцию
  if (currentTasks.length === 0 || currentTasks.length === 1) {
    toggleEmptyMessage(currentTasks);
  }

  // Обновляем счетчики задач
  counterTasks(allTasks);
};
