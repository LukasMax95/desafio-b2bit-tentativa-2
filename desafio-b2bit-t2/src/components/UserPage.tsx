import React from "react";
import { useSearchParams, useNavigate } from "react-router";
import './global_style.css';
import DefaultImage from '../assets/synchro highway1.jfif';
import B2bitLogo from '../assets/B2bit Logo.png';


const UserPage:React.FC = () => {
    const [searchParams] = useSearchParams();
    let editmode:Boolean = false;
    const navigate = useNavigate();
    const email = searchParams.get("email");
    const users = JSON.parse(localStorage.getItem("b2bit_users") || "[]");
    const user = users.find((u: { email: string; })=>u.email === email);
    const [fontcolor, setFontColor] = React.useState("#FFFFFF");
    const name = user.name;
    const [image, setImage] = React.useState(
        user.image && user.image.startsWith('data:') ? user.image : DefaultImage
    )
    const activateEditMode = () => {
        console.log(user)
        editmode = (editmode) ? false:true;
    }

    const fileInputRef = React.useRef<HTMLInputElement>(null);
        
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Trocando a Imagem!");
        const arquivoSelecionado = event.target.files?.[0];
        if (!arquivoSelecionado) return;
        const reader = new FileReader();
        reader.onload = () => {
            setImage(String(reader.result));
            user.image = String(reader.result);
            localStorage.setItem("b2bit_users", JSON.stringify(users));
        };
        reader.readAsDataURL(arquivoSelecionado);
    };
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return(
        <>
        <div className="card">
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
                    onClick={()=>
                        {
                            if(editmode){
                                console.log(`editmode = ${editmode}`);
                                handleImageClick();
                            }
                        }}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <p>Welcome, User!</p>
            <br/>
            <label><b>Name: </b>{name}<br/><b>Email: </b>{email}</label><br/>
            <button
                className="specialsubmit"
                onClick={()=>{
                    console.log(editmode);
                    activateEditMode();
                    console.log(editmode);
                    if (editmode) setFontColor("#FDCF00");
                    else setFontColor("#FFFFFF");
                }}
                style={
                    {
                        color: fontcolor
                    }
                }
                >Edit Profile</button>
            <button
                className="submit2"
                onClick={()=>navigate("/")}
                >Sign Out</button>
        </div>

        </>
    )
}

export default UserPage