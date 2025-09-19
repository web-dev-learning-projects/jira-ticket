import { uid } from "./utils.js";
import { loadTickets, saveTickets } from "./storage.js";


export function showTickets(){
    const noteCardsContainer = document.getElementById("note-card-container");
    noteCardsContainer.innerHTML = "";
    
    let tickets = loadTickets();
    Object.values(tickets).forEach(({id, color, title, content}) => {
            const noteCard = document.createElement("div");
            noteCard.setAttribute("id", id);
            noteCard.setAttribute("class", "note-card card");
            let noteCardInnerHtml = `
        <button type="button" class="deleteBtn hidden" id="noteDeleteBtn-${id}">
            <i class="fa-solid fa-trash"></i>
        <button>
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
            <button class="btn" id="editBtn-${id}"><i class="fa-solid fa-lock"></i></button>
        </div>`;
            noteCard.innerHTML = noteCardInnerHtml;
            noteCard.querySelector(`#editBtn-${id}`).addEventListener("click", () => {editCard(noteCard, id);});
            noteCard.querySelector(`#noteDeleteBtn-${id}`).addEventListener("click", () => {removeNote(tickets, id)});
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
        card.querySelector(".noteContentText").readOnly = false;
        card.querySelector(".deleteBtn").classList.remove("hidden");
    }else{
        console.log("unlocked")
        editBtn.innerHTML = `<i class="fa-solid fa-lock"></i>`;
        card.querySelector(".noteContentText").readOnly = true;
        card.querySelector(".deleteBtn").classList.add("hidden");
    }
}

export function addNewNote(tickets, noteColor, noteTitle, noteContent){
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