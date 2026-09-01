import { useEffect, useState } from "react";

import Navbar from "../../navbar/navbar";
import { API_URL } from "../../../api/api";

import "./contact.scss";

function Contact() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/profile/`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data[0] || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading profile:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="contact">
        <div className="contact__glow contact__glow--one"></div>
        <div className="contact__glow contact__glow--two"></div>

        <div className="container contact__container">

          <section className="contact__hero">
            <p className="contact__eyebrow">
              GET IN TOUCH
            </p>

            <h1>
              Let’s build
              <span> something useful.</span>
            </h1>

            <p className="contact__intro">
              Have a project, collaboration idea or opportunity?
              Feel free to contact me through email, Telegram,
              Instagram or GitHub.
            </p>
          </section>

          <section className="contact__content">

            <div className="contact__info">

              <div className="contact__section-title">
                <span>01</span>

                <div>
                  <p>CONTACT</p>
                  <h2>Find me online.</h2>
                </div>
              </div>

              {loading ? (
                <p className="contact__loading">
                  Loading contact information...
                </p>
              ) : (
                <div className="contact__cards">

                  <a
                    className="contact-card"
                    href="mailto:asadbek7qodirov@gmail.com"
                  >
                    <div className="contact-card__number">
                      01
                    </div>

                    <div className="contact-card__content">
                      <span>EMAIL</span>

                      <h3>
                        {profile?.email ||
                          "asadbek7qodirov@gmail.com"}
                      </h3>

                      <p>
                        Best for work, collaboration and
                        professional inquiries.
                      </p>
                    </div>

                    <strong>↗</strong>
                  </a>

                  <a
                    className="contact-card"
                    href={
                      profile?.telegram ||
                      "https://t.me/uzbALPHA"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="contact-card__number">
                      02
                    </div>

                    <div className="contact-card__content">
                      <span>TELEGRAM</span>

                      <h3>@uzbALPHA</h3>

                      <p>
                        Fastest way to contact me directly.
                      </p>
                    </div>

                    <strong>↗</strong>
                  </a>

                  <a
                    className="contact-card"
                    href={
                      profile?.github ||
                      "https://github.com/Alpha-programming"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="contact-card__number">
                      03
                    </div>

                    <div className="contact-card__content">
                      <span>GITHUB</span>

                      <h3>Alpha-programming</h3>

                      <p>
                        Explore my projects, repositories and code.
                      </p>
                    </div>

                    <strong>↗</strong>
                  </a>

                  <a
                    className="contact-card"
                    href={
                      profile?.instagram ||
                      "https://instagram.com/asadbek7qodirov"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="contact-card__number">
                      04
                    </div>

                    <div className="contact-card__content">
                      <span>INSTAGRAM</span>

                      <h3>@asadbek7qodirov</h3>

                      <p>
                        Personal updates and social contact.
                      </p>
                    </div>

                    <strong>↗</strong>
                  </a>

                </div>
              )}

            </div>

            <aside className="contact__side">

              <div className="contact__availability">
                <div className="contact__availability-top">
                  <span className="contact__dot"></span>
                  AVAILABLE FOR OPPORTUNITIES
                </div>

                <h2>
                  Open to projects,
                  internships and collaboration.
                </h2>

                <p>
                  I’m especially interested in backend development,
                  Django, APIs, automation, QA and software
                  engineering projects.
                </p>

                <a href="mailto:asadbek7qodirov@gmail.com">
                  Send an Email
                  <span>↗</span>
                </a>
              </div>

              <div className="contact__details">

                <div>
                  <span>LOCATION</span>
                  <strong>South Korea</strong>
                </div>

                <div>
                  <span>FIELD</span>
                  <strong>Cyber Security</strong>
                </div>

                <div>
                  <span>FOCUS</span>
                  <strong>Python Backend</strong>
                </div>

                <div>
                  <span>LANGUAGES</span>
                  <strong>IELTS 7.0 · TOPIK 4</strong>
                </div>

              </div>

            </aside>

          </section>

        </div>
      </main>
    </>
  );
}

export default Contact;