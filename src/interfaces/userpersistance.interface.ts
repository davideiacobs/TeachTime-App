
export interface UserPersistanceInterface {
    
    save(user: string): Promise<any>;
    
    get(): Promise<any>;
    
    remove(): Promise<any>;
    
}