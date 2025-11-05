import { TENAT_APP_KEY } from "../libs/constants";

const apiWs = "ws://localhost:1323";

const getLiveMatchsApiWs = (): WebSocket => {
    const ws = new WebSocket(apiWs + "/public/bet/data/ws/?tenat_id=" + TENAT_APP_KEY);
    return ws;
};

export { getLiveMatchsApiWs };
