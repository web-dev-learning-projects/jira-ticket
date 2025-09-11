const addBtn = document.getElementById("add-action-btn");
const addNoteModal = document.getElementById("addNoteModal");

addBtn.addEventListener("click", () => {
    addNoteModal.classList.remove('hidden');
});