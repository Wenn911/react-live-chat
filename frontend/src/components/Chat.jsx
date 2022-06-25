import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import routes from '../routes';


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
    const { t } = useTranslation();
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const url = routes.data();

            try {
               const res = await axios.get(url, { headers: getAuthorizationHeader() });
                //dispatch
                //socket.auth

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
    
  return (
    <div>Chat</div>
  )
}

export default Chat