import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { frames } from "../data/frames";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;

    if (!canvas || !hero || Number(frames.length) === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let images: HTMLImageElement[] = [];
    let animationContext: gsap.Context | undefined;
    let cancelled = false;

    const playhead = { frame: 0 };

    // Render frame ke Canvas
    const renderFrame = () => {
      const image = images[Math.round(playhead.frame)];

      if (!image || !image.complete || !image.naturalWidth) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const scale = Math.max(
        rect.width / image.naturalWidth,
        rect.height / image.naturalHeight,
      );

      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      const x = (rect.width - drawWidth) / 2;
      const y = (rect.height - drawHeight) / 2;

      ctx.drawImage(image, x, y, drawWidth, drawHeight);
    };

    const loadingStartTime = Date.now();
    const minimumLoadingTime = 1500;

    // Load seluruh frame
    const loadFrames = async () => {
      let loadedCount = 0;

      try {
        images = await Promise.all(
          frames.map((src) => {
            return new Promise<HTMLImageElement>((resolve, reject) => {
              const image = new Image();

              image.onload = () => {
                loadedCount++;

                const percentage = Math.round(
                  (loadedCount / frames.length) * 100,
                );

                if (!cancelled) {
                  setProgress(percentage);
                }

                resolve(image);
              };

              image.onerror = () => {
                reject(new Error(`Gagal memuat: ${src}`));
              };

              image.src = src;
            });
          }),
        );

        if (cancelled) return;

        // Tampilkan frame pertama
        renderFrame();

        // Aktifkan animasi scroll setelah loading selesai
        animationContext = gsap.context(() => {
          gsap.to(playhead, {
            frame: images.length - 1,
            ease: "none",
            snap: "frame",
            onUpdate: renderFrame,

            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        }, hero);

        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

        setTimeout(() => {
          if (!cancelled) {
            setIsLoading(false);
            ScrollTrigger.refresh();
          }
        }, remainingTime);
      } catch (error) {
        console.error("Frame loading error:", error);

        if (!cancelled) {
          setLoadError(true);
        }
      }
    };

    loadFrames();

    const handleResize = () => renderFrame();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;

      window.removeEventListener("resize", handleResize);

      animationContext?.revert();

      images = [];
    };
  }, []);

  return (
    <>
      <div className={`loading-screen ${!isLoading ? "loaded" : ""}`}>
        <div className="loading-content">
          <h1 className="loading-logo">PORTFOLIO</h1>

          <div className="loading-info">
            <span>{loadError ? "LOADING ERROR" : "LOADING ASSETS"}</span>

            <span>{progress}%</span>
          </div>

          <div className="loading-bar">
            <div
              className="loading-progress"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="loading-footer">
            <span>{loadError ? "CHECK IMAGE FILES" : "PLEASE WAIT"}</span>

            <span>{frames.length} FRAMES</span>
          </div>
        </div>
      </div>

      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-content">
          <canvas ref={canvasRef} className="hero-canvas" />
        </div>
      </section>
    </>
  );
}
