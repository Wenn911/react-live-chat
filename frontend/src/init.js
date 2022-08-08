// @ts-check
import 'core-js/stable/index.js';
import React from "react";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import leoProfanity from 'leo-profanity';
import resources from './locales/resources.js';
import store from './store.js';
import { addMessage } from './slices/messagesInfoSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsInfoSlice.js';
import App from './components/App.jsx';

const init = async (socketClient = io()) => {
  const i18nInstance = i18n.createInstance();
  const lng = 'ru';

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng,
    });

  const socket = socketClient;

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

  return (
    <Provider store={store}>
      <App socket={socket} />
    </Provider>
  );
};

export default init;
