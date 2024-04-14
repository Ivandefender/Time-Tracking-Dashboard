const URL = "./data.json";
const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");

const btns = [dailyBtn, weeklyBtn, monthlyBtn];
btns.forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    e.target.classList.add("btn__active");
    switch (i) {
      case 0:
        weeklyBtn.classList.remove("btn__active");
        monthlyBtn.classList.remove("btn__active");
        break;
      case 1:
        dailyBtn.classList.remove("btn__active");
        monthlyBtn.classList.remove("btn__active");
        break;
      case 2:
        dailyBtn.classList.remove("btn__active");
        weeklyBtn.classList.remove("btn__active");
        break;
    }
    switchTracker(e.target.textContent);
  });
});

let timesData;

async function loadData(url) {
  const responce = await fetch(url);
  const timeData = await responce.json();
  return timeData;
}

async function addContent() {
  timesData = await loadData(URL);

  await new Promise((resolve, reject) => {
    const typeEntertaiment = document.querySelectorAll(".info__title");
    typeEntertaiment.forEach((elem, index) => {
      elem.textContent = timesData[index].title;
    });
    switchTracker("weekly");
    resolve();
  });
}

function switchTracker(active) {
  const activeElement = active.toLowerCase();
  const infoTime = document.querySelectorAll(".info__time");
  const infoDate = document.querySelectorAll(".time__date");  
  const infoPrev = document.querySelectorAll(".time__prev");
  let allTimeFrames = [];

  timesData.forEach((dataItem, i) => {
    const timeFrames = Object.values(dataItem.timeframes[activeElement]);
    allTimeFrames.push(timeFrames);
    infoTime[i].textContent = `${allTimeFrames[i][0]}hrs`;
    infoPrev[i].textContent = `${allTimeFrames[i][1]}hrs`;

    if(activeElement === 'weekly') infoDate[i].textContent = `Last Week - `;
    else if(activeElement === 'monthly') infoDate[i].textContent = `Last Month - `;
    else infoDate[i].textContent = `Last Day - `;
  });
}

addContent();
