"use client"
import Card from "@/components/Card";
import Login from "@/components/Login";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
  const Glb_id_usuario = sessionStorage.getItem("Glb_id_usuario");
  console.log(Glb_id_usuario)

  if( Glb_id_usuario == "" || Glb_id_usuario == undefined || Glb_id_usuario == null) {
    router.push("/Login")
  }
  }, [])

  const convertBase64 = (archivos) => {
    Array.from(archivos).forEach(archivos => {
      var reader = new FileReader();
      reader.readAsDataURL(archivos);
      reader.onload = function(){
        var arrayAuxiliar = [];
        var base64 = reader.result;
        arrayAuxiliar = base64.split(',')
        console.log(base64);
      }
    });
  }

  return (
    <main className=" ">

      {/* <Login /> */}
      <NavBar />
      <div className="flex-1 text-2md font-bold p-4 md:ml-80 ">
 <input type="file" multiple onChange={(e) => convertBase64(e.target.files)} />
      </div>

     


    </main>
  );
}
