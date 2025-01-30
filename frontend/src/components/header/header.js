

import './header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";

const Header = () => {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['is_user_authenticated', 'user_role', 'access_token']);
    const [showRightEnd, setShowRightEnd] = useState(true);

    const logout = () => {
        removeCookie('is_user_authenticated')
        removeCookie('user_role')
        removeCookie('access_token')
        navigate('/login');
    }

    useEffect(() => {
        if (cookie['is_user_authenticated'] === undefined){
            setShowRightEnd(false)
        } else {
            setShowRightEnd(true);
        }
    })

    return (
        <div style={{width:'100%', height:'fit-content'}}>
            <div className="app_header">
                <div style={{display:'flex', float: "left"}}>
                    <div style={{marginLeft: "20px"}}>
                        <label style={{color: "#2E8DCD", fontSize: "20px"}}>
                        <span style={{fontSize: "20px", color: "#2196F3", marginRight: "18px", marginTop: "10px"}}>
                            <b>Price Optimization tool</b> <br/>
                        </span>
                        </label>
                    </div>
                </div>

                {
                    showRightEnd ?
                        <div style={{float: "right", marginLeft: "20px"}} className="app_subheader">
                            <div style={{float: "right", padding: "10px"}}>
                                <label style={{color: "white", cursor: "pointer"}}
                                       onClick={logout}><b>Logout</b></label>
                            </div>

                            <div style={{float: "right", marginLeft: "20px"}}>
                                <AccountCircleIcon style={{cursor: "pointer"}}/>
                            </div>
                        </div> : <span></span>
                }
            </div>
        </div>
    );
}

export default Header;