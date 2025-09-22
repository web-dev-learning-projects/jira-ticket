import { uid } from "./utils.js";
import { loadTickets, saveTickets } from "./storage.js";


let tickets = loadTickets();

export function showTickets(){
    const noteCardsContainer = document.getElementById("note-card-container");
    const emptyState = document.getElementById("empty-state");
    noteCardsContainer.innerHTML = "";
    if (!tickets || Object.keys(tickets).length === 0) {
        emptyState.classList.remove("hidden");
        container.classList.add("hidden");
        return;
    }
    emptyState.classList.add("hidden");
    noteCardsContainer.classList.remove("hidden");
    Object.values(tickets).forEach(({id, color, title, content}) => {
            const noteCard = document.createElement("div");
            noteCard.setAttribute("id", id);
            noteCard.setAttribute("class", "note-card card close");
            let noteCardInnerHtml = `
        <div class="card-header">                
            <div class="card-color ${color}" id="priority-${id}"></div>
            <input class="card-title" type="text" readonly value="${title}" id="title-${id}"/>
            <button type="button" class="deleteBtn hidden" id="noteDeleteBtn-${id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="card-body">
            <textarea name="noteText" rows="10" class="noteContentText" id="text-${id}" readOnly>${content}</textarea>
        </div>
        <div class="card-footer">
            <div class="priority-color-edit-container">
                <div class="lightblue   card-priority-color ${color=='lightblue' ? 'selected': ''}"></div>
                <div class="lightgreen  card-priority-color ${color=='lightgreen' ? 'selected': ''}"></div>
                <div class="lightyellow card-priority-color ${color=='lightyellow' ? 'selected': ''}"></div>
                <div class="lightred    card-priority-color ${color=='lightred' ? 'selected': ''}"></div>
            </div>
            <button class="btn" id="editBtn-${id}"><i class="fa-solid fa-lock"></i></button>
        </div>`;
            noteCard.innerHTML = noteCardInnerHtml;
            noteCard.querySelector(`#editBtn-${id}`).addEventListener("click", () => {editCard(noteCard, id);});
            noteCard.querySelector(`#noteDeleteBtn-${id}`).addEventListener("click", () => {removeNote(tickets, id)});
            const priorityBtns = Array.from(noteCard.querySelectorAll(`.card-footer .priority-color-edit-container .card-priority-color`));
            priorityBtns.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    if(noteCard.classList.contains("open")){
                        priorityBtns.forEach((ele) => {
                            ele.classList.remove('selected');
                        });
                        e.target.classList.add('selected');
                        noteCard.querySelector(`#priority-${id}`).classList.remove(noteCard.querySelector(`#priority-${id}`).classList[1]);
                        noteCard.querySelector(`#priority-${id}`).classList.add(e.target.classList[0]);
                    }
                });
            });

            noteCardsContainer.appendChild(noteCard);
        }
    )
}

function removeNote(tickets, id){
    if(tickets[id]){
        delete tickets[id];
        saveTickets(tickets);
    }
    showTickets();
}

function editCard(card, id){
    // first
    const editBtn = card.querySelector(`#editBtn-${id}`);
    if(editBtn.querySelector(".fa-lock")){
        editBtn.innerHTML = `<i class="fa-solid fa-lock-open"></i>`;
        card.classList.remove("close");
        card.classList.add("open");
        card.querySelector(".noteContentText").readOnly = false;
        card.querySelector(".card-title").readOnly = false;
        card.querySelector(".deleteBtn").classList.remove("hidden");
    }else{
        card.classList.remove("open");
        card.classList.add("close");
        editBtn.innerHTML = `<i class="fa-solid fa-lock"></i>`;
        card.querySelector(".noteContentText").readOnly = true;
        card.querySelector(".card-title").readOnly = true;
        card.querySelector(".deleteBtn").classList.add("hidden");

        // save the content of fields in
        tickets[id].color =  card.querySelector(`#priority-${id}`).classList[1];
        tickets[id].title =  card.querySelector(".card-title").value;
        tickets[id].content = card.querySelector(".noteContentText").value;  
        saveTickets(tickets);
    }
}

export function addNewNote(noteColor, noteTitle, noteContent){
    let ticket_id = uid();
    const ticket = {
        "id": ticket_id,
        "color": noteColor,
        "title": noteTitle,
        "content": noteContent,
    }
    tickets[ticket_id] = ticket;
    saveTickets(tickets);
    showTickets();
}