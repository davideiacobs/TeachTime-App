import {Utente} from '../models/utente.model';



export class Ripetizione {
    
    public key: number = 0;
    public luogoIncontro: string = "";
    public costo: number = 0;
    public descr: string = "";
    public città: string = "";
    public tutor_key: number = 0;
    public tutor: Utente = null;
    public categoria_key : number = 0;
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.key = (typeof obj.key === "number") ? obj.key : this.key;
            this.luogoIncontro = obj.luogoIncontro || this.luogoIncontro;
            this.categoria_key = (typeof obj.categoria_key === "number") ? obj.categoria_key : this.categoria_key;
            this.costo = (typeof obj.costo === "number") ? obj.costo : this.costo;
            this.descr = obj.descr || this.descr;
            this.città = obj.città || this.città;
            this.tutor_key = (typeof obj.tutor_key === "number") ? obj.tutor_key : this.tutor_key;
            this.tutor =  obj.tutor || this.tutor;
            
        }
    }
    
}