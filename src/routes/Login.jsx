import '../css/Login.css'

import { Header } from '../components/Header';

import { Footer } from "../components/Footer";

import { Subtitulo, Titulo } from '../components/Titulos';

import { Link } from "react-router-dom";

import { FaUser,FaGraduationCap,FaLock  } from "react-icons/fa";

import { Button, Checkbox, Form, Input } from 'antd';

export function Login() {

    return(
        <>
        <Header/>
        
        <div className='Simon'>
            <div class="login-box">
                <Subtitulo subTit={"INICIO DE SESION"}/>
                <br />
                <br />
                    <form>
                        <div className="user-box">
                            <select className='input' name="" id="">
                                <option value="">Selecione su plantel de trabajo</option>
                                <option value="">Escuela Primaria Bilingue Benito Juarez</option>
                            </select>
                            <label>Plantel de trabajo  <FaGraduationCap /></label>
                        </div>
                        <div className="user-box">
                            <input className='input' type="text" name="" required=""/>
                            <label>Nombre de usuario  <FaUser /></label>
                        </div>
                        <div className="user-box">
                            <input className='input' type="password" name="" required=""/>
                            <label>Contraseña <FaLock /></label>
                        </div>
                        <span className='a'>
                        <Link to={'/'} className='link'>
                            ingresar
                        </Link>
                        </span>
                    </form>
             </div>
         </div>

         <Footer/>
         </>
    )
    
}