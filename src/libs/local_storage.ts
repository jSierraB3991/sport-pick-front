const getLocalStorageNumber = (keyLocal: string): number => {
    const dataLocal = getLocalStorage(keyLocal);
    if (dataLocal === "") {
        return 0;
    }
    const parsedNumber = Number(dataLocal);
    if (isNaN(parsedNumber)) {
        console.warn(`Value for key "${keyLocal}" is not a valid number.`);
        return 0;
    }
    return parsedNumber;
};

const getLocalStorage = (dataStorage: string): string => {
    const dataReturn = localStorage.getItem(dataStorage)
    return dataReturn ?? ""; // Devuelve una cadena vacía si es null
}

const saveInlocalStorageNumber = (keyData: string, value: Number) => {
    saveInlocalStorage(keyData, value.toString())
}
const saveInlocalStorage = (keyData: string, value: string) => {
    localStorage.setItem(keyData, value)
}

const removeForLocalStorage = (keyData : string) => {
    localStorage.removeItem(keyData);
}

const saveJsonInLocalStorage = (key: string, value: object) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getJsonFromLocalStorage = <T = any>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
        return JSON.parse(item) as T;
    } catch {
        console.warn(`Value for key "${key}" is not valid JSON.`);
        return null;
    }
}


export {  getLocalStorage, saveInlocalStorageNumber, 
         saveInlocalStorage, getLocalStorageNumber, removeForLocalStorage, saveJsonInLocalStorage,
         getJsonFromLocalStorage };