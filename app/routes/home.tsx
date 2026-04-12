import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "3D ArchSketch RendereR" },
    { name: "description", content: "Easily convert your 2D architectural designs/sketches into stunning 3D renders." },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar />
    </div>
);
}
