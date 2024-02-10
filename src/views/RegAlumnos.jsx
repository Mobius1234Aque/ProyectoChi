import React from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Subtitulo, Titulo } from "../components/Titulos";
import "../css/reg.css";
import logo from "../img/imagenDos.jpg";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const props = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  maxCount: 1, // Permitir solo un archivo
  onChange(info) {
    const { status, response } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(
        `${info.file.name} El documento cargó de manera correcta.`
      );
    } else if (status === "error") {
      if (response && response.status === 400) {
        message.error(
          `${info.file.name} Error 400: Solicitud incorrecta. Verifique sus datos.`
        );
      } else {
        message.error(`${info.file.name} No logró subirse el documento.`);
      }
    }
  },
  beforeUpload(file) {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("Por favor, suba solo archivos PDF.");
    }
    return isPDF;
  },
};

export function Regalu() {
  return (
    <>
      <Header />
      <Titulo tit={"Registrar alumnos"} />

      <div className="conReg">
        <div className="contenedor">
          <img src={logo} alt="" />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="regele">
          <span>Seleccionar archivo con lista de alumnos</span>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click aquí para subir su lista de alumnos (Solo PDF)
            </p>
            <p className="ant-upload-hint">
              Si llega a presentar algún problema con la subida de su documento,
              no dude en pedir ayuda y soporte; se tratará de dar solución lo
              antes posible.
            </p>
          </Dragger>
          <span className="a">
            <Link to={"/"} className="link">
              registrar
            </Link>
          </span>
          <br />
          <br />
          <br />
        </div>
        <div className="contenedor">
          <img src={logo} alt="" />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>

      <Footer />
    </>
  );
}
