


export class Sessione {
    
    public utente_key: number = 0;
    public token: string = "";
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.utente_key = (typeof obj.utente_key === "number") ? obj.utente_key : this.utente_key;
            this.token = obj.token || this.token;
        }
    }
    
}