




import './login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import {LOGIN_URL} from "../../../constants";



const Login = () => {
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies(['is_user_authenticated']);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(cookie['is_user_authenticated'] === true){
            navigate("/")
        }
    },[]);

    const navigateToSignUp = () => {
        navigate("/register");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'*',
                'Content-Type': 'application/json',
            },

            data : {
                email: email,
                password: password,
            }
        };

        axios.put(`${LOGIN_URL}`, options) // if promise get you success, control enters .then
            .then(res => {
                if (res.status === 200) {
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate()+ 1);
                    setCookie('is_user_authenticated', true, {expires: expirationDate});
                    setCookie('user_role', res.data.role, {expires: expirationDate});
                    setCookie('access_token', res.data['access_token'], {expires: expirationDate});
                    navigate("/");
                }
            })
            .catch(error => {
                if (error.status === 404) {
                    toast.warn(error.response.data.detail);
                } else {
                    toast.error("Please check credentials")
                }
            })

    };

    return (

        <span>
            <div className='main'>
                <div className='maindiv'>
                    <div className='sidediv'>
                        <div style={{display:"block", padding:"10px", }}>
                            <label style={{color:"#2E8DCD", borderBottom:"2px solid #2E8DCD", padding:"5px"}} ><b>Login</b></label>
                        </div> <br/>
                        <div style={{display:"block", padding:"10px", }}>
                            <label className='switchText' onClick={navigateToSignUp}><b>Register</b></label>
                        </div>
                    </div>

                    <div style={{display:"flex",flexDirection:"column", padding:"20px"}}>
                        <div style={{display:"flex",flexDirection:"column", padding:"20px"}}>

                            <header className='header'>Login</header> <br/><br/>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email">Email:</label><br/>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                /><br/><br/>

                                <label htmlFor="password">Password:</label><br/>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                /><br/><br/>

                                <button type="submit" className='btn'>Login</button><br/><br/>

                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <ToastContainer />
        </span>

    );
};


export default Login;