
export class Utente {
    
    public key: number = 0;
    public nome: string = "";
    public cognome: string = "";
    public voto: number;
    public titoloDiStudi : string = "";
    public città : string = "";
    public dataDiNascita : Date = null;
    public telefono : string = "";
    public pwd : string = "";
    public email : string = "";
    public imgProfilo : string = "";
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.key = (typeof obj.key === "number") ? obj.key : this.key;
            this.nome = obj.nome || this.nome;
            this.cognome = obj.cognome|| this.cognome;
            this.titoloDiStudi = obj.titoloDiStudi || this.titoloDiStudi;
            this.città = obj.città || this.città || obj.citta;
            this.dataDiNascita = obj.dataDiNascita || this.dataDiNascita;
            this.telefono = obj.telefono || this.telefono;
            this.pwd = obj.pwd || this.pwd;
            this.email = obj.email || this.email; 
            this.imgProfilo = obj.imgProfilo || this.imgProfilo;
        }
    }
    
}
