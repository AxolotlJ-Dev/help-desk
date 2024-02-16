"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaLock, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  var router = useRouter()

  const onSubmit = (data) => {
    const formData = {
        id_empresa: "ICC",
        app: "VOficina.Integral",
        id_usuario: data.id_usuario,
        pass: data.pass,
        Version: "5.0",
    };

    console.log(data.id_usuario)
    console.log(data.pass)
    // localStorage.setItem("formularioData", JSON.stringify(data));
    // localStorage.setItem("isLoggedIn", true);

    axios.post(
        "https://voficinatrafico.iccreativa.com/crecepruebaapp/WebServices/Seguridad.asmx/App_Login",
        formData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    .then(response => {
        localStorage.setItem("formularioData", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        router.push("/");
        console.log(response)
    })
    .catch(error => {
        console.error("Error al iniciar sesión:", error);
    });
};


  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">ICC</h1>
          <p className="text-white mt-1">
            The most popular peer to peer lending at SEA
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        {/* form code */}
        <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

          {/* campo */}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <FaUser className="text-gray-400" />
            <input
              className="pl-2 outline-none border-none"
              type="text"
              id="id_usuario"
              placeholder="Usuario"
              {...register('id_usuario', { required: true })}
            />
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <FaLock className="text-gray-400" />
            <input
              className="pl-2 outline-none border-none"
              type="text"
              id="pass"
              placeholder="Contraseña"
              {...register('pass', { required: true })}
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
