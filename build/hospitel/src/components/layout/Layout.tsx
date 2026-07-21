import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AIChatbot } from "../AIChatbot";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <Outlet />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}
