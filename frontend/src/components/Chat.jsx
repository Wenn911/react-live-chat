/* eslint-disable no-param-reassign, react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { toast } from 'react-toastify';
import routes from '../routes.js';
import { setInitialState } from '../slices/channelsInfoSlice.js';
import { useAuth, useApi } from '../hooks';
import Channels from './Channels';
import Messages from './Messages';

function Chat() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const api = useApi();
  const { t } = useTranslation();

  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    let mounted = true;

    const fetchData = async () => {
      const url = routes.data();
      try {
        const res = await axios.get(url, { headers: auth.getAuthorizationHeader() });

        dispatch(setInitialState(res.data));

        api.auth = { token: auth.getToken() };

        if (mounted) {
          setContentLoaded(true);
        }
      } catch (e) {
        if (e.isAxiosError) {
          auth.logOut();
          return;
        }
        if (!e.isAxiosError) {
          toast.error(t('errors.unknown'));
        } else {
          toast.error(t('errors.networkErr'));
        }

        throw e;
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return contentLoaded ? (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </div>
  ) : (
    <Row className="align-items-center h-100">
      <Col className="text-center">
        <Spinner animation="grow" variant="primary" />
        <p>{t('texts.pleaseWait')}</p>
      </Col>
    </Row>
  );
}

export default Chat;
