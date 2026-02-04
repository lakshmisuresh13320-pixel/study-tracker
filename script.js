function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

/* DAILY PROGRESS */
dailyRange.oninput = () => {
  dailyBar.style.width = dailyRange.value + "%";
  dailyPercent.textContent = dailyRange.value + "%";
  localStorage.setItem("dailyProgress", dailyRange.value);
  updateStreak();
};

if (localStorage.getItem("dailyProgress")) {
  dailyRange.value = localStorage.getItem("dailyProgress");
  dailyRange.oninput();
}

/* STREAK */
function updateStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem("lastDay");
  let streak = Number(localStorage.getItem("streak")) || 0;

  if (dailyRange.value > 0 && last !== today) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastDay", today);
  }
  streakCount.textContent = streak;
}
streakCount.textContent = localStorage.getItem("streak") || 0;

/* SUBJECT + ANALYTICS */
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

addSubjectBtn.onclick = () => {
  if (!subjectInput.value) return alert("Enter subject");

  let sub = {
    name: subjectInput.value,
    progress: Math.floor(Math.random() * 100)
  };

  subjects.push(sub);
  localStorage.setItem("subjects", JSON.stringify(subjects));
  renderSubjects();
};

function renderSubjects() {
  subjectList.innerHTML = "";
  analyticsBoard.innerHTML = "";

  subjects.forEach(s => {
    subjectList.innerHTML += `<li>${s.name}</li>`;

    analyticsBoard.innerHTML += `
      <p>${s.name}</p>
      <div class="progress-bar">
        <div style="width:${s.progress}%"></div>
      </div>
    `;
  });
}
renderSubjects();

/* FRIENDS BOARD (SIMULATED CONNECTION) */
addFriendBtn.onclick = () => {
  if (!friendName.value || !friendMobile.value) return;

  leaderTable.innerHTML += `
    <tr>
      <td>${friendName.value}</td>
      <td>${friendMobile.value}</td>
      <td>${friendProgress.value}%</td>
    </tr>
  `;

  friendName.value = "";
  friendMobile.value = "";
  friendProgress.value = "";
};
