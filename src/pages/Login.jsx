import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const router = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const [isShow, setIsShow] = useState(true);

  const onSubmit = (data) => {
    // console.log(data)
    const formData = {
      id_empresa: "ICC",
      app: "VOficina.Integral",
      id_usuario: data.id_usuario,
      pass: data.pass,
      Version: "5.0",
    };

    axios
      .post(
        "https://voficinatrafico.iccreativa.com/apihelpdesk/webservices/helpdesk.asmx/App_Login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        let jsonData = JSON.parse(response.data["d"]);
        jsonData = jsonData[0];
        sessionStorage.setItem(
          "Glb_id_usuario",
          JSON.stringify(jsonData.id_usuario)
        );
        sessionStorage.setItem(
          "Glb_id_empresa",
          JSON.stringify(jsonData.nom_id_empresa)
        );
        // console.log(response.data.regresa);
        if (jsonData.regresa > 0) {
          toast.success("Bienvenido!!");
          router("/helpdesk/");
          reset();
        } else {
          toast.error(jsonData.msj);
          sessionStorage.setItem("Glb_id_usuario", "");
          sessionStorage.setItem("Glb_id_empresa", "");
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        sessionStorage.setItem("Glb_id_usuario", "");
        sessionStorage.setItem("Glb_id_empresa", "");
      });
  };

  return (
    <div className="h-screen md:flex ">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>

          {/* <h1 className="text-white font-bold text-4xl font-sans">ICC</h1>
          <h1 className="text-white font-bold text-3xl font-sans">Ingenieria Computacional Creativa <br /> S.A. de C.V</h1> */}

          {/* <p className="text-white mt-1">
            The most popular peer to peer lending at SEA
          </p> */}
          <img className="h-full w-full" src={require("../images/logo.png")} alt="Logo" />
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 h-screen justify-center py-10 items-center bg-white">
        {/* form code */}
        <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1 ">
            Hola De Nuevo!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Ingeniería Computacional Creativa
          </p>

          {/* campo */}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <FaUser className="text-gray-400" />
            <input
              className="pl-2 outline-none border-none"
              type="text"
              id="id_usuario"
              placeholder="Usuario"
              {...register("id_usuario", { required: true })}
            />
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <FaLock className="text-gray-400" />
            <input
              className="pl-2 outline-none border-none"
              type={isShow ? "password" : "text"}
              id="pass"
              placeholder="Contraseña"
              {...register("pass", { required: true })}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsShow(!isShow);
              }}
            >
              {isShow === true ? (
                <FaEye className="text-gray-400" />
              ) : (
                <FaEyeSlash className="text-gray-400" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Entrar
          </button>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Login;
