import { CardTask } from "../component/cardTask.js";
import { containerTask } from "../constant/constant.js";
import { counterTasks } from "./counterTasks.js";
import { tasksObservable } from "./createObservable.js";
import { toggleEmptyMessage } from "./emptyTasksMessage.js";

//функция для рендера всех задач(при смене директории и первом рендере)
export const renderCards = () => {
  const allTasks = tasksObservable.getState();

  //создаем фрагмент для оптимизации(чтобы за 1 рендер добавить все таски)
  const fragment = document.createDocumentFragment();

  //очищаем контейнер
  containerTask.innerHTML = "";

  //находим текущую директорию
  const directory = tasksObservable.getDirectory();

  //используем свитч чтобы узнать в какую мы директорию попадаем и фильтруем наши задачи по выполнению
  switch (directory) {
    case "all":
      //добавляем все задачи в фрагмент,а потом за один рендер в контейнер
      allTasks.forEach((task) => {
        //создаем экземпляр класса
        const cards = new CardTask(task);

        //добавляем все в фрагмент
        fragment.prepend(cards.create());
      });

      //добавляем за один рендер все задачи
      containerTask.append(fragment);

      break;

    //добавляем только текущие задачи
    case "now": {
      allTasks
        .filter((task) => !task.isActive)
        .forEach((task) => {
          const cards = new CardTask(task);

          fragment.prepend(cards.create());
        });

      containerTask.append(fragment);

      break;
    }

    //добавляем только законченые задачи
    case "ends": {
      allTasks
        .filter((task) => task.isActive)
        .forEach((task) => {
          const cards = new CardTask(task);

          fragment.prepend(cards.create());
        });

      containerTask.append(fragment);

      break;
    }

    //дефолтное поведение
    default: {
      const notFound = document.createElement("p");

      notFound.textContent = "Tasks not found";

      containerTask.append(notFound);
    }
  }

  //обновляем счетчик
  counterTasks(allTasks);

  // Обновляем сообщение о пустом списке передав значение контейнера(он будет пуст если там нет задач)
  toggleEmptyMessage(containerTask.children);
};
