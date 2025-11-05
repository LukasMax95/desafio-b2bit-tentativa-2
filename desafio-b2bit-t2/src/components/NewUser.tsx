import React from "react"
import { addUser } from "../utils/storage"
import { useNavigate } from "react-router"
import { v4 } from "uuid";
import './global_style.css';
import DefaultImage from '../assets/synchro highway1.jfif';



const NewUser:React.FC = ()=>{
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");
    const [image, setImage] = React.useState(DefaultImage);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    
        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            console.log("Trocando a Imagem!");
            const arquivoSelecionado = event.target.files?.[0];
            if (!arquivoSelecionado) return;
            const reader = new FileReader();
            reader.onload = () => {
                setImage(String(reader.result));
            };
            reader.readAsDataURL(arquivoSelecionado);
        };
        const handleImageClick = () => {
            fileInputRef.current?.click();
        };

    function haveEmail(email:string):Boolean{
        const users = JSON.parse(localStorage.getItem("b2bit_users") || "[]");
        const user = users.find((u: { email: string; })=>u.email === email);
        //return thuthness 
        console.log("Email Encontrado!");
        return !!user;
    }

    return(
        <>
        <div className="card">
            <h1>Sign Up Page<br/><b>B2bit Challenge</b></h1>
            <div className="b2bit">
                <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef}
                    onChange={handleFileChange} 
                    style={{ display: 'none' }}
                />
                <img 
                    src={image} 
                    className='userimage' 
                    onClick={handleImageClick}
                    style={{ cursor: 'pointer' }}
                />
            </div>
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
                    if(!password.trim())
                        return alert("a senha deve ser preenchida");
                    if(password.length < 6)
                        return alert("a senha deve ter mais de 6 caracteres");
                    if(!repeatPassword.trim())
                        return alert("a senha deve ser repetida");
                    console.log({password, repeatPassword});
                    if(password !== repeatPassword)
                        return alert("as senhas são diferentes");
                    if(haveEmail(email))
                        return alert("já existe um usuário com esse email");
                    addUser({
                        id: v4(),
                        name,
                        email,
                        senha: password,
                        image: image
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