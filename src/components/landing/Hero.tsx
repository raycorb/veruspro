import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-architecture.jpg";

const Hero = () => {
  const highlights = [
    "Código Técnico de Edificación (CTE)",
    "Normativa autonómica integrada",
    "Validación automática en segundos",
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Arquitectura moderna española"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 geometric-pattern opacity-30 z-10" />

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground animate-fade-up">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            Plataforma líder en cumplimiento normativo
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Cumplimiento del{" "}
            <span className="text-gradient">Código de Edificación</span>{" "}
            simplificado
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Veruspro automatiza la verificación del cumplimiento normativo de tus 
            proyectos de construcción con el CTE y normativas autonómicas españolas.
          </p>

          {/* Highlights */}
          <div className="mb-10 flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-primary-foreground/90">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="xl">
              Empezar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Ver Demostración
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default Hero;
