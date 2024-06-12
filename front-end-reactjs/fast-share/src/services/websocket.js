// websocket.js
const API_URL = process.env.REACT_APP_API_URL;
const API_ROOT = process.env.REACT_APP_API_ROOT;

const createWebSocketConnection = (code, toggleTransferSuccessCard) => {
    const socket = new WebSocket(
        `ws://${API_URL}${API_ROOT}/ws/download_status/${code}/`
    );

    socket.onopen = () => {
        console.log("WebSocket is connected.");
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        console.log(data);
        // handle incoming data
        if (data.message === "file_downloaded") {
            toggleTransferSuccessCard(true);
        }
    };

    socket.onerror = (error) => {
        console.log(`WebSocket error: ${error}`);
    };

    socket.onclose = () => {
        console.log("WebSocket is closed.");
    };

    return socket;
};

export default createWebSocketConnection;
