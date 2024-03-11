import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const NewTask = () => {
  const navigate = useNavigate()
  const [idUsuario, setIdUsuario] = useState("");
  const [idEmpresa, SetidEmpresa] = useState("");

  const [crmTipos, setCrmTipos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  // const [base64Image, setBase64Image] = useState('');

  // const [image, setImage] = useState("");

  useEffect(() => {
    const Glb_id_usuario = sessionStorage
      .getItem("Glb_id_usuario")
      .replace(/^"(.*)"$/, "$1");

    if (
      Glb_id_usuario === "" ||
      Glb_id_usuario === undefined ||
      Glb_id_usuario === null
    ) {
      navigate("/helpdesk/Login");
    }

    const Glb_id_empresa = sessionStorage
      .getItem("Glb_id_empresa")
      .replace(/^"(.*)"$/, "$1");

    SetidEmpresa(Glb_id_empresa);
    setIdUsuario(Glb_id_usuario);
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const additionalData = {
      estatus: "ABIERTO",
      atencion_id_usuario: "",
      solicitud_id_usuario: idUsuario,
    };

    const dataToSend = { ...data, ...additionalData };

    // console.log("Data to send:", dataToSend);

    const promise = axios.post(
      "https://localhost:7093/api/CrearTarea",
      dataToSend,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.promise(promise, {
      loading: "Cargando...",
      success: (success) => {
        if (success.data.regresa > 0) {
          processFile(success.data);
          // console.log(success.data);
          reset();
          setTimeout(() => {
            navigate("/helpdesk/Tables");
          }, 2000);

          return "TAREA CREADA";
        } else {
          return success.data.msj;
        }
      },
      error: (error) => "Error: " + error.toString(),
    });

    // const s = async (s) => {
    //   axios.post(
    //     `https://localhost:7093/api/${s}`
    //   )
    // }

    // Imagenes

    const file = data.foto[0];

    const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const base64 = fileReader.result;
          const base64WithoutPrefix = base64.replace(
            /^data:image\/[a-z]+;base64,/,
            ""
          );
          resolve(base64WithoutPrefix);
        };
        fileReader.readAsDataURL(file);
      });
    };

    const processFile = async (params) => {
      const base64 = await readFileAsDataURL(file);
      const additionalDataImage = {
        id_empresa: idEmpresa,
        tabla: "HELPDESK",
        movimiento: params.id_helpdesk.toString(),
        renglon: 1,
        foto: base64,
        id_usuario: idUsuario,
        extencion: "jpg",
      };
      // console.log(additionalDataImage);

      const promiseImg = axios.post(
        "https://localhost:7093/api/insertarImagenes",
        additionalDataImage,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.promise(promiseImg, {
        loading: "Subiendo Imagen...",
        success: (success) => {
          if (success.data.regresa > 0) {
            // console.log("s", data);
            return "Imagen subida";
          } else {
            return success.data.msj;
          }
        },
        error: (error) => "Error: " + error.toString(),
      });
    };

    //https://localhost:7093/api/insertarImagenes
  };

  useEffect(() => {
    if (idEmpresa) {
      const dataCrm = {
        grupo: "INCIDENCIAS",
        sw_todos: false,
      };

      const dataEmpresa = {
        id_empresa: idEmpresa,
      };

      const dataSucursal = {
        id_empresa: idEmpresa,
        id_sucursal: "",
      };
      // Crm
      axios
        .post("https://localhost:7093/api/CRM_Tipos", dataCrm)
        .then((response) => {
          setCrmTipos(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      // Empresa
      axios
        .post("https://localhost:7093/api/Empresas", dataEmpresa)
        .then((response) => {
          setEmpresas(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      // Sucursal
      axios
        .post("https://localhost:7093/api/Sucursales", dataSucursal)
        .then((response) => {
          setSucursales(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [idEmpresa]);

  return (
    <div>
      <NavBar />
      <div className="flex-1 text-2md font-bold p-4 md:ml-80 ">
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
                <select
                  id="id_empresa"
                  className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  {...register("id_empresa", { required: true })}
                >
                  {empresas.map((response, index) => (
                    <option key={index}>{response.id_empresa}</option>
                  ))}
                </select>
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
                <select
                  id="id_sucursal"
                  className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  {...register("id_sucursal", { required: true })}
                >
                  {sucursales.map((response, index) => (
                    <option key={index}>{response.id_sucursal}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tipo */}
            <div>
              <label
                htmlFor="Tipos"
                className="block text-sm font-semibold leading-6 text-black"
              >
                Tipo
              </label>
              <div className="mt-2.5">
                <select
                  id="Tipos"
                  className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  {...register("Tipo", { required: true })}
                >
                  {crmTipos.map((response, index) => (
                    <option key={index}>{response.valor}</option>
                  ))}
                </select>
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
                {errors.modulo && <p className="text-red-600"  >Campo Requerido</p>}
              </div>
            </div>

            {/* pantalla */}
            <div>
              <label
                htmlFor="pantalla"
                className="block text-sm font-semibold leading-6 text-black"
              >
                Pantalla
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  id="pantalla"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  {...register("pantalla", { required: true })}
                />
                {errors.pantalla && <p className="text-red-600"  >Campo Requerido</p>}
              </div>
            </div>

            {/* Movimiento */}
            <div>
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
                {errors.movimiento && <p className="text-red-600"  >Campo Requerido</p>}
              </div>
            </div>

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
                {errors.asunto && <p className="text-red-600"  >Campo Requerido</p>}
              </div>

              {/* imagenes */}
              <div className="mt-5">
                <label className="block text-sm font-medium text-black">
                  Imagen
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
                        htmlFor="foto"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <input
                          id="foto"
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
                          {...register("foto", { required: true })}
                          // multiple
                        />
                      </label>
                      
                    </div>

                    <p className="text-xs text-black">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              {errors.foto && <p className="text-red-600" >Campo Requerido</p>}
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Crear Tarea
            </button>
          </div>
        </form>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default NewTask;
