import type { JwtResponse } from "../models/oauth_models";
import { TOKEN_EXPIRED_IN, TOKEN_ROLE, TOKEN_TOKEN } from "./constants";
import { getLocalStorage, getLocalStorageNumber, removeForLocalStorage, saveInlocalStorage, saveInlocalStorageNumber } from "./local_storage";

const getToken = (): string => {
    const token = getLocalStorage(TOKEN_TOKEN);
    const expiredIn = getLocalStorageNumber(TOKEN_EXPIRED_IN);

    if (!isNaN(expiredIn)) {
        const dateFromTimestamp = new Date(expiredIn * 1000); // Convertimos a milisegundos
        const today = new Date(); // Fecha actual
        if (dateFromTimestamp > today) {
            const tokenString = token ?? "";
            return tokenString;
        }
    }

    removeForLocalStorage(TOKEN_TOKEN);
    removeForLocalStorage(TOKEN_EXPIRED_IN);
    removeForLocalStorage(TOKEN_ROLE);
    return "";
};

const getRoleUser = (): string => {
    const roleToken = localStorage.getItem(TOKEN_ROLE);
    return roleToken ?? ""; // Devuelve una cadena vacía si es null
};

const saveDataUser = (jwtToken: JwtResponse) => {
    saveInlocalStorage(TOKEN_TOKEN, jwtToken.access_token);
    saveInlocalStorageNumber(TOKEN_EXPIRED_IN, jwtToken.expired_in);
    saveInlocalStorage(TOKEN_ROLE, jwtToken.role);
};

const logOutUser = () => {
    removeForLocalStorage(TOKEN_TOKEN);
    removeForLocalStorage(TOKEN_EXPIRED_IN);
    removeForLocalStorage(TOKEN_ROLE);
};

export { getToken, getRoleUser, logOutUser, saveDataUser };
