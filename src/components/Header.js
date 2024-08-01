import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const history = useNavigate();

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        history('/home'); 
    };

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    {user? (
                        <>
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        {user.role === 'professor' ? (
                            <>
                            <li>
                                <Link to='/students'>Students</Link>
                            </li>
                            <li>
                                <Link to='/subjects'>Subjects</Link>
                            </li>
                            <li>
                                <Link to='/grades'>Grades</Link>
                            </li>
                            </>
                        ) : (
                            <li>
                            <Link to='/studentSubjects'>Subjects</Link>
                            </li>
                        )}
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                        </>
                    ) : (
                    <>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;