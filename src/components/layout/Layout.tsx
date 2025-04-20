
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EmergencyButton from "../emergency/EmergencyButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-16 py-8">{children}</main>
      <div className="fixed bottom-6 right-6 z-40">
        <EmergencyButton />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
