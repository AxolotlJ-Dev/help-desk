"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";

const Page = () => {
  const router = useRouter();

  var fecha = new Date(); //Fecha actual
  var month = fecha.getMonth()+1; //obteniendo mes
  var day = fecha.getDate(); //obteniendo dia
  var year = fecha.getFullYear(); //obteniendo año
  if(day<10)
    day='0'+day;
  if(month<10)
  month='0'+month //agrega cero si el menor de 10
  var value = year+"-"+month+"-"+day;
  var valueTwo = year+"-"+month+"-"+"01";
  

  const [postData, setPostData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    id_empresa: "",
    modulo: "",
    tipo: "",
    estatus: "",
    solicitud_id_usuario: "",
    fecha_inicio: valueTwo,
    fecha_fin: value,
    tipo_fecha: "SOLICITUD",
  });

  const url = "https://localhost:7093/api/clientes";

  useEffect(() => {
    axios
      .post(url, filterCriteria)
      .then((response) => {
        setPostData(response.data);
        setFilteredData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const applyFilters = () => {
    axios
      .post(url, filterCriteria)
      .then((response) => {
        setFilteredData(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  

  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
        <div className="flex flex-wrap mb-4">
          <input
            type="text"
            name="id_empresa"
            value={filterCriteria.id_empresa}
            onChange={handleFilterChange}
            className="w-full sm:w-1/6 mb-2  sm:mr-2 px-3 py-2 border rounded text-center"
            placeholder="ID Empresa"
          />
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
            onClick={() => router.push("/NewTask")}
            className="flex items-center justify-center mb-2 sm:mr-2 w-full sm:w-auto px-3 py-2 border rounded text-center bg-blue-500 text-white hover:bg-blue-600"
          >
            <MdAddToPhotos className="mr-2" />
            New Task
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
              <tbody className="bg-white">
                {filteredData.map((response) => (
                  <tr className="hover:bg-gray-400" key={response.id_helpdesk}>
                    <td className="text-center px-4 py-3">
                      {response.id_empresa}
                    </td>
                    <td className="text-center px-4 py-3">
                      <Link href={`/Tables/${response.id_helpdesk}`}>
                        {response.asunto}
                      </Link>
                    </td>
                    <td className="text-center px-4 py-3">
                      {response.estatus}
                    </td>
                    <td className="text-center px-4 py-3">
                      {response.solicitud_fecha}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
