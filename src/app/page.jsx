import Card from "@/components/Card";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" ">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <Card />
        
      </div>
    </main>
  );
}
