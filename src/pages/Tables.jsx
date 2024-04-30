import axios from "axios";
import { json, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";
import NavBar from "../components/NavBar";

const Tables = () => {
  const router = useNavigate();

  const [empresa, setEmpresa] = useState("");
  const [idEmpresa, setIdEmpresa] = useState([]);
  const [postData, setPostData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    id_helpdesk: 0,
    id_empresa: "",
    modulo: "",
    tipo: "",
    estatus: "",
    solicitud_id_usuario: "",
    tipo_fecha: "SOLICITUD",
  });

  // const [user, setUser] = useState("");
  useEffect(() => {
    const Glb_id_usuario = sessionStorage.getItem("Glb_id_usuario");

    const Glb_nom_id_empresa = sessionStorage
      .getItem("Glb_id_empresa")
      .replace(/^"(.*)"$/, "$1");

    // setUser(Glb_id_usuario);
    setEmpresa(Glb_nom_id_empresa);
    if (
      Glb_id_usuario === "" ||
      Glb_id_usuario === undefined ||
      Glb_id_usuario === null
    ) {
      router("/helpdesk/Login");
    }
  }, []);

  var fecha = new Date(); //Fecha actual
  var month = fecha.getMonth() + 1; //obteniendo mes
  var day = fecha.getDate(); //obteniendo dia
  var year = fecha.getFullYear(); //obteniendo año
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month; //agrega cero si el menor de 10
  var value = year + "-" + month + "-" + day;
  var valueTwo = year + "-" + month + "-" + "01";

  const additionalData = {
    id_empresa: empresa,
    fecha_inicio: valueTwo,
    fecha_fin: value,
  };

  var url =
    "https://voficinatrafico.iccreativa.com/apihelpdesk/webservices/helpdesk.asmx/helpDesk_Sel";

  useEffect(() => {
    const dataToSend = { ...filterCriteria, ...additionalData };
    axios
      .post(url, dataToSend)
      .then((response) => {
        const jsonData = JSON.parse(response.data["d"]);
        setPostData(jsonData);
        setFilteredData(jsonData);
        // console.log(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Empresa

    const dataEmpresa = {
      id_empresa: empresa,
    };

    axios
      .post(
        "https://voficinatrafico.iccreativa.com/apihelpdesk/webservices/helpdesk.asmx/RecuperaEmpresas",
        dataEmpresa
      )
      .then((response) => {
        const jsonData = JSON.parse(response.data["d"]);
        setIdEmpresa(jsonData);
        
        // console.log(jsonData[0].id_empresa);

        // console.log(empresa);
      })
      .catch((error) => {
        idEmpresa.error("Error fetching data:", error);
      });
  }, [empresa, router]);

  const handleFilterChange = (e) => {
    const dataToSend = { ...filterCriteria, ...additionalData };
    const { name, value } = e.target;
    setFilterCriteria({ ...dataToSend, [name]: value });
  };

  const applyFilters = () => {
    axios
      .post(url, filterCriteria)
      .then((response) => {
        const jsonData = JSON.parse(response.data["d"]);
        setFilteredData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const FormatDate = (fecha) => {
    var d = new Date(fecha);

    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var day = d.getUTCDay();

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

    var date = `${day < 10 ? "0" + day : day}/${meses[month]}/${year}`;

    return date;
  };

  return (
    <div>
      <NavBar />
      <div className="flex-1 text-2md font-bold p-4 md:ml-80 ">
        <section className="container mx-auto p-6 font-mono">
          <div className="flex flex-wrap mb-4">
            {empresa === "ICC" ? (
              <select
              name="id_empresa"
              value={filterCriteria.id_usuario}
              onChange={handleFilterChange}
              className="w-full sm:w-1/6 mb-2 sm:mr-2 px-3 py-2 border rounded text-center"
              defaultValue="ICC"
            >
              <option key="ICC" value="ICC" disabled defaultValue>Selecciona una empresa</option>
              {idEmpresa.map((response, index) => (
                <option key={index} value={response.id_empresa}>{response.id_empresa}</option>
              ))}
            </select>            
            ) : (
              <input
                type="text"
                name="id_empresa"
                value={empresa}
                onChange={handleFilterChange}
                className="w-full sm:w-1/6 mb-2  sm:mr-2 px-3 py-2 border rounded text-center"
                placeholder={filterCriteria.id_empresa}
                disabled
              />
            )}
            {/* <input
              type="text"
              name="id_empresa"
              value={filterCriteria.id_empresa}
              onChange={handleFilterChange}
              className="w-full sm:w-1/6 mb-2  sm:mr-2 px-3 py-2 border rounded text-center"
              placeholder="ID Empresa"
            /> */}
            <input
              type="text"
              name="solicitud_id_usuario"
              value={filterCriteria.solicitud_id_usuario}
              onChange={handleFilterChange}
              className="w-full sm:w-1/6 mb-2  sm:mr-2 px-3 py-2 border rounded text-center"
              placeholder="solicitud usuario"
            />
            <select
              name="estatus"
              value={filterCriteria.estatus}
              onChange={handleFilterChange}
              className="w-full sm:w-1/6 mb-2  sm:mr-2 px-3 py-2 border rounded text-center"
            >
              <option value="Abierto">Abierto</option>
              <option value="Cerrado">Cerrado</option>
            </select>
            <input
              type="date"
              name="fecha_inicio"
              value={filterCriteria.fecha_inicio}
              onChange={handleFilterChange}
              className="w-full sm:w-1/6 mb-2  sm:mr-2 px-3 py-2 border rounded text-center"
            />
            <input
              type="date"
              name="fecha_fin"
              value={filterCriteria.fecha_fin}
              onChange={handleFilterChange}
              className="w-full sm:w-1/6 mb-2  sm:mr-2 px-3 py-2 border rounded text-center"
            />

            <button
              onClick={applyFilters}
              className="flex items-center justify-center mb-2  sm:mr-2 w-full sm:w-auto px-3 py-2 border rounded text-center bg-blue-500 text-white hover:bg-blue-600"
            >
              <IoReload className="mr-2" />
              Aplicar
            </button>

            <button
              onClick={() => router("/helpdesk/NewTask")}
              className="flex items-center justify-center mb-2 sm:mr-2 w-full sm:w-auto px-3 py-2 border rounded text-center bg-blue-500 text-white hover:bg-blue-600"
            >
              <MdAddToPhotos className="mr-2" />
              Nueva Tarea
            </button>
          </div>

          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="text-center px-4 py-3">Compañia </th>
                    <th className="text-center px-4 py-3">Asunto</th>
                    <th className="text-center px-4 py-3">Estatus</th>
                    <th className="text-center px-4 py-3">Fecha</th>
                  </tr>
                </thead>

                {/* { console.log(filteredData.length)}  */}
                {/* {console.log(filteredData)} */}

                {filteredData.length > 0 && filteredData[0].regresa > 0 ? (
                  <tbody className="bg-white">
                    {filteredData.map((jsonData) => (
                      <tr
                        className="hover:bg-gray-400 cursor-pointer"
                        key={jsonData.id_helpdesk}
                        onClick={() => {
                          router(`/helpdesk/Tables/${jsonData.id_helpdesk}`);
                        }}
                      >
                        <td className="text-center px-4 py-3">
                          {jsonData.id_empresa}
                        </td>
                        <td className="text-center px-4 py-3">
                          {jsonData.pantalla}
                        </td>
                        <td className="text-center px-4 py-3">
                          {jsonData.estatus}
                        </td>
                        <td className="text-center px-4 py-3">
                          {FormatDate(jsonData.solicitud_fecha)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody className="bg-white">
                    <tr className="flex justify-center">
                      <td className="flex items-center justify-center h-20">
                        <p className="text-center">Sin Datos</p>
                      </td>
                    </tr>
                  </tbody>
                )}

                {/* <tbody className="bg-white">
                  {filteredData.map((jsonData) => (
                    <tr
                      className="hover:bg-gray-400 cursor-pointer"
                      key={jsonData.id_helpdesk}
                      onClick={() => {
                        router(`/helpdesk/Tables/${jsonData.id_helpdesk}`);
                      }}
                    >
                      <td className="text-center px-4 py-3">
                        {jsonData.id_empresa}
                      </td>
                      <td className="text-center px-4 py-3">
                        {jsonData.pantalla}
                      </td>
                      <td className="text-center px-4 py-3">
                        {jsonData.estatus}
                      </td>
                      <td className="text-center px-4 py-3">
                        {FormatDate(jsonData.solicitud_fecha)}
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tables;
