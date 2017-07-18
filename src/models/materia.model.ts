
export class Materia {
    
    public key: number = 0;
    public nome: string = "";
    public categoria_key: number = 0;
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.key = (typeof obj.key === "number") ? obj.key : this.key;
            this.nome = obj.nome || this.nome;
            this.categoria_key = (typeof obj.categoria_key === "number") ? obj.categoria_key : this.categoria_key;
        }
    }
    
}