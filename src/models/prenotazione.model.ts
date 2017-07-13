import {Utente} from '../models/utente.model';
import {Materia} from '../models/materia.model';
import {Ripetizione} from '../models/ripetizione.model';
import {Categoria} from '../models/categoria.model';


export class Prenotazione {
    
    public key: number = 0;
    public descrizione: string = "";
    public recensione: string = "";
    public stato: number = 0;
    public voto: number = 0;
    public data: string = "";
    public studente_key: number = 0;
    public studente: Utente = null;
    public categoria_key : number = 0;
    public categoria : Categoria = null;
    public materia_key : number = 0;
    public materia : Materia;
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.key = (typeof obj.key === "number") ? obj.key : this.key;
            this.descrizione = obj.descrizione || this.descrizione;
            this.categoria_key = (typeof obj.categoria_key === "number") ? obj.categoria_key : this.categoria_key;
            this.stato = (typeof obj.stato === "number") ? obj.stato : this.stato;
            this.data = obj.data || this.data;
            this.studente_key = (typeof obj.studente_key === "number") ? obj.studente_key : this.studente_key;
            this.studente =  obj.studente || this.studente;
            this.materia_key = (typeof obj.materia_key === "number") ? obj.materia_key : this.materia_key;
            this.materia = obj.materia || this.materia;
            this.categoria_key = (typeof obj.categoria_key === "number") ? obj.categoria_key : this.categoria_key;
            this.categoria = obj.categoria || this.categoria;
            this.voto = (typeof obj.voto === "number") ? obj.voto : this.voto;
            this.recensione = obj.recensione || this.recensione;
        }
    }
    
}