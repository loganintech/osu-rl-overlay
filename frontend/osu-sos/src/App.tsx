import React, {useEffect, useState} from 'react';
import './App.css';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {SOSEvent} from "./events";

function App() {
    const [socketUrl, setSocketUrl] = useState('ws://localhost:49122');

    const {
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);

    useEffect(() => {
        if (!lastMessage)
            return
        // const event = lastMessage.data as SOSEvent


        const event = JSON.parse(lastMessage.data) as SOSEvent
        switch (event.event) {
            case "game:update_state":
                break
            case "sos:version":
                break
            case "game:ball_hit":
                break
            case "game:clock_stopped":
                break
            default:
                console.log("IDK", event)
        }


    }, [lastMessage])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <>Frontend - {connectionStatus}</>
    );
}

export default App;
