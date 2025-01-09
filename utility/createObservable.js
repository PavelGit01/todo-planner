//присваеваем значение из стораджа
const tasksFromStorage = localStorage.getItem("tasks");

//если данные в сторадже есть,то парсим их,если нет то пустой массив
const tasks = tasksFromStorage ? JSON.parse(tasksFromStorage) : [];

//создаем обсервер
const createObservable = (initialState = tasks) => {
  //стейт со всеми задачами
  let taskState = initialState;

  //стейт текущей директории
  let currentDirectory = "all";

  //подписчики
  let observers = [];

  //уведомляем подписчиков передавая стейт,действие которое произошло,и айди задачи с которой произошло изменение
  const notify = (action, id = null) => {
    observers.forEach((observer) => observer(taskState, action, id));
  };

  //добавляем в сторадж весь стейт
  const updateLocalStorage = (newState) => {
    localStorage.setItem("tasks", JSON.stringify(newState));
  };

  return {
    subscribe: (observer) => {
      observers = [...observers, observer];
    },

    unsubscribe: (observer) => {
      observers = observers.filter((obs) => obs !== observer);
    },

    setState: (newState) => {
      taskState = newState;
      //при смене стейта,добавляем его в сторадж
      updateLocalStorage(taskState);

      notify();
    },

    getState: () => taskState,

    //метод для получения текущей директории
    getDirectory: () => currentDirectory,

    //изменение директории
    setDirectory: (newDirectory) => {
      currentDirectory = newDirectory;
    },

    //метод для добавления задачи
    addTask: (taskText) => {
      const newTask = {
        text: taskText,
        isActive: false,
        id: new Date().getTime(),
      };

      taskState.push(newTask);

      updateLocalStorage(taskState);

      notify("add", newTask);
    },

    //метод для удаления задачи,принимает айди задачи которую удаляем
    deleteTask: (delId) => {
      taskState = taskState.filter((task) => task.id !== delId);

      updateLocalStorage(taskState);

      //уведомляем подписчиков что наше действие - удаление,и указываем айди
      notify("delete", delId);
    },

    //метод для смены состояния выполнения задачи,принимает айди задачи
    changeActiveTask: (editId) => {
      taskState = taskState.map((task) =>
        task.id === editId ? { ...task, isActive: !task.isActive } : task
      );
      
      updateLocalStorage(taskState);

      //уведомляем подписчиков что наше действие - смена состояния задачи,и указываем айди
      notify("edit", editId);
    },
  };
};

export const tasksObservable = createObservable();
