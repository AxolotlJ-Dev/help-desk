import Card from "@/components/Card";
import Table from "@/components/Table";
import React from "react";

const page = () => {
  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="text-center px-4 py-3">Compañia</th>
                  <th className="text-center px-4 py-3">Asunto</th>
                  <th className="text-center px-4 py-3">Estatus</th>
                  <th className="text-center px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <Table />
                
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
