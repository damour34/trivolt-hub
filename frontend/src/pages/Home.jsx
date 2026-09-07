import { Link } from "react-router-dom";
import UpdatesFeed from "../components/UpdatesFeed.jsx";
import "../styles/Home.css";

const trainingPrograms = [
  {
    number: "01",
    title: "Software Development",
    description:
      "Learn how to design, build and maintain modern software applications, websites and digital solutions.",
    skills: ["Programming", "Web Development", "Databases", "APIs"],
  },
  {
    number: "02",
    title: "Networking & Internet Technology",
    description:
      "Develop practical skills in computer networks, internet technologies, infrastructure, security and network administration.",
    skills: ["Networking", "Routing", "Security", "Infrastructure"],
  },
  {
    number: "03",
    title: "Computer Systems & Architecture",
    description:
      "Understand computer hardware, operating systems and system administration while developing strong technical foundations.",
    skills: ["Hardware", "Linux", "Operating Systems", "Systems"],
  },
];

const services = [
  {
    number: "01",
    title: "IT Support",
    description:
      "Reliable technical assistance for computers, software, networks and everyday IT challenges.",
  },
  {
    number: "02",
    title: "Network Solutions",
    description:
      "Network installation, configuration, maintenance and troubleshooting for reliable connectivity.",
  },
  {
    number: "03",
    title: "Software & Web Development",
    description:
      "Custom websites, applications and digital solutions designed around your needs.",
  },
  {
    number: "04",
    title: "IT Consulting",
    description:
      "Professional technology advice to help organizations choose, implement and improve their IT solutions.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Practical Learning",
    text: "Learn by doing through practical exercises, projects and real-world technology.",
  },
  {
    number: "02",
    title: "Expert Guidance",
    text: "Develop your skills with guidance from experienced technology professionals.",
  },
  {
    number: "03",
    title: "Career Preparation",
    text: "Build the technical and professional skills needed for today's IT industry.",
  },
  {
    number: "04",
    title: "Real Solutions",
    text: "Turn technical knowledge into useful solutions for individuals and organizations.",
  },
];

