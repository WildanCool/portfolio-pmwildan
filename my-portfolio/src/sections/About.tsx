import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .fromTo(
          ".about-heading",
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        )
        .fromTo(
          ".about-photo-column",
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.35",
        )
        .fromTo(
          ".about-description",
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.25",
        )
        .fromTo(
          ".skill-item",
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.2",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        <h2 className="about-heading">
          about me<span>.</span>
        </h2>

        <div className="about-content">
          <div className="about-photo-column">
            <div className="photo-stage">
              <img
                src="/images/profile.png"
                alt="My profile"
                className="profile-photo"
              />
            </div>

            <div className="photo-controls">
              <span>PERSONAL PORTRAIT</span>
              <span>CREATIVE DEVELOPER</span>
            </div>
          </div>

          <div className="about-description">
            <span className="about-eyebrow">A LITTLE INTRODUCTION — 01</span>

            <h3>
              Creative mind.
              <br />
              Digital builder.
            </h3>

            <p className="about-paragraph">
              I'm a creative developer passionate about building digital
              experiences. I enjoy combining technology, design, and creativity
              to turn ideas into meaningful digital products.
            </p>

            <p className="about-paragraph">
              From developing websites to implementing mobile interfaces with
              Flutter, I love exploring different ways to create useful and
              engaging experiences. I'm also growing my skills in UI/UX design
              and AI prompt engineering.
            </p>

            <div className="about-skills">
              <span className="about-eyebrow">WHAT I DO</span>

              <div className="skill-item">
                <span>01</span>
                <strong>WEB DEVELOPMENT</strong>
                <span>↗</span>
              </div>

              <div className="skill-item">
                <span>02</span>
                <strong>FLUTTER & UI IMPLEMENTATION</strong>
                <span>↗</span>
              </div>

              <div className="skill-item">
                <span>03</span>
                <strong>UI / UX DESIGN</strong>
                <span>↗</span>
              </div>

              <div className="skill-item">
                <span>04</span>
                <strong>AI PROMPT ENGINEERING</strong>
                <span>↗</span>
              </div>
            </div>

            <div className="about-footer">
              <span>CURIOUS BY NATURE.</span>
              <span>ALWAYS BUILDING.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
