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
        <button type="button" class="deleteBtn hidden"><i class="fa-solid fa-trash"></i><button>
        <div class="card-header">                
            <div class="card-color ${color}"></div>
            <h3 class="card-title">${title}</h3>
        </div>
        <div class="card-body">
            <textarea name="noteText" rows="10" class="noteContentText" readOnly>${content}</textarea>
        </div>
        <div class="card-footer">
            <div class="priority-color-edit-container">
                <div class="lightblue   card-priority-color ${color=='lightblue' ? 'selected': ''}"></div>
                <div class="lightgreen  card-priority-color ${color=='lightgreen' ? 'selected': ''}"></div>
                <div class="lightyellow card-priority-color ${color=='lightyellow' ? 'selected': ''}"></div>
                <div class="lightred    card-priority-color ${color=='lightred' ? 'selected': ''}"></div>
            </div>
            <button class="btn" id="editBtn"><i class="fa-solid fa-lock"></i></button>
        </div>`;
            noteCard.innerHTML = noteCardInnerHtml;
            noteCard.querySelector("#editBtn").addEventListener("click", () => {editCard(noteCard);})
            noteCardsContainer.appendChild(noteCard);
        }
    )
}


function editCard(card){
    // first
    const editBtn = card.querySelector("#editBtn");
    if(editBtn.querySelector(".fa-lock")){
        editBtn.innerHTML = `<i class="fa-solid fa-lock-open"></i>`;
        card.querySelector(".noteContentText").readOnly = false;
        card.querySelector(".deleteBtn").classList.remove("hidden");
    }else{
        console.log("unlocked")
        editBtn.innerHTML = `<i class="fa-solid fa-lock"></i>`;
        card.querySelector(".noteContentText").readOnly = true;
        card.querySelector(".deleteBtn").classList.add("hidden");
    }
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