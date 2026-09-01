import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../navbar/navbar";
import { API_URL } from "../../../api/api";

import "./home.scss";

function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/profile/`).then((response) =>
        response.json()
      ),

      fetch(`${API_URL}/api/skills/`).then((response) =>
        response.json()
      ),

      fetch(`${API_URL}/api/experiences/`).then((response) =>
        response.json()
      ),
    ])
      .then(([profileData, skillsData, experiencesData]) => {
        setProfile(profileData[0] || null);
        setSkills(skillsData || []);
        setExperiences(experiencesData || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Home page loading error:", error);
        setLoading(false);
      });
  }, []);

  const learnedSkills = skills.filter(
    (skill) => skill.status === "learned"
  );

  const learningSkills = skills.filter(
    (skill) => skill.status === "learning"
  );

  return (
    <>
      <Navbar />

      <main className="home">

        <div className="home__glow home__glow--top"></div>
        <div className="home__glow home__glow--bottom"></div>

        <section className="home-hero">
          <div className="container home-hero__container">

            <div className="home-hero__content">

              <p className="home-hero__eyebrow">
                BACK-END & SOFTWARE DEVELOPER
              </p>

              <h1>
                Hi, I'm
                <span>
                  {profile?.name
                    ? profile.name.split(" ")[0]
                    : "Asadbek"}.
                </span>
              </h1>

              <p className="home-hero__description">
                Cyber Security student and software developer focused
                on Python, Django, APIs and modern web applications.
                I build practical software while continuously
                expanding my skills across frontend, data and software
                engineering.
              </p>

              <div className="home-hero__actions">

                <Link
                  to="/projects"
                  className="home-hero__primary"
                >
                  View Projects
                  <span>→</span>
                </Link>

                <Link
                  to="/contact"
                  className="home-hero__secondary"
                >
                  Contact Me
                </Link>

              </div>

              <div className="home-hero__socials">

                <a
                  href={
                    profile?.github ||
                    "https://github.com/Alpha-programming"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <span>↗</span>
                </a>

                <a
                  href={
                    profile?.telegram ||
                    "https://t.me/uzbALPHA"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                  <span>↗</span>
                </a>

                <a
                  href={
                    profile?.instagram ||
                    "https://instagram.com/asadbek7qodirov"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                  <span>↗</span>
                </a>

                <a
                  href={`mailto:${
                    profile?.email ||
                    "asadbek7qodirov@gmail.com"
                  }`}
                >
                  Email
                  <span>↗</span>
                </a>

              </div>

            </div>

            <div className="home-hero__visual">

              <div className="home-hero__image">

                {profile?.profile_image ? (
                  <img
                    src={profile.profile_image}
                    alt={profile.name}
                  />
                ) : (
                  <div className="home-hero__placeholder">
                    <span>ALPHA</span>
                    <p>Python Back-End Developer</p>
                  </div>
                )}

              </div>

              <div className="home-hero__badge">
                <span></span>

                AVAILABLE FOR
                <strong>OPPORTUNITIES</strong>
              </div>

            </div>

          </div>
        </section>

        <section className="home-skills">
          <div className="container">

            <div className="home-section-heading">

              <p>
                SKILLS & GROWTH
              </p>

              <h2>
                What I know.
                <span> What I'm learning.</span>
              </h2>

              <p className="home-section-heading__description">
                A live overview of the technologies I work with
                and the skills I'm currently developing.
              </p>

            </div>

            {loading ? (
              <p className="home__loading">
                Loading skills...
              </p>
            ) : (
              <div className="home-skills__columns">

                <div className="home-skills__group">

                  <div className="home-skills__group-title">

                    <div>
                      <span>01</span>
                      <h3>Learned Skills</h3>
                    </div>

                    <strong>
                      {learnedSkills.length}
                    </strong>

                  </div>

                  <div className="home-skills__list">

                    {learnedSkills.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                      />
                    ))}

                  </div>

                </div>

                <div className="home-skills__group">

                  <div className="home-skills__group-title">

                    <div>
                      <span>02</span>
                      <h3>Currently Learning</h3>
                    </div>

                    <strong>
                      {learningSkills.length}
                    </strong>

                  </div>

                  <div className="home-skills__list">

                    {learningSkills.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                      />
                    ))}

                  </div>

                </div>

              </div>
            )}

          </div>
        </section>

        <section className="home-journey">
          <div className="container">

            <div className="home-section-heading">

              <p>
                MY JOURNEY
              </p>

              <h2>
                Building. Learning.
                <span> Improving continuously.</span>
              </h2>

              <p className="home-section-heading__description">
                A timeline of the technologies, roles and areas
                I have been developing over time.
              </p>

            </div>

            <div className="home-journey__timeline">

              {experiences.length > 0 ? (
                experiences.map((experience, index) => (
                  <article
                    className="journey-card"
                    key={experience.id}
                  >

                    <div className="journey-card__line">
                      <span></span>
                    </div>

                    <div className="journey-card__year">

                      <small>
                        {String(index + 1).padStart(2, "0")}
                      </small>

                      <strong>
                        {experience.started_at
                          ? experience.started_at.slice(0, 4)
                          : experience.year || "2024"}
                      </strong>

                      {(experience.current ||
                        experience.is_current) && (
                        <span>NOW</span>
                      )}

                    </div>

                    <div className="journey-card__content">

                      <p className="journey-card__category">
                        {experience.category ||
                          "DEVELOPMENT"}
                      </p>

                      <h3>
                        {experience.title}
                      </h3>

                      {experience.organization && (
                        <h4>
                          {experience.organization}
                        </h4>
                      )}

                      {experience.description && (
                        <p className="journey-card__description">
                          {experience.description}
                        </p>
                      )}

                    </div>

                    {(experience.current ||
                      experience.is_current) && (
                      <div className="journey-card__status">
                        <span></span>
                        CURRENT
                      </div>
                    )}

                  </article>
                ))
              ) : (
                <article className="journey-card">

                  <div className="journey-card__line">
                    <span></span>
                  </div>

                  <div className="journey-card__year">
                    <small>01</small>
                    <strong>2024</strong>
                    <span>NOW</span>
                  </div>

                  <div className="journey-card__content">

                    <p className="journey-card__category">
                      DEVELOPMENT
                    </p>

                    <h3>
                      Python Development
                    </h3>

                    <h4>
                      Self Learning & Projects
                    </h4>

                    <p className="journey-card__description">
                      Started learning Python and building
                      applications, automation tools, APIs and
                      backend projects.
                    </p>

                  </div>

                  <div className="journey-card__status">
                    <span></span>
                    CURRENT
                  </div>

                </article>
              )}

            </div>

            <div className="home-work">

              <div>
                <p>
                  SELECTED WORK
                </p>

                <h2>
                  Want to see what
                  <span> I've built?</span>
                </h2>

                <p className="home-work__description">
                  Explore backend applications, APIs, Telegram
                  bots, testing projects and web applications.
                </p>
              </div>

              <Link
                to="/projects"
                className="home-work__button"
              >
                Explore Projects
                <span>↗</span>
              </Link>

            </div>

          </div>
        </section>

      </main>
    </>
  );
}

function SkillCard({ skill }) {
  return (
    <article className="skill-card">

      <div className="skill-card__top">

        <div className="skill-card__identity">

          <div className="skill-card__icon">
            {skill.name?.charAt(0)}
          </div>

          <div>
            <h4>
              {skill.name}
            </h4>

            <p>
              {skill.category}
            </p>
          </div>

        </div>

        <strong>
          {skill.progress || 0}%
        </strong>

      </div>

      <div className="skill-card__progress">
        <span
          style={{
            width: `${skill.progress || 0}%`,
          }}
        ></span>
      </div>

      <div className="skill-card__meta">

        {skill.duration && (
          <span>
            {skill.duration}
          </span>
        )}

        {skill.started_at && (
          <span>
            Started{" "}
            {new Date(skill.started_at).getFullYear()}
          </span>
        )}

      </div>

      {skill.description && (
        <p className="skill-card__description">
          {skill.description}
        </p>
      )}

    </article>
  );
}

export default Home;