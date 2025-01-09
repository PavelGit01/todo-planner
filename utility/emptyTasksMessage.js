import { emptyMessage } from "../constant/constant.js";

// Функция для показа или скрытия сообщения о том что тасок нет
export const toggleEmptyMessage = (tasks) => {
  //если длина массива тасок равна нулю тогда показываем сообщение
  if (tasks.length === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    //если задачи есть в массиве,то скрываем сообщение
    emptyMessage.classList.add("hidden");
  }
};
