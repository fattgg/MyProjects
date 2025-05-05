const API_URL = '/api/tasks';

async function fetchTasks() {
  const response = await fetch('http://localhost:3000/tasks');
  const tasks = await response.json();
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');

    if (task.completed) {
      listItem.classList.add('completed');
    } else {
      listItem.classList.add('not-completed');
    }

    const taskText = document.createElement('span');
    taskText.textContent = `${task.title} - ${task.completed ? 'Completed' : 'Not Completed'}`;
    listItem.appendChild(taskText);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task._id);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });
}

document.getElementById('task-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const taskTitle = document.getElementById('task-title').value;
  const taskCompleted = document.getElementById('task-completed').checked;

  const newTask = { title: taskTitle, completed: taskCompleted };

  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  });

  fetchTasks();

  document.getElementById('task-title').value = '';
  document.getElementById('task-completed').checked = false;
});

async function deleteTask(taskId) {
  await fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: 'DELETE',
  });

  fetchTasks();
}
window.onload = fetchTasks;
