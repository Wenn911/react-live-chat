import React from 'react';
import {useTranslation} from "react-i18next";
import {Navbar, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks";

<<<<<<< HEAD

=======
>>>>>>> 12184e1 (refact)
const AppNavbar = () => {
    const auth = useAuth()
    const { t } = useTranslation();
    return (
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <Navbar.Brand as={Link} to='/'>{t('navbar.title')}</Navbar.Brand>
                <Button type="button" className="btn btn-primary" onClick={auth.logOut}>{t('buttons.logOut')}</Button>
            </div>
        </Navbar>
    );
};

export default AppNavbar;