export default function Home() {
  return (
    <div className="home-page">

      {/* NAVIGATION */}
      <nav className="main-nav">
        <Link to="/" className="brand-logo">
          TRIVOLT<span>HUB</span>
        </Link>

        <div className="nav-links">
          <a href="#training">Training</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#updates">Updates</a>
        </div>

        <Link to="/apply" className="nav-cta">
          Apply Now <span>→</span>
        </Link>
      </nav>

      <main>

        {/* HERO */}
        <section className="hero-section">
          <div className="hero-background-grid"></div>

          <div className="hero-content">

            <div className="hero-badge">
              <span className="badge-dot"></span>
              IT TRAINING • SERVICES • CONSULTING
            </div>

            <p className="hero-kicker">
              TRIVOLT HUB / TECHNOLOGY
            </p>

            <h1>
              Building skills.
              <span>Delivering technology.</span>
            </h1>

            <p className="hero-description">
              TRIVOLT HUB is an IT training center and technology services
              provider helping people develop practical digital skills while
              helping organizations solve real technology challenges.
            </p>

            <div className="hero-actions">
              <a href="#training" className="primary-button">
                Explore Training
                <span>→</span>
              </a>

              <a href="#services" className="secondary-button">
                Our IT Services
              </a>
            </div>

            <div className="hero-note">
              <span></span>
              Learn technology. Build solutions. Create opportunities.
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card main-visual-card">
              <div className="visual-card-top">
                <span>TRIVOLT HUB</span>
                <span>IT / 2026</span>
              </div>

              <div className="visual-main">
                <div className="visual-circle">
                  <span>IT</span>
                </div>

                <div>
                  <small>FOCUS</small>
                  <strong>Technology</strong>
                  <strong>Education</strong>
                  <strong>Solutions</strong>
                </div>
              </div>

              <div className="visual-bottom">
                <span>TRAIN</span>
                <span>SUPPORT</span>
                <span>CONSULT</span>
              </div>
            </div>

            <div className="floating-card floating-card-one">
              <span className="floating-icon">01</span>
              <div>
                <small>TRAINING</small>
                <strong>Practical IT Skills</strong>
              </div>
            </div>

            <div className="floating-card floating-card-two">
              <span className="floating-icon">02</span>
              <div>
                <small>SERVICES</small>
                <strong>Technology Solutions</strong>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="intro-section">
          <div className="intro-label">
            <span>01</span>
            WHAT WE DO
          </div>

          <div className="intro-content">
            <h2>
              Technology should be
              <span>understood, built and used.</span>
            </h2>

            <p>
              We combine IT education with professional technology services.
              Whether you are looking to start your IT journey, improve your
              technical skills or find a solution to a technology challenge,
              TRIVOLT HUB is here to help.
            </p>
          </div>
        </section>

        {/* TRAINING */}
        <section className="training-section" id="training">
          <div className="section-heading">
            <div>
              <p className="section-kicker">02 / IT TRAINING</p>
              <h2>Build your future in technology.</h2>
            </div>

            <p>
              Develop practical knowledge and skills through training programs
              designed around real IT technologies and industry needs.
            </p>
          </div>

          <div className="training-grid">
            {trainingPrograms.map((program) => (
              <article className="training-card" key={program.number}>
                <div className="card-top">
                  <span className="card-number">{program.number}</span>
                  <span className="card-arrow">↗</span>
                </div>

                <div className="card-content">
                  <p className="card-label">TRAINING PROGRAM</p>

                  <h3>{program.title}</h3>

                  <p className="card-description">
                    {program.description}
                  </p>

                  <div className="skill-list">
                    {program.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="card-line"></div>
              </article>
            ))}
          </div>

          <div className="training-footer">
            <p>
              Start learning today and develop skills that can open doors in
              the technology industry.
            </p>

            <Link to="/apply" className="text-button">
              Join a Training Program →
            </Link>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services-section" id="services">
          <div className="section-heading services-heading">
            <div>
              <p className="section-kicker">03 / IT SERVICES</p>
              <h2>Technology solutions that work.</h2>
            </div>

            <p>
              From technical support to software and network solutions, our
              experts help individuals and organizations use technology with
              confidence.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-number">{service.number}</div>

                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <span className="service-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        {/* ABOUT / WHY */}
        <section className="about-section" id="about">
          <div className="about-main">
            <p className="section-kicker">04 / WHY TRIVOLT HUB</p>

            <h2>
              Learn from technology.
              <span>Grow with technology.</span>
            </h2>

            <p className="about-description">
              TRIVOLT HUB is built around one simple idea: technology becomes
              more powerful when people know how to use it.
            </p>

            <p className="about-description">
              We create an environment where students, professionals and
              organizations can access knowledge, technical expertise and
              practical technology solutions.
            </p>

            <Link to="/apply" className="text-button">
              Start Your Journey →
            </Link>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit) => (
              <div className="benefit-card" key={benefit.number}>
                <span>{benefit.number}</span>

                <h3>{benefit.title}</h3>

                <p>{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* UPDATES */}
        <section className="updates-section" id="updates">
          <div className="section-heading">
            <div>
              <p className="section-kicker">05 / NEWS & UPDATES</p>
              <h2>What's happening at TRIVOLT HUB.</h2>
            </div>

            <p>
              Follow our latest activities, announcements, programs and
              technology initiatives.
            </p>
          </div>

          <UpdatesFeed />
        </section>

        {/* CTA */}
        <section className="final-cta">
          <div className="cta-grid"></div>

          <div className="cta-content">
            <p className="section-kicker">06 / GET STARTED</p>

            <h2>
              Ready to build your
              <span>technology future?</span>
            </h2>

            <p>
              Whether you want to learn IT, need technical support or are
              looking for professional technology solutions, let's build
              something useful together.
            </p>

            <div className="cta-actions">
              <Link to="/apply" className="primary-button">
                Get Started
                <span>→</span>
              </Link>

              <a href="#services" className="secondary-button">
                Explore Services
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand-logo">
              TRIVOLT<span>HUB</span>
            </Link>

            <p>
              IT Training. Technology Services.
              <br />
              Professional Solutions.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <span>EXPLORE</span>
              <a href="#training">Training</a>
              <a href="#services">Services</a>
              <a href="#about">About Us</a>
            </div>

            <div>
              <span>CONNECT</span>
              <a href="#updates">Updates</a>
              <Link to="/apply">Internship</Link>
              <Link to="/apply">Contact</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>TRIVOLT HUB © 2026</span>
          <span>Technology • Education • Innovation</span>
        </div>
      </footer>
    </div>
  );
}