import { useEffect, useState } from "react";

import Navbar from "../../navbar/navbar";
import { API_URL } from "../../../api/api";

import "./about.scss";

function About() {
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/profile/`).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        return response.json();
      }),

      fetch(`${API_URL}/api/experiences/`).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load experiences");
        }

        return response.json();
      }),

      fetch(`${API_URL}/api/skills/`).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load skills");
        }

        return response.json();
      }),
    ])
      .then(([profileData, experienceData, skillData]) => {
        setProfile(profileData[0] || null);
        setExperiences(experienceData);
        setSkills(skillData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading About page:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="about about--state">
          <div className="container">
            <p>Loading...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !profile) {
    return (
      <>
        <Navbar />

        <main className="about about--state">
          <div className="container">
            <h1>Unable to load About page</h1>
          </div>
        </main>
      </>
    );
  }

  const learnedSkills = skills.filter(
    (skill) => skill.status === "learned"
  );

  const learningSkills = skills.filter(
    (skill) => skill.status === "learning"
  );

  return (
    <>
      <Navbar />

      <main className="about">
        <div className="about__glow"></div>

        <div className="container about__container">
          <section className="about__hero">
            <div className="about__hero-content">
              <p className="about__eyebrow">ABOUT ME</p>

              <h1>
                Developer.
                <span>Learner.</span>
                <span>Builder.</span>
              </h1>

              <p className="about__lead">{profile.description}</p>

              <div className="about__links">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>
                )}

                {profile.telegram && (
                  <a
                    href={profile.telegram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Telegram ↗
                  </a>
                )}

                {profile.instagram && (
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram ↗
                  </a>
                )}

                {profile.email && (
                  <a href={`mailto:${profile.email}`}>
                    Email
                  </a>
                )}
              </div>
            </div>

            <div className="about__profile">
              {profile.profile_image ? (
                <img
                  src={profile.profile_image}
                  alt={profile.name}
                />
              ) : (
                <div className="about__profile-placeholder">
                  <span>ALPHA</span>
                  <strong>{profile.name}</strong>
                  <small>{profile.role}</small>
                </div>
              )}
            </div>
          </section>

          <section className="about__stats">
            <div>
              <strong>{profile.learning_duration || "2.5+"}</strong>
              <span>YEARS LEARNING</span>
            </div>

            <div>
              <strong>{skills.length}+</strong>
              <span>TECHNOLOGIES</span>
            </div>

            <div>
              <strong>{learnedSkills.length}</strong>
              <span>LEARNED SKILLS</span>
            </div>

            <div>
              <strong>{learningSkills.length}</strong>
              <span>CURRENTLY LEARNING</span>
            </div>
          </section>

          <section className="about__section">
            <div className="about__section-label">
              <span>01</span>
              EDUCATION
            </div>

            <div className="about__section-content">
              <h2>
                Studying security.
                <span> Building software.</span>
              </h2>

              <div className="about__education-grid">
                <article>
                  <span>UNIVERSITY</span>
                  <h3>{profile.university || "Dongshin University"}</h3>
                  <p>{profile.major || "Cyber Security"}</p>
                </article>

                <article>
                  <span>CURRENT STUDY</span>
                  <h3>{profile.study_year || "4th Year"}</h3>
                  <p>{profile.semester || "7th Semester"}</p>
                </article>

                <article>
                  <span>IELTS</span>
                  <h3>{profile.ielts || "7.0"}</h3>
                  <p>English proficiency</p>
                </article>

                <article>
                  <span>TOPIK</span>
                  <h3>Level {profile.topik || "4"}</h3>
                  <p>Korean proficiency</p>
                </article>
              </div>
            </div>
          </section>

          <section className="about__section">
            <div className="about__section-label">
              <span>02</span>
              TRAINING
            </div>

            <div className="about__section-content">
              <h2>
                Learning across
                <span> multiple disciplines.</span>
              </h2>

              <div className="about__training">
                <article>
                  <span>01</span>
                  <h3>Python</h3>
                  <p>
                    Backend development, automation, APIs and
                    application development.
                  </p>
                </article>

                <article>
                  <span>02</span>
                  <h3>Data Science</h3>
                  <p>
                    Data analysis, visualization and machine
                    learning foundations.
                  </p>
                </article>

                <article>
                  <span>03</span>
                  <h3>QA Engineer</h3>
                  <p>
                    Testing, debugging, test cases and software
                    quality assurance.
                  </p>
                </article>

                <article>
                  <span>04</span>
                  <h3>Front End</h3>
                  <p>
                    JavaScript, React and modern interface
                    development.
                  </p>
                </article>

                <article>
                  <span>05</span>
                  <h3>Pro Design</h3>
                  <p>
                    Visual design, Adobe tools and modern digital
                    design principles.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="about__section">
            <div className="about__section-label">
              <span>03</span>
              MY JOURNEY
            </div>

            <div className="about__section-content">
              <h2>
                Learning through
                <span> building.</span>
              </h2>

              <div className="about__timeline">
                {experiences.map((experience) => (
                  <article
                    className="about__timeline-item"
                    key={experience.id}
                  >
                    <div className="about__timeline-year">
                      <strong>
                        {experience.started_at?.slice(0, 4)}
                      </strong>

                      {experience.current && <span>NOW</span>}
                    </div>

                    <div className="about__timeline-info">
                      <p>{experience.category}</p>

                      <h3>{experience.title}</h3>

                      {experience.organization && (
                        <h4>{experience.organization}</h4>
                      )}

                      {experience.description && (
                        <p className="about__timeline-description">
                          {experience.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="about__skills">
            <div>
              <p>TECH STACK</p>

              <h2>
                Technologies I
                <span> work with.</span>
              </h2>
            </div>

            <div className="about__skill-grid">
              {skills.map((skill) => (
                <div
                  className="about__skill"
                  key={skill.id}
                >
                  <span>{skill.name}</span>
                  <small>{skill.category}</small>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default About;