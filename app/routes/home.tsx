import { Outlet } from "react-router";
import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Portfolio" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
