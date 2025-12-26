const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const startMonth = new Date(); // 현재 달
startMonth.setDate(1);

const endMonth = new Date();
endMonth.setMonth(startMonth.getMonth() + 2);
endMonth.setDate(1);

let currentDate = new Date();
function isSameOrAfter(a, b) {
  return a.getFullYear() > b.getFullYear() ||
    (a.getFullYear() === b.getFullYear() && a.getMonth() >= b.getMonth());
}

function isSameOrBefore(a, b) {
  return a.getFullYear() < b.getFullYear() ||
    (a.getFullYear() === b.getFullYear() && a.getMonth() <= b.getMonth());
}

function getClosedDays(year, month) {
  const sundays = [];
  //const closedDays = []; //임시 휴무 추가'2026-01-01'
  const closedDays = [
    '2026-02-17', //설 연휴
    '2026-02-18', //설 연휴
    '2026-09-25', //추석 연휴
    '2026-09-26', //추석 연휴

]
    
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
  updateNavButtons();
}
function updateNavButtons() {
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  prevBtn.disabled = !isSameOrAfter(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    startMonth
  );

  nextBtn.disabled = !isSameOrBefore(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    endMonth
  );
}

renderCalendar(currentDate);

document.getElementById("prev").onclick = () => {
  const prev = new Date(currentDate);
  prev.setMonth(prev.getMonth() - 1);

  if (!isSameOrAfter(prev, startMonth)) return;

  currentDate = prev;
  renderCalendar(currentDate);
};
document.getElementById("next").onclick = () => {
  const next = new Date(currentDate);
  next.setMonth(next.getMonth() + 1);

  if (!isSameOrBefore(next, endMonth)) return;

  currentDate = next;
  renderCalendar(currentDate);
};