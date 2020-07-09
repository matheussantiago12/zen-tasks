$("document").ready(function () {
    data.map((task) => {
        $(`.${task.category}`).append(`
            <a href="task-details.html">
                <div
                    id="${task.id}"
                    class="task" 
                    draggable="true"
                    ondragstart='onDragStart(event);'
                > 
                    <span class="task-id">#${task.id}</span>
                    <h2>${task.title}</h2>
                    <span class="task-time">${task.time}h</span>
                    ${task.priority ? "<i class='fas fa-flag'></i>" : ""}
                </div>
            </a>
        `);
    });

    $(".task-category").append(`
        <button class="new"><i class="fas fa-plus"></i> Add new Card</button>
    `);

    $(".new").click(() => {
        swal({
            text: 'Título da tarefa:',
            content: "input",
            button: {
              text: "Próximo",
            }
        }).then(() => {
            swal({
                text: 'Descrição da tarefa:',
                content: "input",
                button: {
                  text: "Próximo",
                }
            }).then(() => {
                swal({
                    text: 'Quantidade de horas:',
                    content: "input",
                    button: {
                        text: "Próximo",
                    }
                }).then(() => {
                    swal({
                        text: 'Tarefa criada com sucesso!',
                        icon: 'success',
                    });
                });
            });
        });
    });
});

function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event
        .dataTransfer
        .getData('text');

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    const newButton = document.querySelector(".new");

    dropzone.appendChild(draggableElement);

    event
        .dataTransfer
        .clearData();

    replaceNewButton();
}

function replaceNewButton() {
    $(".new").remove();
    $(".task-category").append(`
        <button class="new"><i class="fas fa-plus"></i> Add new Card</button>
    `);
}
