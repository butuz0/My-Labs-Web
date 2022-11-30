// 1. Поміняйте місцями контент блоків «х» та «у».
const change_content_button = document.querySelector(".content_changer");
change_content_button.addEventListener("click", function () {
    let x = document.querySelector(".x");
    let y = document.querySelector(".y");

    let temp = x.innerHTML;
    x.innerHTML = y.innerHTML;
    y.innerHTML = temp;
});

// 2. Напишіть функцію, яка обчислює площу
// прямокутника, беручи необхідні значення із
// відповідних змінних у скрипті, і виводить
// отриманий результат в кінці контенту в блоці «4».

function rectangle_square(side_a, side_b) {
    document.querySelector(
        ".rectangle_square"
    ).innerHTML = `Square of rectangle with sides ${side_a} and ${side_b} is ${side_a * side_b}`;
}
rectangle_square(6.5, 20.1);

// 3. Напишіть скрипт, який визначає мінімальне і
// максимальне числа із 10 значень, беручи необхідні
// значення із відповідної форми в блоці «4», а
// отриманий результат виводить за допомогою
// діалогового вікна і зберігає в cookies, причому:
// а) при оновленні веб-сторінки в броузері користувачу за допомогою
// діалогового вікна виводиться інформація, збережена в cookies, із питанням про
// необхідність зберегти дані із cookies, і не виводиться згадана вище форма;
// б) при підтвердженні питання виводиться наступне діалогове вікно із
// інформуванням користувача про наявність cookies і необхідність
// перезавантаження веб-сторінки;
// в) при відмові відповідні cookies видаляються, і веб-сторінка оновлюється з
// початковим станом із наявною формою для введення даних.

numbers_input = document.querySelector(".numbers_input");

// all sympols which are not numbers are replaced with a space
numbers_input.addEventListener("input", function () {
    this.value = this.value.replace(/[^\d.]/g, " ");
});

function min_max(str) {
    str = str.replace(/^[ ]+/g, ""); // delete all spaces from the front
    str = str.replace(/[ ]+$/g, ""); // delete all spaces from the back
    str = str.replace(/ +/g, " "); // replace all long spaces with a single space
    let arr = str.split(" ").map(Number);
    return [Math.min.apply(Math, arr), Math.max.apply(Math, arr)];
}

btn = document.querySelector(".minmax_btn");

btn.addEventListener("click", function () {
    const minmax = min_max(numbers_input.value);
    let res = `Min element: ${minmax[0]}, max element: ${minmax[1]}`;
    document.querySelector(".min_max_results").innerHTML = res;
    document.cookie = `result=${res}`;
});

function get_cookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length == 2) return parts.pop().split(";").shift();
}

if (get_cookie("result")) {
    if (confirm(`There are some cookies: ${document.cookie}. Delete them?`)) {
        document.cookie = "result=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        alert("No cookies left.");
    } else {
        alert("There are some cookies, reload the page.");
        let four = document.querySelector(".item_4");
        let form_numbers = four.querySelector(".form_numbers");
        four.removeChild(form_numbers);
    }
}

// 4. Напишіть скрипт, який при настанні події focus встановлює властивість
// «жирності» для всього тексту в блоці «5» при встановленні користувачем
// відповідної галочки у формі і зберігає відповідне значення «жирності» в
// localStorage броузера так, щоб при наступному відкриванні веб-сторінки
// значення «жирності» тексту в блоці «5» встановлювалось із збереженого
// значення в localStorage.

const block_5 = document.querySelector(".text_item_5");

block_5.addEventListener("focus", function () {
    const checkbox = document.querySelector(".checkbox");
    if (checkbox.checked) {
        block_5.style.fontWeight = "bold";
        localStorage.setItem("font_weight", "bold");
    } else {
        block_5.style.fontWeight = "normal";
        localStorage.setItem("font_weight", "normal");
    }
});

block_5.style.fontWeight = localStorage.getItem("font_weight");

// 5. Напишіть скрипт створення одностовпчикової таблиці:
// а) необхідні елементи форми появляються у відповідних номерних блоках (1..6)
// внаслідок наведення курсора на зображення у даному блоці;
// б) кількість рядків таблиці необмежена;
// в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані таблиці
// зберігаються в localStorage броузера (структуровано на ваш розсуд), а сама
// таблиця заміщує початковий вміст відповідного номерного блока;
// г) перезавантаження веб-сторінки призводить до демонстрації таблиці на місці
// початкового вмісту номерного блока.

const monke_image = document.querySelectorAll(".le_monke");

let last_block = NaN;
let text = "";

monke_image.forEach((element) => {
    const form = element.closest("div").querySelector(".hidden_form");

    element.addEventListener("mouseover", function () {
        element.style.display = "none";
        form.style.display = "block";
    });
    const submit_btn = element.closest("div").querySelector(".submit");

    submit_btn.addEventListener("click", function () {
        form.style.display = "none";
        element.style.display = "block";

        last_block = element.closest("div").classList[1];
        let area = element.closest("div").querySelector(".area");
        text += area.value + "\n";
        area.value = "";

        localStorage.setItem("list_text", text);
        localStorage.setItem("last_block", last_block);
    });
});

window.addEventListener("load", function () {
    if (localStorage.getItem("list_text")) {
        let list = localStorage.getItem("list_text").split("\n");
        list.pop();
        let block = localStorage.getItem("last_block");

        let text = "<table>";
        list.forEach((element) => {
            text += `<tr><td>${element}</td></tr>`;
        });
        text += "</table>";

        document.querySelector(`.${block}`).innerHTML += text;
        localStorage.setItem("list_text", "");
        localStorage.setItem("last_block", "");
    }
});
