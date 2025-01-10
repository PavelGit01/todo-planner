import { switchThemeButt } from "../constant/constant";

switchThemeButt.addEventListener("click", function () {
  const root = document.documentElement;

  root.classList.toggle("dark");
});
