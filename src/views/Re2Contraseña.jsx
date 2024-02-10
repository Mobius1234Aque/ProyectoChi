import "../css/Login.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Select } from "antd";
import { UserOutlined, LockOutlined, IdcardOutlined } from "@ant-design/icons";
import { Subtitulo, Notificacion, Contenido } from "../components/Titulos";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Form, Input, Button, message } from "antd";
import { ScrollToTop } from "../components/ScrollToTop";

export function Re2Contraseña() {
  const [userName, setUserName] = useState(null);
  const [pregunta, setPregunta] = useState(null);
  const [tipoPregunta, setTipoPregunta] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const { Option } = Select;
  const [key, setKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [preguntasSecretasOptions, setPreguntasSecretasOptions] = useState([]);
  const [tipoRecuperacion, setTipoRecuperacion] = useState(null);
  const [decryptedPassword, setDecryptedPassword] = useState(null);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);

  const hasMinimumLength = (value) => value.length >= 8;
  const hasUpperCase = (value) => /[A-Z]/.test(value);
  const hasLowerCase = (value) => /[a-z]/.test(value);
  const hasNumber = (value) => /\d/.test(value);
  const hasSpecialChar = (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value);

  useEffect(() => {
    obtenerNombreUsuario();
    obtenerPregunta();
    obtenerTelefono();
  }, []);

  useEffect(() => {
    if (pregunta) {
      obtenerTipoPregunta();
    }
  }, [pregunta]);

  const obtenerNombreUsuario = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/obtener-nombre/${curp}`
      );
      console.log("Datos del usuario:", response.data);
      if (response.data.nombre) {
        const { nombre, aPaterno, aMaterno } = response.data;
        setUserName(`${nombre} ${aPaterno} ${aMaterno}`);
      } else {
        console.error("Error al obtener el nombre del usuario.");
      }
    } catch (error) {
      console.error("Error al obtener el nombre del usuario:", error);
    }
  };

  const obtenerPregunta = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/obtener-pregunta/${curp}`
      );
      console.log("Datos del usuario:", response.data);
      if (response.data.pregunta) {
        const { pregunta } = response.data;
        setPregunta(`${pregunta}`);
      } else {
        console.error("Error al obtener el nombre del usuario.");
      }
    } catch (error) {
      console.error("Error al obtener el nombre del usuario:", error);
    }
  };

  const obtenerTipoPregunta = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/obtener-tipo-pregunta/${pregunta}`
      );
      console.log("Tipo de pregunta obtenido:", response.data);
      if (response.data.tipo_pregunta) {
        const { tipo_pregunta } = response.data;
        setTipoPregunta(`${tipo_pregunta}`);
        //setCurpUsuario(curp);
      }
    } catch (error) {
      console.error("Error al obtener el tipo de pregunta:", error);
    }
  };

  const obtenerTelefono = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/obtener-telefono/${curp}`
      );
      console.log("Datos del usuario:", response.data);
      if (response.data.telefono) {
        const { telefono } = response.data;
        setTelefono(`${telefono}`);
      } else {
        console.error("Error al obtener el nombre del usuario.");
      }
    } catch (error) {
      console.error("Error al obtener el nombre del usuario:", error);
    }
  };

  const { state } = location;
  const { curp } = state || {};
  const handleRecuperacionChange = (value) => {
    setTipoRecuperacion(value);
  };

  const onFinishh = async (values) => {
    try {
      console.log("", values);

      if (tipoRecuperacion === "pregunta") {
        // Lógica existente para pregunta secreta
        const response = await axios.post(
          "http://localhost:3000/recuperar-contrasena",
          {
            curp,
            respuesta: values.respuesta,
          }
        );

        console.log("", response.data);

        if (response.data.success) {
          setDecryptedPassword(response.data.decryptedPassword);
          setKey((prevKey) => prevKey + 1);
          message.success("Datos correctos");
          setShowPasswordUpdate(true);
        } else {
          message.error("Error en la solicitud de recuperación de contraseña.");
        }
      } else if (tipoRecuperacion === "numero") {
        // Verificar que el token ingresado coincida con el token enviado
        if (values.token === tokenEnviado) {
          // Token válido, permitir la actualización de la contraseña
          const response = await axios.post(
            "http://localhost:3000/recuperar-contrasena",
            {
              curp,
              respuesta: values.respuesta,
            }
          );

          console.log("", response.data);

          if (response.data.success) {
            setDecryptedPassword(response.data.decryptedPassword);
            setKey((prevKey) => prevKey + 1);
            message.success("Datos correctos");
            setShowPasswordUpdate(true);
          } else {
            message.error("Datos incorrectos.");
          }
        } else {
          // Token no válido
          message.error("Token incorrecto. Inténtelo de nuevo.");
        }
      }
    } catch (error) {
      message.error("Error en la solicitud de recuperación de contraseña.");
    }
  };

  const onFinishActualizarContraseña = async (values) => {
    try {
      console.log("", values);
      const response = await axios.post(
        "http://localhost:3000/actualizar-contrasena",
        {
          curp,
          contrasenaActual: values.contrasenaActual,
          nuevaContrasena: values.nuevaContrasena,
        }
      );

      console.log("", response.data);
      if (response.data.success) {
        message.success("Contraseña actualizada exitosamente");
        navigate("/Login");
      } else {
        message.error(
          "Error al actualizar la contraseña. Por favor, inténtelo de nuevo."
        );
      }
    } catch (error) {
      console.error(
        "Error al procesar solicitud de actualización de contraseña:",
        error
      );
      message.error(
        "Error al procesar solicitud de actualización de contraseña. Por favor, inténtelo de nuevo."
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(<Contenido conTit={"Completa todos los campos."} />);
  };

  return (
    <>
      <Header />
      <div className="Simon">
        <ScrollToTop />
        <div className="login-box">
          <Subtitulo subTit={"Recuperación de contraseña"} />
          <Contenido conTit={"Paso 2/2: Datos de usuario"} />
          <br></br>

          <Form
            name="Re2Contrasena"
            onFinish={onFinishh}
            onFinishFailed={onFinishFailed}
          >
            {userName ? <Contenido conTit={`Nombre: ${userName}`} /> : null}
            {curp ? <Contenido conTit={`Curp: ${curp}`} /> : null}

            <br></br>

            <Contenido conTit={"Tipo de recuperación:"} />
            <Form.Item
              name="tipoRecuperacion"
              rules={[
                {
                  required: true,
                  message: (
                    <Notificacion noti={"Seleccione un tipo de recuperación"} />
                  ),
                },
              ]}
            >
              <Select
                placeholder={"Ejemplo: Pregunta secreta..."}
                suffixIcon={<IdcardOutlined />}
                onChange={handleRecuperacionChange}
              >
                <Option value="numero">Número de teléfono</Option>
                <Option value="pregunta">Pregunta secreta</Option>
              </Select>
            </Form.Item>

            {tipoRecuperacion === "numero" && (
              <>
                {" "}
                {telefono ? (
                  <Contenido conTit={`Número de telefono: ${telefono}`} />
                ) : null}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Enviar token
                  </Button>
                </Form.Item>
              </>
            )}

            {tipoRecuperacion === "pregunta" && (
              <>
                {tipoPregunta ? <Contenido conTit={`${tipoPregunta}`} /> : null}
                <Form.Item
                  name="respuesta"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Notificacion
                          noti={"Ingrese la respuesta a la pregunta"}
                        />
                      ),
                    },
                    {
                      pattern: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9\s]{3,30}$/,
                      message: "Solo letras, números, longitud entre 3 y 30.",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Ingrese la respuesta"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Enviar
                  </Button>
                </Form.Item>
              </>
            )}
          </Form>

          {/* Condición para mostrar el campo de actualización de contraseña */}
          {showPasswordUpdate && (
            <Form
              name="ActualizarContraseñaForm"
              onFinish={onFinishActualizarContraseña}
              onFinishFailed={onFinishFailed}
            >
              <Contenido conTit={"Nueva contraseña:"} />
              <Form.Item
                name="nuevaContrasena"
                rules={[
                  {
                    required: true,
                    message: (
                      <Notificacion noti={"Ingrese su nueva contraseña"} />
                    ),
                  },
                  {
                    validator: async (_, value) => {
                      try {
                        if (typeof value !== "string") {
                          throw new Error("");
                        }
                        if (/\s/.test(value)) {
                          throw new Error(
                            "La contraseña no puede contener espacios."
                          );
                        }
                        if (!hasMinimumLength(value)) {
                          throw new Error(
                            "La contraseña debe tener al menos 8 caracteres."
                          );
                        }
                        if (!hasUpperCase(value)) {
                          throw new Error(
                            "La contraseña debe contener al menos una letra mayúscula."
                          );
                        }
                        if (!hasLowerCase(value)) {
                          throw new Error(
                            "La contraseña debe contener al menos una letra minúscula."
                          );
                        }
                        if (!hasNumber(value)) {
                          throw new Error(
                            "La contraseña debe contener al menos un número."
                          );
                        }
                        if (!hasSpecialChar(value)) {
                          throw new Error(
                            "La contraseña debe contener al menos un carácter especial."
                          );
                        }
                        return Promise.resolve();
                      } catch (error) {
                        throw new Error(error.message);
                      }
                    },
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Ejemplo: Ejemplo00#"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Actualizar Contraseña
                </Button>
              </Form.Item>
            </Form>
          )}

          <Link to="/ReContraseña">
            <Button type="primary" style={{ marginBottom: "16px" }}>
              Ir atrás
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
