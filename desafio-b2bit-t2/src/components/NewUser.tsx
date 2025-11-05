import React from "react"
import { addUser } from "../utils/storage"
import { useNavigate } from "react-router"
import { v4 } from "uuid";
import './global_style.css';

const NewUser:React.FC = ()=>{
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");

    return(
        <>
        <div className="card">
            <h1>Sign Up Page<br/><b>B2bit Challenge</b></h1>
            <input
                type="text" placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            /><br/>
            <input
                type="text" placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            /><br/>
            <input
                type="password" placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                /><br/>
            <input
                type="password" placeholder="Repeat Password"
                value={repeatPassword}
                onChange={(e)=>setRepeatPassword(e.target.value)}
                /><br/>
            <div>
            <button
                className='submit1'
                onClick={()=>{
                        if(!name.trim() || !email.trim())
                        return alert("nome e email não preenchidos");
                    if(password.length < 6)
                        return alert("a senha deve ter mais de 6 caracteres");
                    console.log({password, repeatPassword});
                    if(password !== repeatPassword)
                        return alert("as senhas são diferentes");
                    addUser({
                        id: v4(),
                        name,
                        email,
                        senha: password
                    });
                    alert("Usuário criado! Faça login.");
                    navigate("/login");
                    }
                }> Sign Up </button>
            </div>
            <div>
            <button
                className="submit2"
                onClick={()=>navigate("/login")}
                > Back to Login </button>
            </div>
        </div>
        </>
    )
}

export default NewUser;