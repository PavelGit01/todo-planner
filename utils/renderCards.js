import { containerTask } from "../constant/constant.js";
import { counterTasks } from "./counterTasks.js";
import { toggleEmptyMessage } from "./emptyTasksMessage.js";
import { store } from "./createStore.js";
import { filterTasks } from "../task-utils/taskHelpers.js";

export const renderCards = () => {
  const allTasks = store.getState();

  let filtredTasks = allTasks;

  containerTask.innerHTML = "";

  const directory = store.getDirectory();

  switch (directory) {
    case "all":
      filtredTasks = filterTasks("all");

      break;
    case "now": {
      filtredTasks = filterTasks("now");

      break;
    }

    case "ends": {
      filtredTasks = filterTasks("ends");

      break;
    }

    default: {
      const notFound = document.createElement("p");

      notFound.textContent = "Tasks not found";

      containerTask.append(notFound);
    }
  }

  const fragment = document.createDocumentFragment();

  filtredTasks.forEach((task) => {
    const card = new CardTask(task);

    fragment.append(card.create());
  });

  containerTask.append(fragment);

  counterTasks(allTasks);

  toggleEmptyMessage(filtredTasks);
};
