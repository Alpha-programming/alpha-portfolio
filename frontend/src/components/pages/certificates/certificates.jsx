import { useEffect, useState } from "react";

import Navbar from "../../navbar/navbar";
import { API_URL } from "../../../api/api";

import "./certificates.scss";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/certificates/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load certificates");
        }

        return response.json();
      })
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Certificate loading error:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="certificates">
        <div className="certificates__glow certificates__glow--one"></div>
        <div className="certificates__glow certificates__glow--two"></div>

        <div className="container certificates__container">

          <section className="certificates__hero">
            <p className="certificates__eyebrow">
              EDUCATION & ACHIEVEMENTS
            </p>

            <h1>
              My
              <span> Certificates.</span>
            </h1>

            <p className="certificates__intro">
              Courses and certifications that reflect my development
              across backend programming, data science, QA engineering,
              frontend development and design.
            </p>

            {!loading && !error && (
              <div className="certificates__count">
                <strong>{certificates.length}</strong>
                <span>CERTIFICATES</span>
              </div>
            )}
          </section>

          {loading && (
            <div className="certificates__state">
              <span className="certificates__loader"></span>
              <p>Loading certificates...</p>
            </div>
          )}

          {!loading && error && (
            <div className="certificates__state">
              <h2>Unable to load certificates.</h2>
              <p>
                Check that the Django server is running and try again.
              </p>
            </div>
          )}

          {!loading && !error && certificates.length === 0 && (
            <div className="certificates__empty">
              <span>NO CERTIFICATES YET</span>

              <h2>
                Certificates will appear here.
              </h2>

              <p>
                New certificates added through Django Admin will
                automatically appear on this page.
              </p>
            </div>
          )}

          {!loading && !error && certificates.length > 0 && (
            <section className="certificates__grid">

              {certificates.map((certificate, index) => (
                <article
                  className="certificate-card"
                  key={certificate.id}
                >

                  <div className="certificate-card__visual">

                    {certificate.image ? (
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                      />
                    ) : (
                      <div className="certificate-card__placeholder">
                        <span>
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <strong>
                          CERTIFICATE
                        </strong>
                      </div>
                    )}

                    <div className="certificate-card__badge">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                  </div>

                  <div className="certificate-card__body">

                    <div className="certificate-card__top">

                      <p>
                        {certificate.organization}
                      </p>

                      {certificate.issue_date && (
                        <span>
                          {new Date(
                            certificate.issue_date
                          ).getFullYear()}
                        </span>
                      )}

                    </div>

                    <h2>
                      {certificate.title}
                    </h2>

                    {certificate.description && (
                      <p className="certificate-card__description">
                        {certificate.description}
                      </p>
                    )}

                    <div className="certificate-card__footer">

                      {certificate.issue_date && (
                        <div>
                          <small>
                            ISSUED
                          </small>

                          <strong>
                            {certificate.issue_date}
                          </strong>
                        </div>
                      )}

                      {certificate.credential_url && (
                        <a
                          href={certificate.credential_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Credential
                          <span>↗</span>
                        </a>
                      )}

                    </div>

                  </div>

                </article>
              ))}

            </section>
          )}

        </div>
      </main>
    </>
  );
}

export default Certificates;