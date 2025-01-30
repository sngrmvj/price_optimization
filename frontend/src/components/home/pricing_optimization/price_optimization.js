

import './price_optimization.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import {
    GET_ADMIN_PRODUCTS_URL,
    GET_PRICE_OPTIMIZED_URL,
    GET_USER_PRODUCTS_URL,
    SEARCH_PRODUCTS_URL
} from "../../../constants";
import {toast} from "react-toastify";



const PriceOptimization = () => {

    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['is_user_authenticated']);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryDropDown, setCategoryDropDown] = useState(['Select Category']);
    const [product_data, setProduct_data] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const handleChange = (e) => {
        setCategoryDropDown(e.target.value);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if(cookie['is_user_authenticated'] === undefined){
            navigate("/login")
        }

        get_data()
    }, []);

    const get_data = () => {
        const options = {

            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie['access_token']}`,
            },
        };

        let URL = "";
        if (cookie['user_role'] === 'admin'){
            URL = GET_ADMIN_PRODUCTS_URL
        } else {
            URL = GET_USER_PRODUCTS_URL
        }
        axios.get(`${URL}`, options) // if promise get you success, control enters .then
        .then(res => {
            if (res.status === 200) {
                setProduct_data(res.data.data);
                setFilteredData(res.data.data);
            }
        })
        .catch(error => {
            toast.error("Check with Admin")
        })
    }

    const filterData = () =>{
        if (categoryDropDown === 'Select Category'){
            setFilteredData(product_data)
        } else {
            const filtered = product_data.filter(item => item.category === categoryDropDown);
            setFilteredData(filtered);
        }
    }

    const search_products = () => {

        if (searchTerm.length === 0){
            get_data();
            return
        }

        const options = {

            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie['access_token']}`,
            },
        };
        axios.get(`${SEARCH_PRODUCTS_URL}?search_item=${searchTerm}`, options) // if promise get you success, control enters .then
            .then(res => {
                if (res.status === 200) {
                    // Todo - We can dynamically populate the stationary
                    setProduct_data(res.data.data);
                    setFilteredData(res.data.data);
                }
            })
            .catch(error => {
                toast.error(`${error.response.data.detail}`);
            })
    }


    return (
        <div className="price_optimization">

            <div className="price_optimization_header">

                <div style={{padding: "10px", float: "left"}}>
                    <label style={{color: "white", cursor: "pointer"}}>
                        <b>Pricing Optimization</b>
                    </label>
                </div>

                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{marginRight: "20px"}}>
                        <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch}/>
                    </div>
                    <button className="button-9"
                            style={{backgroundColor: "transparent", color: "white", border: "1.5px solid #2196F3", marginRight: "15px"}}
                            onClick={search_products}>
                        <b>Search</b>
                    </button>

                    <div style={{marginRight: "20px", display: "flex", alignItems: "center"}}>
                        <label style={{color: "white", fontSize: "15px", marginRight: "15px"}}>Category:</label>
                        <select
                            style={{color: "black", padding: "8px", marginRight: "15px", borderRadius: "5px"}}
                            onChange={handleChange}
                        >
                            <option>Select Category</option>
                            {
                                [...new Map(product_data.map(item => [item.category, item])).values()].map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.category}
                                    </option>
                                ))
                            }
                        </select>
                        <button className="button-9"
                                style={{backgroundColor: "transparent", color: "white", border: "1.5px solid #2196F3"}}
                                onClick={filterData}>
                            <b>Filter</b>
                        </button>
                    </div>
                </div>

            </div>

            <div style={{padding: "10px",}}>
                <table style={{backgroundColor: "white", color: "black"}}>
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Description</th>
                        <th>Cost Price</th>
                        <th>Selling Price</th>
                        <th>Optimized Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                        <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td>{item.cost_price}</td>
                            <td>{item.selling_price}</td>
                            <td><span style={{color:"grey", marginRight:"20px"}}>${item.cost_price}</span> <span style={{color:"#2196F3", float:"right"}}>${item.optimized_price}</span></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PriceOptimization;