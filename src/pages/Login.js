import React, { useContext, useState } from "react";
import axios from '../axiosConfig';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');    
    const { login } = useContext(AuthContext);
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/user/login', {
                email,
                password
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            login(response.data.user);
            history('/home');
        } catch(err) {
            setError('Registration Failed.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input 
                        type='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login;