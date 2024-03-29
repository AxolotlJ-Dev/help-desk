"use client";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const Page = ({ params }) => {
  const [user, setUser] = useState("");

  const router = useRouter();

  useEffect(() => {
    const Glb_id_usuario = sessionStorage
      .getItem("Glb_id_usuario")
      .replace(/^"(.*)"$/, "$1");
    setUser(Glb_id_usuario);
    // console.log(Glb_id_usuario);

    if (
      Glb_id_usuario == "" ||
      Glb_id_usuario == undefined ||
      Glb_id_usuario == null
    ) {
      router.push("/Login");
    }
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const idUsuarioActual = user;

  const [postData, setPostData] = useState({}); // Cambiando a objeto vacío
  const [mensajes, setMensajes] = useState([]);
  const [sendMensaje, setSendMensaje] = useState();

  const url = "https://localhost:7093/api/MostrarTareas";

  const requestData = {
    id_helpdesk: params.id,
    id_empresa: "",
    modulo: "",
    tipo: "",
    estatus: "",
    solicitud_id_usuario: "",
    fecha_inicio: "1900-01-01",
    fecha_fin: "2026-01-31",
    tipo_fecha: "SOLICITUD",
  };

  useEffect(() => {
    axios
      .post(url, requestData)
      .then((response) => {
        setPostData(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // mensajes
  const urlMensaje = "https://localhost:7093/api/MostrarMensaje";

  const requestDataMensajes = {
    id_helpdesk: params.id,
    id_usuario: idUsuarioActual,
  };

  // mensajes
  useEffect(() => {
    const IntervaId = setInterval(() => {
      axios
        .post(urlMensaje, requestDataMensajes)
        .then((response) => {
          setMensajes(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 1000);

    return () => clearInterval(IntervaId);
  }, [sendMensaje]);

  // send menssage
  const onSubmit = (data) => {
    const additionalData = {
      id_helpdesk: params.id,
      id_helpdeskdet: 0,
      tipo: "",
      id_usuario: idUsuarioActual,
      estatus: "",
    };

    const dataToSend = { ...data, ...additionalData };

    console.log("Data to send:", dataToSend);

    axios
      .post("https://localhost:7093/api/InsertarMensaje", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSendMensaje(response.data);
        console.log("Respuesta del Servidor:", response.data);
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error.response);
      });
    reset();
  };

  const FormatDate = (fecha) => {
    var d = new Date(fecha);

    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var day = d.getUTCDate(); // Cambiado de getUTCDay() a getUTCDate()

    var meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    // Asegúrate de que el día y el mes se muestren correctamente
    var date = `${day < 10 ? "0" + day : day}/${meses[month]}/${year}`;

    return date;
  };

  const FormatDateMensa = (fecha) => {
    var d = new Date(fecha);

    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var day = d.getUTCDate();
    var hour = d.getUTCHours();
    var min = d.getUTCMinutes();

    var meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    var date = `${day < 10 ? "0" + day : day}/${meses[month]}/${year} ${
      hour < 10 ? "0" + hour : hour
    }:${min < 10 ? "0" + min : min}`;

    return date;
  };

  return (
    <div>
      <NavBar />
      <div className=" flex-1 text-2md font-bold p-4 md:ml-80 ">
        <div className="font-sans">
          <div className="container mx-auto py-8 px-4">
            <h2 className="text-xl font-semibold mt-4 mb-2">Informacion</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between flex-col sm:flex-row  font-semibold">
                <h1 className="text-3xl font-semibold">
                  {postData.id_empresa}
                </h1>
                <p className="text-gray-600 font-semibold">
                  {FormatDate(postData.solicitud_fecha)}
                </p>
              </div>

              <p className="text-gray-600">{postData.solicitud_id_usuario}</p>
              <p className="text-gray-600">Modulo: {postData.modulo}</p>
              <p className="text-gray-600">Estatus: {postData.estatus}</p>
              <p className="text-gray-600">Modulo: {postData.modulo}</p>
              <p className="text-gray-600">Sucursal: {postData.id_sucursal}</p>
              <p className="text-gray-600">Tipo: {postData.tipo} </p>

              <hr className="my-4" />

              <h2 className="text-xl font-semibold mt-4 mb-2">Pantalla</h2>
              <div className="mb-4">
                <p className="text-gray-700">{postData.pantalla}</p>
              </div>

              <hr className="my-4" />

              <h2 className="text-xl font-semibold mt-4 mb-2">Asunto</h2>
              <div className="mb-4">
                <p className="text-gray-700">{postData.asunto}</p>
              </div>

              {/* <h2 className="text-xl font-semibold mt-4 mb-2">Education</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-gray-700">University of Example</p>
              <p className="text-gray-600">Graduated in May 2018</p>
            </div> */}
            </div>
          </div>
        </div>

        {/* mensajes */}

        <div className="container mx-auto py-8 px-4">
          <h2 className="text-xl font-semibold mt-4 mb-2">Mensajes</h2>
          <div className="bg-white rounded-lg border border-black shadow-lg">
            <div className="flex-1 overflow-auto">
              <div className="flex justify-center mb-2">
                <div className="rounded py-2 px-4">
                  <p className="text-lg uppercase">
                    {FormatDate(postData.solicitud_fecha)}
                  </p>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <div className="rounded py-2 px-4">
                  <p className="text-xs text-center">
                    Somos una empresa con más de 20 años construyendo soluciones
                    robustas para los negocios de México, dedicada a la
                    Consultoría y el Desarrollo de Software Empresarial, para
                    brindar las mejores innovaciones tecnologicas.
                  </p>
                </div>
              </div>

              <div className="py-2 px-3  overflow-x-auto h-[50vh]">
                <div className="justify-center content-center w-full flex mb-10 ">
                  {postData.foto != "" ? (
                    <div>
                      <img
                        className=" bg-blue-700 h-max-[500px] w-max-[500px] "
                        src={`data:image/${postData.extencion};base64,${postData.foto}`}
                        alt="imagen"
                      />
                      
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {mensajes.map((response, index) => (
                  <div
                    className={`flex mb-2 ${
                      response.id_usuario !== idUsuarioActual
                        ? ""
                        : "justify-end"
                    } `}
                    key={index}
                  >
                    <div
                      className={`rounded py-2 px-3 w-96 
                      ${
                        response.estatus == "LEIDO"
                          ? response.id_usuario !== idUsuarioActual
                            ? "bg-green-400 mr-6"
                            : "bg-red-400 ml-6"
                          : response.id_usuario !== idUsuarioActual
                          ? "bg-green-200 mr-6"
                          : "bg-red-200 ml-6"
                      }
                        } 
                     
                      
                      
                      `}
                    >
                      {response.id_usuario !== idUsuarioActual ? (
                        <p className="text-sm">{response.id_usuario}</p>
                      ) : (
                        ""
                      )}

                      <p>{response.mensaje}</p>

                      {response.id_usuario !== idUsuarioActual ? (
                        <p className="text-right text-xs text-grey-dark mt-1">
                          {FormatDateMensa(response.fum)}
                        </p>
                      ) : (
                        <div className="flex justify-between flex-col sm:flex-row  font-semibold">
                          <p className="text-right text-xs text-grey-dark mt-1">
                            {FormatDateMensa(response.fum)}
                          </p>
                          <p className="text-right text-xs text-grey-dark mt-1">
                            {response.estatus == "LEIDO" ? (
                              <span className="flex">
                                <FaCheck />
                                <FaCheck />
                              </span>
                            ) : (
                              <FaCheck />
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              className="flex items-center m-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-1 ">
                <input
                  className="w-full border border-gray-700 rounded px-2 py-2"
                  type="text"
                  id="mensaje"
                  {...register("mensaje", { required: true })}
                />
              </div>
              <button className="text-3xl ml-2">
                <IoIosSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
