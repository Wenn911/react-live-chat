import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useAuth, useSocket } from '../hooks';
import routes from '../routes';
import { useDispatch } from 'react-redux'
import { setInitialState } from '../slices/channelsSlice';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Channels } from './Channels'

const getToken = () => localStorage.getItem('token');

const getAuthorizationHeader = () => {
    const token = getToken();

    if (token) {
        return { Authorization: `Bearer: ${token}` };
    }

    return {};
}

const Chat = () => {
    const auth = useAuth();
    const socket = useSocket()
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const url = routes.data();

            try {
               const res = await axios.get(url, { headers: getAuthorizationHeader() });
                dispatch(setInitialState(res.data));
                socket.auth = { token: getToken() };

                if (mounted) {
                    setContentLoaded(true);
                }
            } catch (e) {
                if (e.isAxiosError) {
                    auth.logOut();
                    return;
                }
                throw e;
            }
        };
        fetchData()
    
      return () => {
        mounted = true;
      }
    }, [])
    
  return contentLoaded ? (
    <Row className='flex-grow-1 h-75 pb-3'>
      <Channels />
      {/* <Messages />  */}
    </Row>
  ) : (
    <Row className='align-items-center h-100'>
      <Col className='text-center'>
        <Spinner animation="grow" variant="primary" />
        <p>{t('texts.pleasewait')}</p>
      </Col>
    </Row>
  )
}

export default Chat