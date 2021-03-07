import '../styles/index.scss';

$ = selector => document.querySelector(selector);

window.onload = () => {

    const taskField = $('#inputField');
    const addTaskBtn = $('#addNoteBtn');
    const allTaskParent = $('#allTask');

    taskField.addEventListener('keypress', (event) => {
        if(event.keyCode === 13) {
            // console.log(event.target.value);
            cerateNewTask(event.target.value, allTaskParent);
            event.target.value = '';  
        }
    });

    function cerateNewTask(task, allTaskParent) {
        let col = document.createElement('div');
        col.className = 'col-sm-3 d-flex';

        let singleTask = document.createElement('div');
        singleTask.className = 'single-task';

        let pDiv = document.createElement('p');
        pDiv.innerHTML = task;

        let span = document.createElement('span');
        span.innerHTML = 'X';
        span.style.color = 'red';
        span.style.marginLeft = 'auto';
        span.style.cursor = 'pointer'

        pDiv.appendChild(span);
        singleTask.appendChild(pDiv);
        col.appendChild(singleTask);
        allTaskParent.appendChild(col);
        
        // Delete Col by Span X
        span.addEventListener('click', () => {
            allTaskParent.removeChild(col);
        });

    }
}