import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Login from "@/components/Login";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Help desk",
  description: "ICC",
};

export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <body className={` ${inter.className} bg-gray-100 ` }>
       {children}
      
      </body>
    </html>
  );
}
