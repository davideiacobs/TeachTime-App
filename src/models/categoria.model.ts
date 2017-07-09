


export class Categoria {
    
    public key: number = 0;
    public nome: string = "";
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.key = (typeof obj.key === "number") ? obj.key : this.key;
            this.nome = obj.nome || this.nome;
        }
    }
    
}