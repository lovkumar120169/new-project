export const getDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("users-data")) || [];
}


export const setDataToLocalStorage = (data) => {
    let existingData = getDataFromLocalStorage();

    localStorage.setItem("users-data", JSON.stringify([...existingData, data]));
}

export const setLoginStatus = (status) => {
    localStorage.setItem("login-status", JSON.stringify(status));
}

export const getLoginStatus = () => {
    return JSON.parse(localStorage.getItem('login-status'));
}