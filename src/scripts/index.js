import '../styles/index.scss';

$ = selector => document.querySelector(selector);

window.onload = () => {

    const taskField = $('#inputField');
    // const addTaskBtn = $('#addNoteBtn');
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
        col.className = 'col-sm-3';

        let singleTask = document.createElement('div');
        singleTask.className = 'single-task d-flex';

        let pDiv = document.createElement('p');
        pDiv.innerHTML = task;
        singleTask.appendChild(pDiv);

        let span = document.createElement('span');
        span.innerHTML = '<i class="far fa-window-close"></i>';
        span.style.color = '#fff';
        span.style.marginLeft = 'auto';
        span.style.paddingLeft = '3px';
        span.style.cursor = 'pointer'

        singleTask.appendChild(span);

        let taskController =   createTaskController(singleTask);
        taskController.style.visibility = 'hidden';
        singleTask.appendChild(taskController);

        singleTask.onmouseenter = () => taskController.style.visibility = 'visible';
        singleTask.onmouseleave = () => taskController.style.visibility = 'hidden';


        col.appendChild(singleTask);
        allTaskParent.appendChild(col);
        
        // Delete Col by Span X
        span.addEventListener('click', () => {
            allTaskParent.removeChild(col);
        });

    }

    function createTaskController(singleTask) {

        let controlPanel = document.createElement('div');
        controlPanel.className = 'task-control-panel d-flex align-items-center';

        let colorPalte = createColorPalte(singleTask);
        controlPanel.appendChild(colorPalte); 

        let editBtn = createEditBtn(singleTask);
        controlPanel.appendChild(editBtn);

        return controlPanel;
    }

    function createColorPalte(singleTask) {
        let colors = ['palegreen', 'blue', 'yellow', 'purple', 'orange', 'gray'];

        let colorDiv = document.createElement('div');
        colorDiv.className = 'd-flex';

        colors.forEach(color => {
            let div = document.createElement('div');
            div.className = 'color-circle ml-2';
            div.style.background = color;
            div.addEventListener('click', () => {
                singleTask.style.background = color;
            })
            colorDiv.appendChild(div);  
        });
        return colorDiv;
    }

    function createEditBtn(singleTask) {

        let editSpan = document.createElement('span');
        editSpan.className = 'ml-auto mr-2';
        editSpan.innerHTML = '<i class="far fa-edit"></i>';

        editSpan.addEventListener('click', () => {
            
            let pTag = singleTask.querySelector('p');
            let textArea = document.createElement('textarea');
            textArea.className = 'inner-textarea';
            textArea.style.height = singleTask.offsetHeight + 'px';
            textArea.style.width = singleTask.offsetWidth + 'px';
            textArea.innerHTML = pTag.innerHTML;

            textArea.addEventListener('keypress', function(event) {

                if(event.keyCode === 13) {
                    event.stopPropagation();

                    if(textArea.value) { // here this.value means textArea.value
                        pTag.innerHTML = this.value;
                        singleTask.removeChild(this); // here this means textArea
                    }
                    else {
                        alert("please write someting");
                    }
                }
            })

            singleTask.appendChild(textArea);
            
        })

        return editSpan;

    }
}