import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { projects } from "../data/projects";
import "./Projects.css";

const projectLinks: Record<string, string> = {
  "To-do List": "https://to-dolist-nine-omega.vercel.app/",
  "BMI Calculator": "https://bmicalculator-five-beta.vercel.app/",
  FinTrack: "https://fin-track-two-psi.vercel.app/",
  UROTRAMAN: "https://ecommercewildan.vercel.app/",
};

function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const nextActionRef = useRef<(() => void) | null>(null);
  const prevActionRef = useRef<(() => void) | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage || projects.length === 0) return;

    const cards = Array.from(
      stage.querySelectorAll<HTMLElement>(".project-card"),
    );

    const total = cards.length;

    if (total === 0) return;

    let currentIndex = 0;
    let isAnimating = false;
    let autoplay: gsap.core.Tween | null = null;

    const getLayout = () => {
      const width = window.innerWidth;
      const mobile = width <= 600;
      const tablet = width <= 900;

      return {
        offset: width * (mobile ? 0.68 : tablet ? 0.52 : 0.5),
        angle: mobile ? 35 : 45,
      };
    };

    const getDistance = (cardIndex: number, active: number) => {
      let distance = (cardIndex - active + total) % total;

      if (distance > total / 2) {
        distance -= total;
      }

      return distance;
    };

    const getCardValues = (
      cardIndex: number,
      active: number,
      hiddenIndex: number,
    ) => {
      const layout = getLayout();
      const distance = getDistance(cardIndex, active);
      const hidden = cardIndex === hiddenIndex;

      return {
        xPercent: -50,
        yPercent: -50,
        x: distance * layout.offset,
        z: distance === 0 ? 120 : -180,
        rotateY: distance < 0 ? layout.angle : distance > 0 ? -layout.angle : 0,
        scale: distance === 0 ? 1 : 0.82,
        autoAlpha: hidden ? 0 : 1,
      };
    };

    const setInitialLayout = () => {
      const hiddenIndex =
        total >= 4 ? (currentIndex + Math.floor(total / 2)) % total : -1;

      cards.forEach((card, index) => {
        gsap.set(card, getCardValues(index, currentIndex, hiddenIndex));

        const image = card.querySelector("img");

        if (image) {
          gsap.set(image, {
            filter:
              index === currentIndex ? "grayscale(0%)" : "grayscale(100%)",
          });
        }
      });
    };

    const stopAutoplay = () => {
      autoplay?.kill();
      autoplay = null;
    };

    let scheduleAutoplay: () => void;

    const move = (direction: 1 | -1) => {
      if (isAnimating) return;

      stopAutoplay();
      isAnimating = true;

      const nextIndex = (currentIndex + direction + total) % total;

      if (total >= 4) {
        const enteringIndex =
          direction === 1
            ? (nextIndex + 1) % total
            : (nextIndex - 1 + total) % total;

        const layout = getLayout();
        const enteringCard = cards[enteringIndex];

        gsap.set(enteringCard, {
          xPercent: -50,
          yPercent: -50,
          x: direction === 1 ? layout.offset * 2 : -layout.offset * 2,
          z: -180,
          rotateY: direction === 1 ? -layout.angle : layout.angle,
          scale: 0.82,
          autoAlpha: 0,
        });

        const enteringImage = enteringCard.querySelector("img");

        if (enteringImage) {
          gsap.set(enteringImage, {
            filter: "grayscale(100%)",
          });
        }
      }

      const hiddenIndex =
        total >= 4 ? (nextIndex + Math.floor(total / 2)) % total : -1;

      const timeline = gsap.timeline({
        onComplete: () => {
          currentIndex = nextIndex;
          setActiveIndex(nextIndex);

          isAnimating = false;
          scheduleAutoplay();
        },
      });

      cards.forEach((card, index) => {
        const values = getCardValues(index, nextIndex, hiddenIndex);
        const image = card.querySelector("img");

        timeline.to(
          card,
          {
            ...values,
            duration: 1.15,
            ease: "power3.inOut",
          },
          0,
        );

        if (image) {
          timeline.to(
            image,
            {
              filter: index === nextIndex ? "grayscale(0%)" : "grayscale(100%)",
              duration: 1.15,
              ease: "power2.inOut",
            },
            0,
          );
        }
      });
    };

    const next = () => move(1);
    const previous = () => move(-1);

    nextActionRef.current = next;
    prevActionRef.current = previous;

    scheduleAutoplay = () => {
      stopAutoplay();

      autoplay = gsap.delayedCall(0.5, () => {
        next();
      });
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;

      event.preventDefault();

      if (isAnimating) return;

      if (event.deltaY > 0) {
        next();
      } else {
        previous();
      }
    };

    const handleResize = () => {
      if (!isAnimating) {
        setInitialLayout();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    const ctx = gsap.context(() => {
      setInitialLayout();

      stage.addEventListener("wheel", handleWheel, {
        passive: false,
      });

      window.addEventListener("resize", handleResize);
      window.addEventListener("keydown", handleKeyDown);

      scheduleAutoplay();
    }, section);

    return () => {
      stopAutoplay();

      stage.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);

      nextActionRef.current = null;
      prevActionRef.current = null;

      ctx.revert();
    };
  }, []);

  const goNext = () => nextActionRef.current?.();
  const goPrevious = () => prevActionRef.current?.();

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="projects-container">
        <div className="projects-heading">
          <span className="projects-eyebrow">PORTFOLIO / 2026</span>

          <h2>
            SELECTED <span>WORK.</span>
          </h2>

          <p>AUTO PLAY / SCROLL OR USE ARROWS</p>
        </div>

        <div className="projects-stage" ref={stageRef}>
          {projects.map((project) => {
            const projectUrl = projectLinks[project.title];

            return (
              <a
                className="project-card"
                key={project.number}
                href={projectUrl || undefined}
                target={projectUrl ? "_blank" : undefined}
                rel={projectUrl ? "noopener noreferrer" : undefined}
                aria-label={
                  projectUrl
                    ? `Visit ${project.title} website`
                    : `${project.title} website unavailable`
                }
                onClick={(event) => {
                  if (!projectUrl) {
                    event.preventDefault();
                  }
                }}
              >
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    draggable="false"
                  />

                  <span className="project-image-number">
                    / {project.number}
                  </span>
                </div>

                <div className="project-info">
                  <div>
                    <span className="project-label">
                      PROJECT {project.number}
                    </span>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>
                  </div>

                  <span className="project-arrow">↗</span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="projects-controls">
          <button
            type="button"
            className="project-nav-button"
            onClick={goPrevious}
            aria-label="Previous project"
          >
            ←
          </button>

          <span className="projects-counter">
            {String(activeIndex + 1).padStart(2, "0")}
            {" — "}
            {String(projects.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            className="project-nav-button"
            onClick={goNext}
            aria-label="Next project"
          >
            →
          </button>
        </div>

        <div className="projects-footer">
          <span>SELECTED PROJECTS</span>
          <span>ENDLESS CAROUSEL</span>
        </div>
      </div>
    </section>
  );
}

export default Projects;
