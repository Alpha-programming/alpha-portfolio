import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../navbar/navbar";
import { API_URL } from "../../../api/api";

import "./project_detail.scss";

function ProjectDetail() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`${API_URL}/api/projects/${slug}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Project not found");
        }

        return response.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Project detail error:", error);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="project-detail project-detail--state">
          <div className="container">
            <span className="project-detail__loader"></span>
            <p>Loading project...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />

        <main className="project-detail project-detail--state">
          <div className="container">
            <p className="project-detail__eyebrow">
              PROJECT NOT FOUND
            </p>

            <h1>
              Something went
              <span> wrong.</span>
            </h1>

            <p>
              The project could not be loaded or does not exist.
            </p>

            <Link
              to="/projects"
              className="project-detail__back-button"
            >
              ← Back to Projects
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="project-detail">
        <div className="project-detail__glow project-detail__glow--one"></div>
        <div className="project-detail__glow project-detail__glow--two"></div>

        <div className="container project-detail__container">

          <Link
            to="/projects"
            className="project-detail__back"
          >
            <span>←</span>
            All Projects
          </Link>

          <section className="project-detail__hero">

            <div className="project-detail__hero-content">

              <div className="project-detail__meta-top">

                <span>
                  {project.category || "PROJECT"}
                </span>

                {project.featured && (
                  <strong>
                    FEATURED
                  </strong>
                )}

              </div>

              <h1>
                {project.title}
              </h1>

              <p className="project-detail__intro">
                {project.short_description}
              </p>

              <div className="project-detail__skills">

                {project.skills?.map((skill) => (
                  <span key={skill.id}>
                    {skill.name}
                  </span>
                ))}

              </div>

              <div className="project-detail__actions">

                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="project-detail__primary"
                  >
                    Live Demo
                    <span>↗</span>
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="project-detail__secondary"
                  >
                    GitHub
                    <span>↗</span>
                  </a>
                )}

                {project.telegram_url && (
                  <a
                    href={project.telegram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="project-detail__secondary"
                  >
                    Telegram
                    <span>↗</span>
                  </a>
                )}

              </div>

            </div>

            <div className="project-detail__visual">

              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                />
              ) : (
                <div className="project-detail__placeholder">

                  <span>
                    PROJECT
                  </span>

                  <strong>
                    {project.title}
                  </strong>

                  <p>
                    ALPHA
                  </p>

                </div>
              )}

            </div>

          </section>

          <section className="project-detail__content">

            <div className="project-detail__main">

              <div className="project-detail__section-heading">
                <span>01</span>

                <div>
                  <p>
                    OVERVIEW
                  </p>

                  <h2>
                    About the
                    <span> project.</span>
                  </h2>
                </div>
              </div>

              <div className="project-detail__description">
                <p>
                  {project.description}
                </p>
              </div>

            </div>

            <aside className="project-detail__sidebar">

              <div className="project-detail__info-card">

                <p className="project-detail__info-title">
                  PROJECT INFO
                </p>

                <div className="project-detail__info-row">
                  <span>
                    CATEGORY
                  </span>

                  <strong>
                    {project.category || "Development"}
                  </strong>
                </div>

                <div className="project-detail__info-row">
                  <span>
                    TECHNOLOGIES
                  </span>

                  <strong>
                    {project.skills?.length || 0}
                  </strong>
                </div>

                {project.created_at && (
                  <div className="project-detail__info-row">
                    <span>
                      CREATED
                    </span>

                    <strong>
                      {new Date(
                        project.created_at
                      ).getFullYear()}
                    </strong>
                  </div>
                )}

                <div className="project-detail__info-row">
                  <span>
                    STATUS
                  </span>

                  <strong className="project-detail__status">
                    <i></i>
                    Completed
                  </strong>
                </div>

              </div>

              <div className="project-detail__stack">

                <p>
                  TECH STACK
                </p>

                <div>

                  {project.skills?.map((skill) => (
                    <span key={skill.id}>
                      {skill.name}
                    </span>
                  ))}

                </div>

              </div>

            </aside>

          </section>

          <section className="project-detail__links">

            <div>
              <p>
                WANT TO EXPLORE MORE?
              </p>

              <h2>
                Check the code or
                <span> try the project.</span>
              </h2>
            </div>

            <div className="project-detail__links-actions">

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub
                  <span>↗</span>
                </a>
              )}

              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                  <span>↗</span>
                </a>
              )}

              {project.telegram_url && (
                <a
                  href={project.telegram_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Telegram
                  <span>↗</span>
                </a>
              )}

              {!project.github_url &&
                !project.demo_url &&
                !project.telegram_url && (
                  <Link to="/projects">
                    More Projects
                    <span>→</span>
                  </Link>
                )}

            </div>

          </section>

          <section className="project-detail__next">

            <div>
              <p>
                NEXT
              </p>

              <h2>
                Explore more
                <span> projects.</span>
              </h2>
            </div>

            <Link to="/projects">
              View All Projects
              <span>→</span>
            </Link>

          </section>

        </div>
      </main>
    </>
  );
}

export default ProjectDetail;