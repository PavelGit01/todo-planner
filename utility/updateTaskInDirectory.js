export const updateTaskInDirectory = (task, card, directory) => {
  // Обновляем класс активности
  if (task.isActive) {
    card.classList.add("active");
  } else {
    card.classList.remove("active");
  }

  //смотрим по директории и удаляем карточки если они уже не актуальны для этих дирректорий
  if (directory === "ends") {
    !task.isActive && card.remove();
  } else if (directory === "now") {
    task.isActive && card.remove();
  }
};
