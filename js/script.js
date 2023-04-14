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

      const items = document.querySelectorAll(itemSelector); 

      if (!items.length) return; 

      items.forEach((el) => {
        const button = el.querySelector(buttonSelector); 
        const content = el.querySelector(contentSelector); 

        button.addEventListener("click", () => {
          if (el.dataset.open !== "true") {
            el.dataset.open = "true"; 
            content.style.maxHeight = `${content.scrollHeight}px`; 
          } else {
            el.dataset.open = "false";
            content.style.maxHeight = "";
          }
        });

        const onResize = () => {
          if (el.dataset.open === "true") {
            if (parseInt(content.style.maxHeight) !== content.scrollHeight) {
              content.style.maxHeight = `${content.scrollHeight}px`; 
            }
          }
        };

        window.addEventListener("resize", onResize); 
      });
    };

    smoothHeight(".card-accardeon", ".show-more", ".card-text");
  }
}
