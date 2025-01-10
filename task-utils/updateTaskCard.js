import { CardTask } from "../component/cardTask.js";
import { containerTask } from "../constant/constant.js";
import { store } from "../utils/createStore.js";
import {
  counterTasks,
  toggleEmptyMessage,
  updateTaskInDirectory,
} from "./taskHelpers.js";

export const updateTaskCards = (allTasks, action, id = null) => {
  const card = containerTask.querySelector(`[data-id='${id}']`);

  let currentTasks = allTasks;

  const directory = store.getDirectory();

  if (directory === "now") {
    currentTasks = allTasks.filter((task) => !task.isActive);
  } else if (directory === "ends") {
    currentTasks = allTasks.filter((task) => task.isActive);
  }

  switch (action) {
    case "delete":
      card.remove();

      break;

    case "edit":
      const task = allTasks.find((task) => task.id === id);

      updateTaskInDirectory(task, card, directory);

      break;

    case "add":
      if (directory !== "ends") {
        const newCard = new CardTask(allTasks[allTasks.length - 1]);

        containerTask.prepend(newCard.create());
      }
      break;
  }

  if (currentTasks.length === 0 || currentTasks.length === 1) {
    toggleEmptyMessage(currentTasks);
  }

  counterTasks(allTasks);
};
