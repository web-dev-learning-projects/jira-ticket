import { loadTickets } from "./storage.js";
import { showTickets } from "./tickets.js";
import { setupUI } from "./ui.js";

(() => {
    const tickets = JSON.parse(loadTickets());
    setupUI(tickets);
    showTickets();
})();