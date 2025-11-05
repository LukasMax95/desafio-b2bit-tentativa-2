import React from 'react';
import { useNavigate } from 'react-router';
import './global_style.css';



const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const signinHandler = () => {
        const users = JSON.parse(localStorage.getItem("b2bit_users") || "[]");
        const params = new URLSearchParams();
        console.log(users);
        const user = users.find((u: { email: string; })=>u.email === email);
        if(!user) return alert("usuário não encontrado");
        if(user.senha !== password) return alert("senha incorreta");
        alert("login realizado com sucesso");
        console.log(user)
        params.set("name", user.name);
        params.set("email", user.email);
        navigate(`/access?${params.toString()}`, {replace: true});
    }

    return(
        <>
        <div className="card">
            <h1>Login Page<br/><b>B2bit Challenge</b></h1>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                /><br/>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                /><br/>
            <div>
                <button
                    className="submit1"
                    onClick={signinHandler}>
                        Sign In
                </button>
            </div>
            <div>
                <button
                    className="submit2"
                    onClick={()=>navigate('./newuser')}>
                        Sign Up
                </button>
            </div>
        </div>
        </>
    )
}

export default Login;