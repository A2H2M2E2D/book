// LOCAL STORAGE 

export const setAuthUser = (data) => {
    // save object to the local storage 
    // stringify object to text 
    localStorage.setItem("user",JSON.stringify(data));
};

export const getAuthUser = (data) => {
    // get object from the local storage 
    // parse object to text 
    if(localStorage.getItem("user")){
        return JSON.parse(localStorage.getItem("user"));
    }
};

export const removeAuthUser = () => {
    if(localStorage.getItem("user")) localStorage.removeItem("user");
};