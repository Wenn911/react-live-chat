// @ts-check
import 'core-js/stable/index.js';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from './locales/resources.js'
import { io } from 'socket.io-client';
import store from './store.js';
import { addMessage } from './slices/messagesInfoSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsInfoSlice.js';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import leoProfanity from "leo-profanity";
import Rollbar from "rollbar";
import { Provider as ProviderRollbar } from '@rollbar/react';

const init = async (socketClient = io()) => {
  const i18nInstance = i18n.createInstance();
  const lng = 'ru';
  const isProduction = process.env.NODE_ENV === 'production';

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  await i18nInstance
  .use(initReactI18next)
  .init({
    resources,
    lng: lng,
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

  const rollbarConfig = {
      enabled: isProduction,
      accessToken: process.env.ROLLBAR_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
    };

  const rollbar = new Rollbar(rollbarConfig);

  return (
      <ProviderRollbar instance={rollbar}>
    <Provider store={store}>
      <App socket={socket} />
    </Provider>
      </ProviderRollbar>
  )
}

export default init;