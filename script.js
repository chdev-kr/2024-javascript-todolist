const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// IME 조합 중 여부 플래그
let isComposing = false;
inputBox.addEventListener("compositionstart", function () {
  isComposing = true;
});
inputBox.addEventListener("compositionend", function () {
  isComposing = false;
});

// 엔터 입력 시(조합 중이 아닐 때만)
inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !isComposing) {
    addTask();
  }
});

// Add 버튼 클릭 시(중복 방지, HTML의 onclick 제거 필요)
document.querySelector(".row button").addEventListener("click", function () {
  addTask();
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let period = document.getElementById("period");

setInterval(() => {
  let currentTime = new Date();
  let hours = currentTime.getHours() % 12 || 12;

  hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + hours;

  period.innerHTML = currentTime.getHours() >= 12 ? "PM" : "AM";

  min.innerHTML =
    (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
  sec.innerHTML =
    (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000);

function addTask() {
  if (inputBox.value === "") {
    alert("내용을 적어주세요!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);
