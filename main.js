const addBtn = document.getElementById("add-action-btn");
const addNoteModal = document.getElementById("addNoteModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeModalFooterBtn = document.getElementById("closeNoteModal");
const addNewNoteBtn = document.getElementById("addNewNoteBtn");
const noteCardsContainer = document.getElementById("note-card-container");

// modal fields 
const noteModalContent = document.getElementById("new-ticket-text");
const noteModalTitle = document.getElementById("new-note-title");
const noteModalColor = document.getElementById("new-note-color");

const uid = new ShortUniqueId({ length: 5 });

const tickets = [];

// Modal close and open
addBtn.addEventListener("click", () => {
    addNoteModal.classList.remove('hidden');
});

closeModalBtn.addEventListener("click", () => {
    addNoteModal.classList.add('hidden');
})

closeModalFooterBtn.addEventListener("click", () => {
    addNoteModal.classList.add('hidden');
})

addNewNoteBtn.addEventListener("click", () =>{
    let noteColor = addNoteModal.querySelector('.modal-content > .priority-btns > .toolbox-priority-color.selected').classList[0];
    let noteTitle = noteModalTitle.value;
    let noteContent = noteModalContent.value;
    if(noteTitle !== "" && noteContent !== ""){
        addNewNote(noteColor, noteTitle, noteContent);
    }
    noteModalTitle.value = "";
    noteModalContent.value = "";
    addNoteModal.classList.add('hidden');
})

function addNewNote(noteColor, noteTitle, noteContent){
    const ticket = {
        "color": noteColor,
        "title": noteTitle,
        "content": noteContent,
    }
    const id = uid.rnd();
    tickets.push(ticket);
    localStorage.setItem("jira-tickets", JSON.stringify(tickets));
    showTickets();
}

function showTickets(){
    noteCardsContainer.innerHTML = "";
    let allTickets = localStorage.getItem("jira-tickets");
    allTickets = JSON.parse(allTickets);
    allTickets.forEach(({color, title, content}) => {
            console.log()
            const noteCard = document.createElement("div");
            noteCard.setAttribute("class", "note-card card");
            let noteCardInnerHtml = `
        <div class="card-header">                
            <div class="card-color ${color}"></div>
            <h3 class="card-title">${title}</h3>
        </div>
        <div class="card-body">
            <textarea name="noteText" id="noteText" rows="10" class="noteContentText">${content}</textarea>
        </div>
        <div class="card-footer">
            <button class="btn"><i class="fa-solid fa-lock"></i></button>
            <button class="btn"><i class="fa-solid fa-lock-open"></i></button>
        </div>`;
            noteCard.innerHTML = noteCardInnerHtml;
            noteCardsContainer.appendChild(noteCard);
        }
    )
}

function removeNote(){

}


const modalPriorityColor = Array.from(addNoteModal.querySelectorAll('.modal-content > .priority-btns > .toolbox-priority-color'));
modalPriorityColor.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        modalPriorityColor.forEach((ele) => {
            ele.classList.remove('selected');
        })
        e.target.classList.add('selected');
    });
});

showTickets();