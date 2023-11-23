import logo from '../img/logo.png'
import { Link } from "react-router-dom";
import { FaUpload, FaEdit } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
export function Header() {
    return(
        <div className="barNav">
            <div className="barNav-logo">
                <img src = {logo} alt="Logo para pagina web zona escolar 012" title="Zona escolar 012"/>
            </div>

            <ul className="barNav-menu">
                <li className="barNav-menu-element">
                    <span className='barNav-text'>
                        <Link className='barNav-text' to={"/"}>
                        Inicio
                        </Link>
                    </span>
                </li>


                <li className="barNav-menu-element">
                    <span className='barNav-text'>
                        <Link className='barNav-text' to={"/Salud"}>
                        Salud
                        </Link>
                    </span>
                </li>
                <li className="barNav-menu-element">
                    <span className='barNav-text'>
                        <Link className='barNav-text' to={"/Preguntas"}>
                        Preguntas frecuentas
                        </Link>
                    </span>
                </li>
                <li className="barNav-menu-element">
                    <span className='barNav-text'>
                        <Link className='barNav-text' to={"/Quien"}>
                        ¿Quienes Somos?
                        </Link>
                    </span>
                </li>
                <li className="barNav-menu-element">
                    <span className='barNav-text'>
                        <Link className='barNav-text' to={"/Quien"}>
                        Alumnos
                        </Link>
                    </span>
                    <div className="submenu">
                        <Link to={"/RegA"}>Registrar <FaUpload /></Link>
                        <Link to={"/MiLista"}>Mis alumnos <FaTableList /></Link>
                        <Link to={"/Ruta2"}>Modificar mi lista <FaEdit /></Link>
                    </div>                
                    </li>
                <li className="barNav-menu-element">
                    <span className='barNav-text'>
                        <Link className='barNav-text' to={"/esExamen"}>
                        Generar Examenes
                        </Link>
                    </span>
                </li>
            </ul>
            
        </div>
    )
    
}