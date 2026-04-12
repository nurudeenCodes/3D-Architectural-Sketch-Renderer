import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import { Button } from "~/components/ui/Button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "3D ArchSketch RendereR" },
    {
      name: "description",
      content:
        "Easily convert your 2D architectural designs/sketches into stunning 3D renders.",
    },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>Welcome to 3D ArchSketch RendereR!</p>
        </div>

        <h1>
          Transform Your 2D Architectural Designs into Stunning 3D
          visualizations
        </h1>

        <p className="subtitle">
          3D ArchSketch RendereR is an AI-powered tool that easily converts your
          2D architectural designs into stunning 3D visualizations at the speed
          of light!
        </p>

        <div className="actions">
          <a href="#upload" className="cta">
            Start building <ArrowRight className="icon" />
          </a>
          <Button variant="secondary" size="lg" className="demo">
            View Demo
          </Button>
        </div>

        <div id="upload" className="upload-shell">
          <div className="grid-overlay" />

          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>
              <h2>Upload Your Floor plan Design</h2>
              <p>Supports JPG, PNG, formats up to 10MB </p>
            </div>
            <p>Upload images</p>
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>
                Your latest work and shared community projects, all in one place.
              </p>
            </div>
          </div>

          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img
                  src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png"
                  alt="Project preview"
                  className="preview-image"
                />
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>

              <div className="card-body">
                <div>
                  <h3>Modern Living Room</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span>{new Date().toLocaleDateString()}</span>
                    <span>By @john_doe</span>
                  </div>
                </div>
                
                <div className="arrow">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
