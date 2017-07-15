

export class Feedback {

    public recensione: string = "";
    public voto: number = -1;
  
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.voto = (typeof obj.voto === "number") ? obj.voto : this.voto;
            this.recensione = obj.recensione || this.recensione;
        }
    }
    
}
