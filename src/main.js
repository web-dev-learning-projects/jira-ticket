import { loadTickets } from "./storage.js";
import { showTickets } from "./tickets.js";
import { setupUI } from "./ui.js";

(() => {
    const tickets = loadTickets();
    setupUI(tickets);
    showTickets();
})();