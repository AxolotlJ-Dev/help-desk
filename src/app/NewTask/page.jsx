"use client";

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const additionalData = {
      pantalla: '',
      movimiento: '',
      estatus: 'ABIERTO',
      atencion_id_usuario: '',
    }; 
  
    const dataToSend = { ...data, ...additionalData };
  
    console.log('Data to send:', dataToSend);
  
    axios.post(
      'https://localhost:7093/api/InsertarCliente',
      dataToSend,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      console.log('Respuesta del Servidor:', response.data);
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error.response.data);
    });
  };



  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Empresa */}
          <div>
            <label
              htmlFor="id_empresa"
              className="block text-sm font-semibold leading-6 text-black"
            >
              Empresa
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="id_empresa"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                {...register("id_empresa", { required: true })}
              />
            </div>
          </div>

          {/* Sucursal */}
          <div>
            <label
              htmlFor="id_sucursal"
              className="block text-sm font-semibold leading-6 text-black"
            >
              Sucursal
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="id_sucursal"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                {...register("id_sucursal", { required: true })}
              />
            </div>
          </div>

          {/* Tipo */}
          <div>
            <label
              htmlFor="tipo"
              className="block text-sm font-semibold leading-6 text-black"
            >
              Tipo
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="tipo"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                {...register("tipo", { required: true })}
              />
              {errors.tipo && <p className="text-red-900"></p>}
            </div>
          </div>

          {/* Sucursal */}
          <div>
            <label
              htmlFor="modulo"
              className="block text-sm font-semibold leading-6 text-black"
            >
              Modulo
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="modulo"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                {...register("modulo", { required: true })}
              />
            </div>
          </div>

          {/* pantalla */}
          {/* <div>
            <label
              htmlFor="pantalla"
              className="block text-sm font-semibold leading-6 text-black"
            >
              pantalla
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="pantalla"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                {...register("pantalla", { required: true })}
              />
            </div>
          </div> */}

          {/* Movimiento */}
          {/* <div>
            <label
              htmlFor="movimiento"
              className="block text-sm font-semibold leading-6 text-black"
            >
              Movimiento
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="movimiento"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                {...register("movimiento", { required: true })}
              />
            </div>
          </div> */}

          {/* Asunto*/}
          {/* <div className="sm:col-span-2">
            <label
              htmlFor="asunto"
              className="block text-sm font-semibold leading-6 text-black"
            >
              Asunto
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="asunto"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                {...register("asunto", { required: true })}
              />
            </div>
          </div> */}

          <div className="sm:col-span-2">
            <label
              htmlFor="asunto"
              className="block text-sm font-semibold leading-6 text-green-600"
            >
              Asunto
            </label>
            <div className="mt-2.5">
              <textarea
                id="asunto"
                rows="4"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("asunto", { required: true })}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-black"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <input
                        id="file-upload"
                        className="block w-full text-sm text-gray-500
                        file:rounded-lg file:border-0
                        file:me-4 file:py-2 file:px-4
                      file:bg-blue-600 file:text-white
                        file:text-sm file:font-semibold
                        file:disabled:opacity-50 file:disabled:pointer-events-none
                      hover:file:bg-blue-700
                      dark:file:bg-blue-500
                      dark:hover:file:bg-blue-400"
                        type="file"
                        {...register("file", { required: true })}
                      />
                    </label>
                  </div>

                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
