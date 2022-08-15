import { apiContext } from "./index";
import React, {useEffect} from 'react';
import store from "../store";
import {addMessage} from "../slices/messagesInfoSlice";
import {addChannel, removeChannel, renameChannel} from "../slices/channelsInfoSlice";

const ChatApiProvider = ({socket, children}) => {

    useEffect(() => {
        socket.on('newMessage', (message) => {
            store.dispatch(addMessage({ message }));
        });

        socket.on('newChannel', (channel) => {
            store.dispatch(addChannel({ channel }));
        });

        socket.on('removeChannel', ({ id }) => {
            store.dispatch(removeChannel({ id }));
        });

        socket.on('renameChannel', ({ id, name }) => {
            store.dispatch(renameChannel({ id, name }));
        });
    }, [socket]);


    const newChannel = (channel, cb) => {
        socket.emit('newChannel', channel, ({status}) => {
            if (status === 'ok') {
                cb()
            }
        })
    }

    const deleteChannel = (channel, cb) => {
        socket.emit('removeChannel', channel, ({status}) => {
            if (status === 'ok') {
                cb()
            }
        })
    }

    const reNameChannel = (channel, cb) => {
        socket.emit('renameChannel', channel, ({status}) => {
            if (status === 'ok') {
                cb()
            }
        })
    }

    const newMessage = (message, cb) => {
        socket.emit('newMessage', message, ({status}) => {
            if (status === 'ok') {
                cb()
            }
        })
    }


    return (
        <apiContext.Provider value={{newMessage, newChannel, deleteChannel, reNameChannel}}>
            {children}
        </apiContext.Provider>
    );
};
export default ChatApiProvider