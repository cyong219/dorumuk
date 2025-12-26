const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");

let currentDate = new Date();
async function loadClosedDays() {
  const res = await fetch("./closed-days.txt");
  const text = await res.text();

  return text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);
}

function getClosedDays(year, month) {
  const sundays = [];
  const closedDays = []; //임시 휴무 추가'2026-01-01'
    
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDate; day++) {
    const date = new Date(year, month, day);
    if (date.getDay() === 0) {
      sundays.push(day);
    }
  }

  // 첫째, 셋째 일요일
  [sundays[0], sundays[2]].forEach(day => {
    if (!day) return;
    closedDays.push(
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    );
  });

  return closedDays;
}
function renderCalendar(date) {
  calendarGrid.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  monthYear.textContent = `${year}년 ${month + 1}월`;

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  days.forEach(d => {
    const div = document.createElement("div");
    div.textContent = d;
    div.className = "day-name";
    calendarGrid.appendChild(div);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // ⭐ 휴무일 계산
  
  const closedDays = getClosedDays(year, month);

  for (let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }
  
  for (let day = 1; day <= lastDate; day++) {
    const div = document.createElement("div");
    div.textContent = day;
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // 오늘
    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      div.classList.add("today");
    }

    // ⭐ 첫째·셋째 주 일요일 휴무
     if (closedDays.includes(dateKey)) {
      div.classList.add("closed");
    }

    calendarGrid.appendChild(div);
  }
}

renderCalendar(currentDate);

// 이전 / 다음 달
document.getElementById("prev").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
};

document.getElementById("next").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};
