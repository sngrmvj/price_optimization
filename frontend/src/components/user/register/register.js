



import './register.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {REGISTER_URL} from "../../../constants";
import {useCookies} from "react-cookie";


const Register = () => {

    const [cookie, setCookie] = useCookies(['is_user_authenticated']);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");


    useEffect(() => {
        if(cookie['is_user_authenticated'] === true){
            navigate("/")
        }
    });


    const navigateToLogin = () => {
        navigate("/login");
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        var data = {
            email: email,
            password: password,
            role: role
        }

        const options = {

            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Content-Type': 'application/json',
            },

            data : data
        };

        axios.post(`${REGISTER_URL}`, options)
            .then(result=>{
                if(result.status === 200){
                    navigate("/login");
                } else {
                    toast.warn("Please check the inputs")
                }
            }).catch(error => {
            if (error.status === 404){
                toast.error("Error Not Found");
            } else {
                toast.error(error.error);
            }

        })
    };

    return (
        <span>

            <div className='signupmain'>
                <div className='signupdiv'>
                    <div className='sidediv'>
                        <div style={{display:"block", padding:"10px", }}>
                            <label className='switchText' onClick={navigateToLogin}><b>Login</b></label>
                        </div><br/>
                        <div style={{display:"block", padding:"10px", }}>
                            <label style={{color:"#2E8DCD", borderBottom:"2px solid #2E8DCD", padding:"5px"}} ><b>Register</b></label>
                        </div>
                    </div>

                    <div style={{display:"flex",flexDirection:"column", padding:"20px"}}>
                        <div style={{display:"flex",flexDirection:"column", padding:"20px"}}>

                            <header className='signUpheader'>Register</header> <br/><br/>
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

                                <label htmlFor="tel" >Role:</label><br/>
                                <select name="role" style={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                    marginTop:  "10px"
                                }} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select role</option>
                                    <option value="buyer">Buyer</option>
                                    <option value="supplier">Supplier</option>
                                </select>
                                <label style={{fontWeight: "bold", marginRight: "10px"}}> (or) </label>
                                <input
                                    style={{backgroundColor:"white"}}
                                    type="text"
                                    id="role"
                                    placeholder="Enter custom role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                /><br/><br/>

                                <button type="submit" className='btn'>Register</button><br/><br/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <ToastContainer />
        </span>
    );
};


export default Register;