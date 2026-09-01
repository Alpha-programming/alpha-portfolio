import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../navbar/navbar";
import { API_URL } from "../../../api/api";

import "./projects.scss";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/projects/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        return response.json();
      })
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Projects loading error:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  const regularProjects = projects.filter(
    (project) => !project.featured
  );

  return (
    <>
      <Navbar />

      <main className="projects">
        <div className="projects__glow projects__glow--one"></div>
        <div className="projects__glow projects__glow--two"></div>

        <div className="container projects__container">

          <section className="projects__hero">
            <p className="projects__eyebrow">
              SELECTED WORK
            </p>

            <h1>
              Projects I've
              <span> built.</span>
            </h1>

            <p className="projects__intro">
              A collection of backend applications, APIs, Telegram
              bots, web projects, testing work and software tools
              built while learning and developing my skills.
            </p>

            {!loading && !error && (
              <div className="projects__stats">
                <div>
                  <strong>{projects.length}</strong>
                  <span>PROJECTS</span>
                </div>

                <div>
                  <strong>{featuredProjects.length}</strong>
                  <span>FEATURED</span>
                </div>
              </div>
            )}
          </section>

          {loading && (
            <div className="projects__state">
              <span className="projects__loader"></span>
              <p>Loading projects...</p>
            </div>
          )}

          {!loading && error && (
            <div className="projects__state">
              <h2>Unable to load projects.</h2>

              <p>
                Check that the Django server is running and try
                again.
              </p>
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="projects__empty">
              <span>NO PROJECTS YET</span>

              <h2>
                Projects will appear here.
              </h2>

              <p>
                Add projects through Django Admin and they will
                automatically appear on this page.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            featuredProjects.length > 0 && (
              <section className="projects__section">

                <div className="projects__section-title">
                  <span>01</span>

                  <div>
                    <p>FEATURED</p>
                    <h2>Selected Projects</h2>
                  </div>
                </div>

                <div className="projects__featured-grid">

                  {featuredProjects.map((project, index) => (
                    <FeaturedProject
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}

                </div>

              </section>
            )}

          {!loading &&
            !error &&
            regularProjects.length > 0 && (
              <section className="projects__section">

                <div className="projects__section-title">
                  <span>
                    {featuredProjects.length > 0 ? "02" : "01"}
                  </span>

                  <div>
                    <p>ALL WORK</p>
                    <h2>More Projects</h2>
                  </div>
                </div>

                <div className="projects__grid">

                  {regularProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}

                </div>

              </section>
            )}

        </div>
      </main>
    </>
  );
}

function FeaturedProject({ project, index }) {
  return (
    <article className="featured-project">

      <Link
        to={`/projects/${project.slug}`}
        className="featured-project__visual"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
          />
        ) : (
          <div className="featured-project__placeholder">

            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            <strong>
              {project.title}
            </strong>

            <small>ALPHA PROJECT</small>

          </div>
        )}

        <div className="featured-project__number">
          {String(index + 1).padStart(2, "0")}
        </div>
      </Link>

      <div className="featured-project__content">

        <div className="featured-project__top">

          <p>
            {project.category || "PROJECT"}
          </p>

          <span>
            FEATURED
          </span>

        </div>

        <h2>
          {project.title}
        </h2>

        <p className="featured-project__description">
          {project.short_description}
        </p>

        <div className="featured-project__skills">

          {project.skills?.slice(0, 5).map((skill) => (
            <span key={skill.id}>
              {skill.name}
            </span>
          ))}

        </div>

        <div className="featured-project__bottom">

          <Link to={`/projects/${project.slug}`}>
            View Project
            <span>→</span>
          </Link>

          <div className="featured-project__links">

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
              >
                Demo ↗
              </a>
            )}

            {project.telegram_url && (
              <a
                href={project.telegram_url}
                target="_blank"
                rel="noreferrer"
              >
                Telegram ↗
              </a>
            )}

          </div>

        </div>

      </div>

    </article>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card">

      <Link
        to={`/projects/${project.slug}`}
        className="project-card__visual"
      >

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
          />
        ) : (
          <div className="project-card__placeholder">

            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            <strong>
              {project.title}
            </strong>

          </div>
        )}

      </Link>

      <div className="project-card__body">

        <div className="project-card__category">
          {project.category || "PROJECT"}
        </div>

        <h3>
          {project.title}
        </h3>

        <p>
          {project.short_description}
        </p>

        <div className="project-card__skills">

          {project.skills?.slice(0, 4).map((skill) => (
            <span key={skill.id}>
              {skill.name}
            </span>
          ))}

        </div>

        <div className="project-card__footer">

          <Link to={`/projects/${project.slug}`}>
            View Project
            <span>→</span>
          </Link>

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          )}

        </div>

      </div>

    </article>
  );
}

export default Projects;