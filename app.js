// Place your code here
// Add any additional code necessary to fulfill the requirements of the assignment

document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTask');
    const addTaskBtn = document.getElementById('addTaskBtn');

    // Fetch tasks from API
    async function fetchTasks() {
        try {
            const response = await fetch("https://module3-api-is2m.onrender.com/random-todos");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error Fetching Tasks", error);
        }
    }

    // Validation Form
    addTaskBtn.addEventListener('click', function() {
        const taskTitle = newTaskInput.value.trim();
    
        if (taskTitle === '') {
          alert('Task cannot be blank.');
          return;
        }
    
        addTask(taskTitle);
        newTaskInput.value = '';
    });    
        
    // Add Task Button Function
    function addTask(taskTitle) {
        const li = document.createElement('li');
        const taskItem = document.createTextNode(taskTitle);
        li.appendChild(taskItem);
        
        const completeButton = document.createElement('button');
        completeButton.innerText = 'Complete';
        completeButton.addEventListener('click', function() {
        completeTask(li);
        });

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', function() {
        removeTask(li);
        });        
    
        li.appendChild(completeButton);
        li.appendChild(removeButton);
  
        taskList.appendChild(li);
    }
  
    function completeTask(taskElement) {
        taskElement.style.textDecoration = 'line-through';
        taskElement.querySelector('button').disabled = true;
    }
  
    function removeTask(taskId) {
        taskList.removeChild(taskId);
    }

    // Initially display 3 random tasks from API
    fetchTasks()
    .then (tasks => {
        tasks.forEach(task => {
            const li = `<li>${task}</li>`;
            document.querySelector('ul').insertAdjacentHTML('beforeend', li);
        });
    })
    .then(tasks => tasks.slice(0, 3))
    .then(displayTasks)
});