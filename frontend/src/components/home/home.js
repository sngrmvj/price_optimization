import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {GET_USER_PRODUCTS_URL, LOGIN_URL} from "../../constants";
import {toast} from "react-toastify";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import './home.css'
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import CreateManageProduct from "./create_manage/create_manage";
import PriceOptimization from "./pricing_optimization/price_optimization";


const Home = () => {

    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['is_user_authenticated']);
    const [toggleAddProduct, setToggleAddProduct] = useState(false);
    const [user_data, setUser_data] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryDropDown, setCategoryDropDown] = useState(['Select Category']);
    const [value, setValue] = useState('1');

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{padding:"20px"}}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="lab API tabs example" >
                            <Tab label="Create and Manage Product" value="1"  style={{color:"white"}} />
                            <Tab label="Pricing Optimization" value="2" style={{color:"white"}} />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <div className="non_complaince_container">
                            <CreateManageProduct />
                        </div>
                        <br /><br />
                    </TabPanel>

                    <TabPanel value="2">
                        <div className="non_complaince_container">
                            <PriceOptimization />
                        </div>
                        <br /><br />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
}


export default Home;