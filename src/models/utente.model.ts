
export class Utente {
    
    public key: number = 0;
    public nome: string = "";
    public cognome: string = "";
    public voto: number = 0;
    
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.key = (typeof obj.key === "number") ? obj.key : this.key;
            this.nome = obj.nome || this.nome;
            this.cognome = obj.cognome|| this.cognome;
        }
    }
    
}
