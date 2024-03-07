const button = document.querySelector("#button");
const inputList = document.querySelector("#input-text");
const translitList = document.querySelector("#translit-text");
const inputField = document.querySelector("#input");
const deleteButton = document.querySelector("#delete");

function translit(str) {
  const ru = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "j",
    з: "z",
    и: "i",
    й: "yi",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "u",
    я: "ya",
  };

  const newStr = [];

  for (let i = 0; i < str.length; i++) {
    newStr.push(
      ru[str[i]] ||
        (ru[str[i].toLowerCase()] === undefined && str[i]) ||
        ru[str[i].toLowerCase()].replace(/^(.)/, (match) => match.toUpperCase())
    );
  }
  return newStr.join("");
}

// Добавление текста в элемент
function addToList(inputValue) {
  if (!inputValue.trim()) return;

  const newLiElement = document.createElement("li");
  newLiElement.innerText =
    inputValue.length > 10 ? `${inputValue.slice(0, 10)}...` : inputValue;
  newLiElement.setAttribute("aria-label", `${inputValue}`);
  inputList.append(newLiElement);

  // получение транслита текста
  const translitValue = translit(inputValue);

  // запись транслита
  const newLiTranslitElement = document.createElement("li");

  newLiTranslitElement.innerText =
    translitValue.length > 10
      ? `${translitValue.slice(0, 10)}...`
      : translitValue;
  newLiTranslitElement.setAttribute("aria-label", `${translitValue}`);
  newLiTranslitElement.append(deleteItemButton);
  translitList.append(newLiTranslitElement);

  // кнопка удаления для элемента
  const deleteItemButton = document.createElement("button");
  deleteItemButton.classList.add("delete-item");
  deleteItemButton.addEventListener("click", () => {
    newLiElement.remove();
    newLiTranslitElement.remove();

    if (!translitList.childNodes.length) {
      deleteButton.classList.add("delete-btn-hidden");
    }
  });

  deleteButton.classList.remove("delete-btn-hidden");
}

// Обработчик событий кнопки ввода
function eventHandler() {
  const inputValue = document.querySelector("#input").value;
  addToList(inputValue);
  // отчистка поля ввода после всех действий
  inputField.value = "";
}

// удаление всех данных из поля отображения ввода
function deleteHandler() {
  const allLiTag = document.querySelectorAll(
    "#input-text li, #translit-text li"
  );
  for (let i = 0; i < allLiTag.length; i++) {
    allLiTag[i].remove();
  }
  deleteButton.classList.add("delete-btn-hidden");
}

// устанока прослушивателей
button.addEventListener("click", eventHandler);
inputField.addEventListener("keyup", (event) => {
  if (event.code === "Enter") eventHandler();
});
deleteButton.addEventListener("click", deleteHandler);
