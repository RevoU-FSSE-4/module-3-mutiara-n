document.addEventListener('DOMContentLoaded', () => {
    const taskList: HTMLUListElement = document.getElementById('taskList') as HTMLUListElement;
    const newTaskInput: HTMLInputElement = document.getElementById('newTask') as HTMLInputElement;
    const addTaskBtn: HTMLButtonElement = document.getElementById('addTaskBtn') as HTMLButtonElement;

    // Fetch tasks from API
    
    const fetchTasks = async (): Promise<string[]> => {
        const api = 'https://module3-api-is2m.onrender.com/random-todos';
        try {
            const response = await fetch(api);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetcheing task:", error);
            throw(error);
        }
    }

    // Displaying Tasks
    function displayTask(tasks: string[]): void {
        tasks.forEach((task) => {
            const taskItem = createTask(task);
            taskList.appendChild(taskItem);
        });
    }

    // Add task button function
    function createTask(task: string): HTMLLIElement {

        // Create Task
        const taskItem = document.createElement('li');
        taskItem.textContent = task;
        taskItem.classList.add("task-item");

        // Complete Button
        const completeButton = document.createElement('button');
        completeButton.innerText = 'Complete';
        completeButton.addEventListener('click', () => {
            completeTask(taskItem);
        });
        taskItem.appendChild(completeButton);

        // Remove Button
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', () => {
            removeTask(taskItem);
        });
        taskItem.appendChild(removeButton);

        return taskItem;
    }

    // Add Task Function & Validation
    function addTask () {
        const taskTitle: string = newTaskInput.value.trim();

        if (taskTitle === '') {
            alert('Task cannot be blank');
            return;
        }

        const taskItem = createTask(taskTitle);
        taskList.appendChild(taskItem);
        newTaskInput.value = '';
    }

    addTaskBtn.addEventListener("click", addTask);


    function completeTask(taskElement: any): void {
        taskElement.style.textDecoration = 'line-through';
        taskElement.style.backgroundColor = '#ddd'
        taskElement.querySelector('button').disabled = true;
    }

    function removeTask(taskId: any): void {
        taskList.removeChild(taskId);
    }

    // Fetch tasks from API
    fetchTasks()
        .then((tasks) => tasks.slice(0, 3))
        .then(displayTask)
        .catch(error => console.error("Error fetching and displaying task:", error));

});