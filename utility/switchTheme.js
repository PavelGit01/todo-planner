import { switchThemeButt } from "../constant/constant.js";

//вешаем обработчик события
switchThemeButt.addEventListener("click", function () {
  //ищем наш html
  const root = document.documentElement;

  //тоглим класс дарк
  root.classList.toggle("dark");
});
