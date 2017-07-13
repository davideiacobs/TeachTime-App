export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'rest/' : 'http://localhost:8091/teachTime/MainApplication/rest/';

export const URL = {
    /*USERS: {
        SIGNUP: "users/",
        LOGIN: "login/",
        LOGOUT: "logout/",
        UPDATE: "users/"
    },*/
    
    CATEGORIES: {
       
        GETALL: "categories/"
    }
    
}
export const STORAGE_KEYS = {
    USER: "teachtime_user"
 
}
