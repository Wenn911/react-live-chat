import React from 'react';
import {useTranslation} from "react-i18next";
import {Navbar, Nav, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks";

// const AuthSection = () => {
//     const auth = useAuth();
//     const { t } = useTranslation();
//
//     const renderSection = () => {
//         if (auth.loggedIn) {
//             return (
//                 <>
//                     <Navbar.Text>
//                         {localStorage.getItem('username')}
//                         &nbsp;
//                         |
//                     </Navbar.Text>
//                     <Nav.Link onClick={auth.logOut}>{t('buttons.logOut')}</Nav.Link>
//                 </>
//             );
//         }
//         return <Nav.Link as={Link} to='/login'>{t('buttons.logIn')}</Nav.Link>
//     };
//
//     return (
//         <Navbar.Collapse>
//             {renderSection()}
//         </Navbar.Collapse>
//     );
// };

// possible nice idea with nicknames near logout button

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
