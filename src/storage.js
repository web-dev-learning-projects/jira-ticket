export function saveTickets(tickets){
    localStorage.setItem("tickets", JSON.stringify(tickets));
}

export function loadTickets(){
    return localStorage.getItem("tickets") || JSON.stringify([]);
}