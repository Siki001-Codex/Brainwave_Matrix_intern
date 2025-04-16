const planner = document.getElementById('planner');
const notification = document.getElementById('notification');
const clearAllBtn = document.getElementById('clear-all');
const currentDate = document.getElementById('current-date');

const hours = [
  { label: '9 AM', hour: 9 },
  { label: '10 AM', hour: 10 },
  { label: '11 AM', hour: 11 },
  { label: '12 PM', hour: 12 },
  { label: '1 PM', hour: 13 },
  { label: '2 PM', hour: 14 },
  { label: '3 PM', hour: 15 },
  { label: '4 PM', hour: 16 },
  { label: '5 PM', hour: 17 }
];

function showCurrentDate() {
  const now = new Date();
  currentDate.textContent = now.toLocaleString();
}

function showNotification(msg = 'Task saved!') {
  notification.textContent = msg;
  notification.classList.remove('hidden');
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 2000);
}

function getTimeClass(hour) {
  const now = new Date().getHours();
  if (hour < now) return 'past';
  if (hour === now) return 'present';
  return 'future';
}

function createPlannerRow(hourObj, index) {
  const row = document.createElement('div');
  row.className = 'planner-row';

  const timeLabel = document.createElement('div');
  timeLabel.className = 'time-label';
  timeLabel.textContent = hourObj.label;

  const taskInput = document.createElement('input');
  taskInput.className = `task-input ${getTimeClass(hourObj.hour)}`;
  taskInput.type = 'text';
  taskInput.value = localStorage.getItem(`task-${index}`) || '';

  const saveBtn = document.createElement('button');
  saveBtn.className = 'save-btn';
  saveBtn.textContent = 'Save';

  saveBtn.addEventListener('click', () => {
    localStorage.setItem(`task-${index}`, taskInput.value);
    showNotification();
  });

  row.appendChild(timeLabel);
  row.appendChild(taskInput);
  row.appendChild(saveBtn);
  planner.appendChild(row);
}

function loadPlanner() {
  planner.innerHTML = '';
  hours.forEach((hourObj, i) => createPlannerRow(hourObj, i));
}

clearAllBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all tasks?')) {
    hours.forEach((_, i) => localStorage.removeItem(`task-${i}`));
    loadPlanner();
    showNotification('All tasks cleared!');
  }
});

showCurrentDate();
loadPlanner();
setInterval(showCurrentDate, 60000);
