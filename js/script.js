let changeThemeButtons = document.querySelectorAll(".changeTheme");
let textCard = document.querySelectorAll(".card-text");

changeThemeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    let theme = this.dataset.theme;
    applyTheme(theme);
  });
});

function applyTheme(themeName) {
  document
    .querySelector('[title="theme"]')
    .setAttribute("href", `css/theme-${themeName}.css`);
  changeThemeButtons.forEach((button) => {
    button.style.display = "block";
  });
  document.querySelector(`[data-theme="${themeName}"]`).style.display = "none";
  localStorage.setItem("theme", themeName);
}

let activeTheme = localStorage.getItem("theme"); // Проверяем есть ли в LocalStorage записано значение для 'theme' и присваиваем его переменной.

if (activeTheme === null || activeTheme === "light") {
  // Если значение не записано, или оно равно 'light' - применяем светлую тему
  applyTheme("light");
} else if (activeTheme === "dark") {
  // Если значение равно 'dark' - применяем темную
  applyTheme("dark");
}
function limitStr(str, n, symb) {
  if (!n && !symb) return str;
  symb = symb || "...";
  return str.substr(0, n - symb.length) + symb;
}

// console.log(textCard, textCard.textContent, textCard.innerText, "textContent")

if (!!textCard) {
  textCard.forEach((element) => {
    let symb = "...";
      element.insertAdjacentHTML(
        "afterEnd",
        '<button type="button" class="btn btn-link show-more">Show more...</button>'
        
      );
    if (element.textContent.length > 300) {
      console.log("dddd");
      element.parentNode.classList.toggle("active");
    //   element.insertAdjacentHTML(
    //     "afterEnd",
    //     '<button type="button" class="btn btn-link show-more">Show more...</button>'
        
    //   );

      let showMore = document.querySelectorAll(".show-more");
      //   showMore.forEach((e) => {
      //     e.addEventListener("click", function () {
      //       console.log("f[fd");
      //       e.parentNode.classList.toggle("active");
      //     });
      //   });
    }
  });
  let showMore = document.querySelectorAll(".show-more");
  if (!!textCard && !!showMore) {
    const smoothHeight = (itemSelector, buttonSelector, contentSelector) => {
      // объявляем основную функцию, которая принимает в качестве параметров селекторы элемента, кнопки внутри элемента и блока с контентом

      const items = document.querySelectorAll(itemSelector); // находим все элементы по переданному селектору в параметре itemSelector и записываем в константу items

      if (!items.length) return; // если таких элементов нет, прекращаем выполнение функции

      items.forEach((el) => {
        // для каждого элемента
        const button = el.querySelector(buttonSelector); // находим кнопку и записываем в константу button
        const content = el.querySelector(contentSelector); // находим блок с контентом и записываем в константу content

        button.addEventListener("click", () => {
          // при клике на кнопку
          if (el.dataset.open !== "true") {
            // если значение data-атрибута open у элемента не равно 'true' и блок с контентом еще не отображен
            el.dataset.open = "true"; // тогда устанавливаем значение 'true'
            content.style.maxHeight = `${content.scrollHeight}px`; // и блоку с контентом устанавливаем inline-свойсво max-height со вычисленным значением полной высоты этого блока
          } else {
            // если блок с контентом отображен и значение data-атрибута open у элемента равно 'true'
            el.dataset.open = "false"; // тогда устанавливаем значение 'false'
            content.style.maxHeight = ""; // и сбрасываем ранее установленное inline-свойсво max-height
          }
        });

        const onResize = () => {
          // объявляем функцию onResize, которая будет корректировать значение inline-свойства max-height при изменении размеров окна браузера
          if (el.dataset.open === "true") {
            // если значение data-атрибута open у элемента равно 'true' (коректировать высоту нужно только если блок контента отображен)
            if (parseInt(content.style.maxHeight) !== content.scrollHeight) {
              // если текущее значение inline-свойства max-height у блока контента не равно полной высоте
              content.style.maxHeight = `${content.scrollHeight}px`; // только тогда блоку с контентом корректируем значение inline-свойсва max-height
            }
          }
        };

        window.addEventListener("resize", onResize); // вызываем функцию onResize при изменении размеров окна браузера
      });
    };

    smoothHeight(".card-accardeon", ".show-more", ".card-text"); // вызываем основную функцию smoothHeight и передаем в качестве параметров  необходимые селекторы
  }
}
