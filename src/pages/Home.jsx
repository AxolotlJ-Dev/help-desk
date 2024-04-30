import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const Home = () => {
  // https://voficinatrafico.iccreativa.com/apihelpdesk/webservices/helpdesk.asmx
  const navigate = useNavigate()

  const [idUsuario, setIdUsuario] = useState("");

  useEffect(() => {
    const Glb_id_usuario = sessionStorage
      .getItem("Glb_id_usuario")
      // .replace(/^"(.*)"$/, "$1");

      if ( Glb_id_usuario == null) {
        navigate("/helpdesk/Login");
      } else {
        Glb_id_usuario.replace(/^"(.*)"$/, "$1");
      }

    if (
      Glb_id_usuario === "" ||
      Glb_id_usuario === undefined ||
      Glb_id_usuario === null
    ) {
      navigate("/helpdesk/Login");
    }
    setIdUsuario(Glb_id_usuario);
  }, [navigate]);

  return (
    <div>
      <NavBar />
      <div className="flex-1 text-2md font-bold p-4 md:ml-80 h-screen justify-center items-center flex  ">
        <img
          className="max-h-80 px-5 h-auto max-w-full"
          src={logo}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default Home;
