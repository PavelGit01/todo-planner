import {
  allTasksCount,
  endsTasksCount,
  nowTasksCount,
} from "../constant/constant.js";

//Функция для подсчета карточек всех/текущих/законченных
export const counterTasks = (allTasks) => {
  //перезаписываем значение для количества всех задач
  allTasksCount.textContent = allTasks.length;

  //перезаписываем значение для количества текущих задач
  nowTasksCount.textContent = allTasks.filter((task) => !task.isActive).length;

  //перезаписываем значение для количества выполненых  задач
  endsTasksCount.textContent = allTasks.filter((task) => task.isActive).length;
};
