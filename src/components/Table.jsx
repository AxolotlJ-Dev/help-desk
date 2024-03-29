import React from "react";

const Table = ({ name, empresa, asunto, estatus, fecha }) => {
  return (
    <tr className="text-gray-700">
      <td className="px-4 py-3 border ">
        <div className="flex items-center text-sm">
          {/* <div className="relative w-8 h-8 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full rounded-full"
              src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt=""
              loading="lazy"
            />
            <div
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div> */}
          <div>
            <p className="font-semibold text-black">{ name }</p>
            <p className="text-xs text-gray-600">{ empresa }</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-ms font-semibold border">{asunto}</td>
      <td className="px-4 py-3 text-xs border">
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
          {estatus}
        </span>
      </td>
      <td className="px-4 py-3 text-sm border">{fecha}</td>
    </tr>
  );
};

export default Table;
