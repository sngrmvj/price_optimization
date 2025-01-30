import {useEffect, useState} from "react";
import axios from "axios";
import {
    ADD_PRODUCTS_URL,
    DELETE_PRODUCTS_URL, GET_ADMIN_PRODUCTS_URL,
    GET_CATEGORIES_URL,
    GET_USER_PRODUCTS_URL, SEARCH_PRODUCTS_URL,
    VIEW_PRODUCTS_URL
} from "../../../constants";
import {toast, ToastContainer} from "react-toastify";
import AddProduct from "../product/add_product";
import './create_manage.css'
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DemandForecast from "../demand_forecast/demand_forecast";


const CreateManageProduct = () => {

    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['is_user_authenticated', 'access_token', 'user_role']);
    const [toggleAddProduct, setToggleAddProduct] = useState(false);
    const [toggleDemandForecast, setDemandForecast] = useState(false);
    const [user_data, setUser_data] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryDropDown, setCategoryDropDown] = useState('');
    const [populateDataModal, setPopulateDataModal] = useState('');
    const [populateDemandForecastModal, setPopulateDemandForecastModal] = useState('');
    const [modalHeader, setModalHeader] = useState('Add Product');
    const [filteredData, setFilteredData] = useState([]);

    const handleChange = (e) => {
        setCategoryDropDown(e.target.value);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleAddForm = () => {
        setToggleAddProduct(!toggleAddProduct);
        setPopulateDataModal('');
        setModalHeader('Add Product');
        get_user_products();
    }

    const toggleDemandForecastForm = () => {
        if (user_data.length > 0){
            setDemandForecast(!toggleDemandForecast);
        } else {
            toast.warn("No products to forecast");
        }

    }

    useEffect(() => {
        if(cookie['is_user_authenticated'] === undefined){
            navigate("/login")
        }
        get_user_products();
    }, []);

    const get_user_products = () => {

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
                // Todo - We can dynamically populate the stationary
                setUser_data(res.data.data);
                setFilteredData(res.data.data);
                setPopulateDemandForecastModal(res.data.data);
            }
        })
        .catch(error => {
            toast.error(`${error.data.message}`)
        })
    }

    const viewProduct = (product_details) => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie['access_token']}`,
            },
        };

        axios.get(`${VIEW_PRODUCTS_URL}?product=${product_details['product_id']}`, options) // if promise get you success, control enters .then
        .then(res => {
            if (res.status === 200) {
                setToggleAddProduct(!toggleAddProduct);
                setPopulateDataModal(res.data.data);
                setModalHeader('View Product');
            }
        })
        .catch(error => {
            if (error.status === 404) {
                toast.warn(error.response.data.detail);
            } else {
                toast.error("Please check with admin for the error in viewing")
            }
        })
    }

    const deleteProduct = (product_details) => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie['access_token']}`,
            },
        };

        axios.delete(`${DELETE_PRODUCTS_URL}?product=${product_details['product_id']}`, options) // if promise get you success, control enters .then
        .then(res => {
            if (res.status === 200) {
                toast.success(res.data.message);
                setUser_data(res.data.data);
            }
        })
        .catch(error => {
            if (error.status === 404) {
                toast.warn(error.response.data.detail);
            } else {
                toast.error("Please check with admin for the error in deleting")
            }
        })
    }

    const editProduct = (product_details) => {
        setToggleAddProduct(!toggleAddProduct);
        setPopulateDataModal(product_details);
        setModalHeader('Update Product');
    }

    const filterData = () =>{
        if (categoryDropDown === 'Select Category'){
            setFilteredData(user_data);
            setPopulateDemandForecastModal(user_data);
        } else {
            const filtered = user_data.filter(item => item.category === categoryDropDown);
            setFilteredData(filtered);
            setPopulateDemandForecastModal(filtered);
        }
    }

    const search_products = () => {

        if (searchTerm.length === 0){
            get_user_products();
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
                    setUser_data(res.data.data);
                    setFilteredData(res.data.data);
                    setPopulateDemandForecastModal(res.data.data);
                }
            })
            .catch(error => {
                toast.error(`${error.response.data.detail}`);
            })
    }

    return (
        <div>

            <div className="create_manage_header">

            <div style={{padding: "10px", float: "left"}}>
                    <label style={{color: "white", cursor: "pointer"}}>
                        <b>Create and manage product</b>
                    </label>
                </div>

                <div style={{width: "1px", height: "25px", backgroundColor: "#2E8DCD", marginRight: "10px"}}></div>

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
                                [...new Map(user_data.map(item => [item.category, item])).values()].map(item => (
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

                <div style={{width: "1px", height: "25px", backgroundColor: "#2E8DCD", marginRight: "10px"}}></div>

                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{padding: "10px", marginRight: "10px"}}>
                        <button className="button-9" onClick={toggleAddForm}><b>Add new product</b></button>
                    </div>
                    <div style={{padding: "10px", color: "teal"}}>
                        <button className="button-9" onClick={toggleDemandForecastForm}><b>Demand Forecast</b></button>
                    </div>
                </div>

            </div>

            {toggleAddProduct && <AddProduct modalAction={toggleAddForm} populateData={populateDataModal} modalTitle={modalHeader}/>}

            {toggleDemandForecast && <DemandForecast modalAction={toggleDemandForecastForm} populateData={populateDemandForecastModal} />}

            <div style={{padding: "10px", borderRadius:"5px"}}>
                <table style={{borderRadius:"5px"}}>
                    <thead>
                    <tr>
                        <th><input type="checkbox"/></th>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Cost Price</th>
                        <th>Selling Price</th>
                        <th>Description</th>
                        <th>Available Stock</th>
                        <th>Units Sold</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor:"white", color:"black"}}>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <th><input type="checkbox"/></th>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.cost_price}</td>
                            <td>{item.selling_price}</td>
                            <td>{item.description}</td>
                            <td>{item.stock_available}</td>
                            <td>{item.units_sold}</td>
                            <td>
                                <div style={{color:"black", display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                                    <EditIcon  style={{cursor:"pointer", width:"20px", height:"20px", marginRight:"20px"}} onClick={()=>{editProduct(item)}}/>
                                    <VisibilityIcon style={{cursor:"pointer", width:"20px", height:"20px", marginRight:"20px"}} onClick={()=>{viewProduct(item)}}/>
                                    <DeleteIcon style={{cursor:"pointer", width:"20px", height:"20px", marginRight:"20px"}} onClick={()=>{deleteProduct(item)}}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
}


export default CreateManageProduct;