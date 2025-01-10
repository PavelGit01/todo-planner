const tasksFromStorage = localStorage.getItem("tasks");

const tasks = tasksFromStorage ? JSON.parse(tasksFromStorage) : [];

const createStore = (initialState = tasks) => {
  let taskState = initialState;

  let currentDirectory = "all";

  let observers = [];

  const updateStore = (newState, action, id = null) => {
    taskState = newState;
    updateLocalStorage(taskState);
    notify(action, id);
  };

  const notify = (action, id = null) => {
    observers.forEach((observer) => observer(taskState, action, id));
  };

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

    getState: () => taskState,

    getDirectory: () => currentDirectory,

    setDirectory: (newDirectory) => {
      currentDirectory = newDirectory;
    },

    addTask: (taskText) => {
      const newTask = {
        text: taskText,
        isActive: false,
        id: new Date().getTime(),
      };

      updateStore([...taskState, newTask], "add", newTask.id);
    },

    deleteTask: (delId) => {
      taskState = taskState.filter((task) => task.id !== delId);

      updateStore(taskState, "delete", delId);
    },

    changeActiveTask: (editId) => {
      taskState = taskState.map((task) =>
        task.id === editId ? { ...task, isActive: !task.isActive } : task
      );

      updateStore(taskState, "edit", editId);
    },
  };
};

export const store = createStore();
