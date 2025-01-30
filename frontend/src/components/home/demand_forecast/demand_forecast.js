import React, {Fragment, useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import './demand_forecast.css';
import D3LinearGraph from './D3LinearGraph';


const DemandForecast = ({modalAction, populateData}) => {

    const [graphData, setGraphData] = useState([]);

    const closeForm = () => {
        modalAction();
    }

    const updateGraph = () => {
        let data = populateData.map((product, index) => ({
            x: product.name,
            y: product.selling_price
        }));

        console.log(data)

        setGraphData(data);
    }

    useEffect(() => {
        if (Object.keys(populateData).length > 0) {
            updateGraph()
        }
    }, [])

    return (
        <Fragment>
            <div className="graph-modal-overlay">
                <div className="graph-modal-container">
                    <div style={{
                        float: "left",
                        width: "95%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>

                        <div style={{borderRadius: "5px", width: "95%"}}>
                            <D3LinearGraph data={graphData}/>
                        </div>
                        <br/><br/><br/>

                        <div style={{borderRadius: "5px", width: "95%"}}>
                            <table style={{borderRadius: "5px", width: "100%"}}>
                                <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Category</th>
                                    <th>Cost Price</th>
                                    <th>Selling Price</th>
                                    <th>Available Stock</th>
                                    <th>Units Sold</th>
                                    <th>Calculated Demand Forecast</th>
                                </tr>
                                </thead>
                                <tbody style={{backgroundColor: "white", color: "black"}}>
                                {populateData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.cost_price}</td>
                                        <td>{item.selling_price}</td>
                                        <td>{item.stock_available}</td>
                                        <td>{item.units_sold}</td>
                                        <td style={{backgroundColor: "#2196F3"}}>{(item.units_sold * item.selling_price)/(item.stock_available + 1)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div style={{float: "right"}}>
                        <CloseIcon onClick={closeForm} style={{cursor: "pointer"}}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default DemandForecast;