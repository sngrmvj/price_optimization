


import React from "react";
import sourceImage from "../../assets/404.png";

const NoPage = () => {
    return(
        <div style={{display:"flex", justifyContent:"center", alignContent:"center", flexWrap:"wrap", width:"100%", flexDirection:"column"}}>
            <img src={sourceImage} />
            <div style={{textAlign:"center"}}>
                <label style={{fontWeight:"bold", fontSize:"18px", color:"red"}}>Page not found. Please navigate back or Ask administrator about the issue.</label>
            </div>

        </div>
    );
}

export default NoPage;