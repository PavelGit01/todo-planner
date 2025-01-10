import {
  allTasksCount,
  emptyMessage,
  endsTasksCount,
  nowTasksCount,
} from "../constant/constant";
import { store } from "../utils/createStore";

export const updateTaskInDirectory = (task, card, directory) => {
  if (task.isActive) {
    card.classList.add("active");
  } else {
    card.classList.remove("active");
  }

  if (directory === "ends") {
    !task.isActive && card.remove();
  } else if (directory === "now") {
    task.isActive && card.remove();
  }
};

export const toggleEmptyMessage = (tasks) => {
  if (tasks.length === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");
  }
};

export const counterTasks = (tasks) => {
  allTasksCount.textContent = tasks.length;

  nowTasksCount.textContent = tasks.filter((task) => !task.isActive).length;

  endsTasksCount.textContent = tasks.filter((task) => task.isActive).length;
};

export const filterTasks = (directory) => {
  const allTasks = store.getState();

  if (directory === "all") return allTasks;

  return allTasks.filter((task) =>
    directory === "now" ? !task.isActive : task.isActive
  );
};
