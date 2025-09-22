export function saveTickets(tickets){
    try{
        localStorage.setItem("tickets", JSON.stringify(tickets));
        return true;
    }catch(error){
        console.error(`Error: Couldn't save tickets [${error.message}]`);
    }
    return false;
}

export function loadTickets(){
    try{
        const data = localStorage.getItem("tickets"); 
        return data ? JSON.parse(data) : {};
    }catch(error){
        console.error(`Error: Couldn't load tickets [${error.message}]`);
    }
    return {};
}


