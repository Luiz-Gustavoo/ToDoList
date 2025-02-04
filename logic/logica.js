let tarefas = []; 

document.getElementById("addTaskButton").addEventListener("click", function() {
    const taskInput = document.getElementById("inputTarefa");
    const taskText = taskInput.value.trim();

    if (taskText) {
        const newTask = {
            text: taskText,
            completed: false
        };
        tarefas.push(newTask); 
        renderizarTarefas(); 
        taskInput.value = ''; 
    } else {
        alert("Digite a tarefa");
    }
});


function renderizarTarefas(filter = 'all') {
    const taskList = document.getElementById("itemLista");
    taskList.innerHTML = ''; 

    tarefas.forEach((task, index) => {
        if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed)) {
            const newTask = document.createElement("li");
            const nomeTarefa = document.createElement('span');
            nomeTarefa.textContent = task.text;

            if (task.completed) {
                newTask.classList.add('completed'); 
            }

            const botaoConcluir = document.createElement("button");
            botaoConcluir.textContent = "Concluir";
            botaoConcluir.id = "botaoConcluir";
            botaoConcluir.addEventListener('click', function() {
                task.completed = !task.completed; 
                renderizarTarefas(filter); 
            });

            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover';
            botaoRemover.id = "botaoRemover";
            botaoRemover.addEventListener('click', function() {
                tarefas.splice(index, 1); 
                renderizarTarefas(filter); 
            });

            newTask.appendChild(nomeTarefa);
            newTask.appendChild(botaoConcluir);
            newTask.appendChild(botaoRemover);
            taskList.appendChild(newTask);
        }
    });
}


document.getElementById("filtrarTodas").addEventListener("click", function() {
    renderizarTarefas('all');
});

document.getElementById("filtrarPendentes").addEventListener("click", function() {
    renderizarTarefas('pending');
});

document.getElementById("filtrarConcluidas").addEventListener("click", function() {
    renderizarTarefas('completed');
});