import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";

import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { ScrollToTop } from "../components/ScrollToTop";
import { Form, Input, Button, Select, message, notification } from "antd";
import {
  CheckCircleOutlined,
  LockOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Subtitulo, Contenido } from "../components/Titulos";
const { Option } = Select;
import ReCAPTCHA from "react-google-recaptcha";
import { CSPMetaTag } from "../components/CSPMetaTag";

//Aqui acaban los imports
export function Login() {
  const [userRole, setUserRole] = useState(null);

  const onChange = () => {
    console.log("Se realizó un cambio");
  };

  const navigate = useNavigate();
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const calculateTimeRemaining = () => {
    const timePassedInSeconds = Math.floor((Date.now() - timeLeft) / 1000);
    const timeRemainingInSeconds = Math.max(0, 300 - timePassedInSeconds);
    const minutes = Math.floor(timeRemainingInSeconds / 60);
    const seconds = timeRemainingInSeconds % 60;
    return { minutes, seconds };
  };
  // funcion para indicar que no existireron muchos intentos
  const updateMessageText = () => {
    const { minutes, seconds } = calculateTimeRemaining();
    setMessageText(
      `Se ha excedido el número de intentos. Favor de esperar 5 minutos.`
    );
  };

  const onFinish = async (values) => {
    try {
      console.log("Datos de inicio de sesión enviados al backend:", values);

      const response = await axios.post("http://localhost:3000/login", {
        curp: values.curp,
        contrasena: values.contrasena,
      });

      if (response.data.success) {
        console.log("Inicio de sesión exitoso");
        message.success("Inicio de sesión exitoso");
        localStorage.setItem("userRole", response.data.role);
        const userRole = response.data.role; // Suponiendo que el servidor devuelve el rol
        setUserRole(userRole);

        // Redirigir a la ruta correspondiente según el rol
        if (userRole === 1) {
          navigate("/");
        } else if (userRole === 2) {
          navigate("/");
        } else if (userRole === 3) {
          navigate("/");
        } else {
          navigate("/"); // Redirige a la ruta predeterminada si el rol no coincide con ninguno de los casos anteriores
        }
      } else {
        console.log(
          "Inicio de sesión fallido:",
          response.data.message || "Credenciales incorrectas"
        );
        message.error(response.data.message || "Credenciales incorrectas");
        setFailedAttempts(failedAttempts + 1);

        if (failedAttempts >= 2) {
          const currentTime = Date.now();
          setTimeLeft(currentTime);

          setIsButtonDisabled(true);
          updateMessageText();

          const interval = setInterval(updateMessageText, 1000);

          setTimeout(() => {
            setIsButtonDisabled(false);
            setFailedAttempts(0);
            setMessageText("");
            clearInterval(interval);
          }, 60000); // 1 minutos en milisegundos
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      message.error("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Por favor, completa todos los campos.");
  };
  return (
    <>
      <CSPMetaTag />
      <Header />
      <div className="Simon">
        <ScrollToTop />
        <div className="login-box">
          <Subtitulo subTit={"Inicio de sesión"} />
          <Form
            name="loginForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Contenido conTit={"Curp:"} />
            <Form.Item
              name="curp"
              rules={[
                {
                  validator: async (_, value) => {
                    if (!value || typeof value !== "string") {
                      throw new Error("Ingrese su CURP");
                    }
                    const trimmedValue = value.trim();
                    if (/[a-z]/.test(trimmedValue)) {
                      throw new Error("La CURP solo debe contener mayúsculas");
                    }
                    const uppercasedValue = trimmedValue.toUpperCase();
                    const pattern = /^[A-Z]{4}\d{6}[HM]{1}[A-Z\d]{5}[0-9A-Z]{2}$/;
                    if (uppercasedValue.length !== 18) {
                      throw new Error(
                        "La CURP debe tener 18 letras mayúsculas/números)"
                      );
                    }
                    if (!pattern.test(uppercasedValue)) {
                      throw new Error("La CURP no es válida");
                    }
                    if (value !== trimmedValue) {
                      throw new Error(
                        "La CURP no debe contener espacios al inicio, en medio o al final"
                      );
                    }
                  },
                },
              ]}
            >
              <Input
                prefix={<CheckCircleOutlined />}
                placeholder="Ejemplo: MAPA850210MVERXXA1"
              />
            </Form.Item>

            <Contenido conTit={"Contraseña:"} />
            <Form.Item
              name="contrasena"
              rules={[
                {
                  required: true,
                  message: "Ingrese su contraseña",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Ingrese su contraseña"
              />
            </Form.Item>

            <Link to="/ReContraseña">
              <Contenido conTit={"¿Olvidó su contraseña?"} />{" "}
            </Link>

            <Form.Item
              name="recaptcha"
              rules={[
                {
                  validator: async (_, value) => {
                    if (!value) {
                      throw new Error("Por favor, completa el reCAPTCHA");
                    }
                  },
                },
              ]}
            >
              <ReCAPTCHA
                sitekey="6Le3EWYpAAAAAI-na3xyGWaHgIYom7wycSNXA5qs"
                onChange={onChange}
              />
            </Form.Item>

            {messageText && (
              <p style={{ color: "red", textAlign: "center" }}>{messageText}</p>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled}
              >
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}
