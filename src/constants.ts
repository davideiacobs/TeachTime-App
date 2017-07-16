export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'rest/' : 'http://localhost:8080/teachTime/MainApplication/rest/';

export const MY_URL_BASE = "http://192.168.1.5:8080/teachTime/MainApplication/rest/";


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
