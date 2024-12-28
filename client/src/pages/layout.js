import { React, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { useData } from '../providers/dataProvider';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../providers/themeProvider';

export default function Layout() {
    const { theme, toggleTheme } = useTheme();
    const { users, logIn, logOut, loggedInUser } = useData();
    const [showDropdown, setShowDropdown] = useState(false);

    const { t, i18n } = useTranslation();

    const handleSelectUser = (userId) => {
        logIn(userId);
        setShowDropdown(false);
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const footerStyle = `bg-${theme.bg} ${theme.text} text-center py-3 mt-auto`
    const mainStyle = `flex-grow-1 bg-${theme.bgInv} ${theme.textInv}`

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar bg={theme.bg} variant={theme.variant} expand="lg" className="mb-4 p-2">
                <div className="container d-flex justify-content-center w-100">
                    <Navbar.Brand as={Link} to="/" className="mx-auto">
                        ShoppingListApp
                    </Navbar.Brand>
                    <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
                        <Dropdown.Toggle variant="link" className="p-0">
                            <PersonCircle size={32} className={theme.text} />
                        </Dropdown.Toggle>
                        
                        <Dropdown.Menu align="end" className="dropdown-menu-dark">
                            {users.map(user => (
                                <Dropdown.Item 
                                    key={user.id} 
                                    onClick={() => handleSelectUser(user.id)}
                                    className={loggedInUser?.id === user.id ? 'text-success' : ''}
                                >
                                    {user.name}
                                </Dropdown.Item>
                            ))}
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => changeLanguage('cs')}>
                                {t('language.cs')}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => changeLanguage('en')}>
                                {t('language.en')}
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={toggleTheme}>
                                {t(`theme.${theme.title}`)}
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => { logOut(); setShowDropdown(false); }}>
                                {t('public.logout')}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Navbar>
            <main className={mainStyle}>
                <Outlet />
            </main>
            <footer className={footerStyle}>
                <p className="mb-0">&copy; 2024 ShoppingListApp. Petr Jun.</p>
            </footer>
        </div>
    );
}