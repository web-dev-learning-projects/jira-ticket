import {addNewNote, } from "./tickets.js"

export function setupUI(){
    const addBtn = document.getElementById("add-action-btn");
    const addNoteModal = document.getElementById("addNoteModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const closeModalFooterBtn = document.getElementById("closeNoteModal");
    const addNewNoteBtn = document.getElementById("addNewNoteBtn");

    // modal fields 
    const noteModalContent = document.getElementById("new-ticket-text");
    const noteModalTitle = document.getElementById("new-note-title");
    const noteModalColor = document.getElementById("new-note-color");

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

    const modalPriorityColor = Array.from(addNoteModal.querySelectorAll('.modal-content > .priority-btns > .toolbox-priority-color'));
    modalPriorityColor.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            modalPriorityColor.forEach((ele) => {
                ele.classList.remove('selected');
            })
            e.target.classList.add('selected');
        });
    });
}