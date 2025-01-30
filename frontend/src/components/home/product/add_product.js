import React, {useEffect, useState} from 'react';
import './add_product.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import {ADD_PRODUCTS_URL, EDIT_PRODUCTS_URL} from "../../../constants";
import {toast} from "react-toastify";
import {useCookies} from "react-cookie";

const AddProduct = ({modalAction, populateData, modalTitle}) => {

    const [cookie, setCookie] = useCookies(['access_token']);
    const [action, setAction] = useState('')

    const closeForm = () => {
        modalAction();
    }

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        cost_price: '',
        selling_price: '',
        category: '',
        stock_available: '',
        units_sold: '',
        customer_rating: '',
        demand_forecast: '',
        optimized_price: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if ( Object.keys(populateData).length > 0) {
            setFormData(populateData);
        }

        if (modalTitle === "Add Product") {
            setAction("Add");
        } else if (modalTitle === "Update Product") {
            setAction("Update");
        } else {
            setAction('');
        };
    }, [])

    const validate = () => {
        let formErrors = {};
        if (!formData.product_id) formErrors.product_id = 'Product ID is required';
        if (!formData.name) formErrors.name = 'Name is required';
        if (!formData.cost_price) formErrors.cost_price = 'Cost Price is required';
        if (!formData.selling_price) formErrors.selling_price = 'Selling Price is required';
        if (!formData.stock_available) formErrors.stock_available = 'Stock Available is required';
        if (!formData.units_sold) formErrors.units_sold = 'Units Sold is required';
        if (!formData.demand_forecast) formErrors.demand_forecast = 'Demand Forecast is required';
        if (!formData.optimized_price) formErrors.optimized_price = 'Optimizing Price is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const updateProduct = () => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie['access_token']}`,
            },
            data : formData
        };

        axios.put(`${EDIT_PRODUCTS_URL}`, options) // if promise get you success, control enters .then
        .then(res => {
            if (res.status === 200) {
                toast.success(res.data.message);
                closeForm();
            }
        })
        .catch(error => {
            if (error.status === 404) {
                toast.warn(error.response.data.detail);
            } else {
                toast.error("Please check credentials")
            }
        })
    }

    const addProduct = () => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie['access_token']}`,
            },
            data : formData
        };

        axios.post(`${ADD_PRODUCTS_URL}`, options) // if promise get you success, control enters .then
        .then(res => {
            if (res.status === 200) {
                toast.success(res.data.message);
                closeForm();
            }
        })
        .catch(error => {
            if (error.status === 404) {
                toast.warn(error.response.data.detail);
            } else {
                toast.error("Please check credentials")
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === 'Add'){
            addProduct();
        } else {
            updateProduct();
        }
    };

    return (
        <div className="modal-overlay" >
            <div className="modal-container" >
                <div style={{display: "flex", flexDirection: "row",}}>
                    <div>
                        <div style={{padding: "10px", borderBottom: "2px solid #2196F3", fontWeight:"bold"}}>
                            <header>{modalTitle}</header>
                        </div>
                        <br/><br/><br/>
                        <form onSubmit={handleSubmit}>

                            <div style={{marginRight: "20px"}}>
                                <label>Product Name:</label><br/>
                                <input type="text"
                                       style={{width: "100%"}}
                                       name="name"
                                       placeholder="Enter Product Name"
                                       value={formData.name}
                                       className="input"
                                       onChange={handleChange}/>
                                {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                            </div>
                            <br/>

                            <div>
                                <label>Product Category:</label><br/>
                                <input type="text" style={{width: "97%"}} placeholder="Enter Product Category"
                                       className="input" name="category" value={formData.category}
                                       onChange={handleChange}/>
                                {errors.category && <span style={{color: 'red'}}>{errors.category}</span>}
                            </div>
                            <br/>


                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div style={{marginRight: "20px"}}>
                                    <label>Cost Price:</label><br/>
                                    <input type="text"
                                           placeholder="Enter Cost Price"
                                           className="input"
                                           name="cost_price"
                                           value={formData.cost_price}
                                           onChange={handleChange}/>
                                    {errors.cost_price && <span style={{color: 'red'}}>{errors.cost_price}</span>}
                                </div>
                                <div style={{marginRight: "20px"}}>
                                    <label>Selling Price:</label><br/>
                                    <input type="text"
                                           placeholder="Enter Selling Price"
                                           className="input"
                                           name="selling_price"
                                           value={formData.selling_price}
                                           onChange={handleChange}/>
                                    {errors.selling_price && <span style={{color: 'red'}}>{errors.selling_price}</span>}
                                </div>
                            </div>
                            <br/>


                            <div>
                                <label>Description:</label><br/> <br/>
                                <textarea name="description"
                                          placeholder="Enter the description" id="user_input"
                                          rows="10" required=""
                                          style={{
                                              color: "white",
                                              fontSize: "18px",
                                              width: '100%',
                                              border: "1px solid #2196F3",
                                              borderRadius: "5px",
                                              fontFamily: "Arial, Helvetica, sans-serif",
                                              padding: "10px",
                                              boxSizing: "border-box",
                                              backgroundColor: "#353535"
                                          }}
                                          value={formData.description}
                                          onChange={handleChange}/>
                            </div>
                            <br/>

                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div style={{marginRight: "20px"}}>
                                    <label>Stock Available:</label><br/>
                                    <input type="text"
                                           className="input"
                                           placeholder="Enter Stock Available"
                                           name="stock_available"
                                           value={formData.stock_available}
                                           onChange={handleChange}/>
                                    {errors.stock_available &&
                                        <span style={{color: 'red'}}>{errors.stock_available}</span>}
                                </div>
                                <div style={{marginRight: "20px"}}>
                                    <label>Units Sold:</label><br/>
                                    <input type="text"
                                           placeholder="Enter Units Sold"
                                           className="input"
                                           name="units_sold" value={formData.units_sold}
                                           onChange={handleChange}/>
                                    {errors.units_sold && <span style={{color: 'red'}}>{errors.units_sold}</span>}
                                </div>
                            </div>
                            <br/>

                            <div>
                                <label>Customer Rating:</label><br/>
                                <input type="text" style={{width: "97%"}} placeholder="Enter Customer Rating"
                                       className="input" name="customer_rating" value={formData.customer_rating}
                                       onChange={handleChange}/>
                                {errors.customer_rating && <span style={{color: 'red'}}>{errors.customer_rating}</span>}
                            </div>
                            <br/>


                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div style={{marginRight: "20px"}}>
                                    <label>Demand Forecast:</label><br/>
                                    <input type="text"
                                           className="input"
                                           placeholder="Enter Demand Forecast"
                                           name="demand_forecast"
                                           value={formData.demand_forecast}
                                           onChange={handleChange}/>
                                    {errors.demand_forecast &&
                                        <span style={{color: 'red'}}>{errors.demand_forecast}</span>}
                                </div>
                                <div style={{marginRight: "20px"}}>
                                    <label>Optimized Price:</label><br/>
                                    <input type="text"
                                           placeholder="Enter Optimized Price"
                                           className="input"
                                           name="optimized_price" value={formData.optimized_price}
                                           onChange={handleChange}/>
                                    {errors.optimized_price &&
                                        <span style={{color: 'red'}}>{errors.optimized_price}</span>}
                                </div>
                            </div>
                            <br/>

                            {/*<button type="reset" className="button-39" style={{marginRight: "10px"}}>Cancel</button>*/}
                            {
                                modalTitle !== 'View Product' ? <button type="submit" className="button-39">{action}</button> : <span></span>
                            }


                        </form>
                    </div>

                    <div style={{float: "right"}}>
                        <CloseIcon onClick={closeForm} style={{cursor: "pointer"}}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
