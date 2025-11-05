import React from "react";
import { useSearchParams, useNavigate } from "react-router";
import './global_style.css';


const UserPage:React.FC = () =>{
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    return(
        <>
        <div className="card">
            <h1>User Page<br/><b>B2bit Challenge</b></h1>
            <p>Welcome, User!</p>
            <br/>
            <label><b>Name: </b>{name}<br/><b>Email: </b>{email}</label><br/>
            <button
                className="submit2"
                onClick={()=>navigate("/")}
                >Sign Out</button>
        </div>
        </>
    )
}

export default UserPage