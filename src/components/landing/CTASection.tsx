import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contacto" className="py-24 md:py-32 bg-hero-gradient relative overflow-hidden">
      {/* Geometric Pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-20" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <h2 className="mb-6 text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            ¿Listo para simplificar el cumplimiento normativo?
          </h2>
          <p className="mb-10 text-lg text-primary-foreground/80 md:text-xl">
            Únete a cientos de profesionales que ya confían en Veruspro para garantizar 
            el cumplimiento del Código Técnico de Edificación.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="xl">
              Solicitar Demo Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Contactar con Ventas
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-primary-foreground/70">
            <a href="mailto:info@veruspro.es" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="h-5 w-5" />
              info@veruspro.es
            </a>
            <span className="hidden sm:block text-primary-foreground/30">|</span>
            <a href="tel:+34900000000" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="h-5 w-5" />
              +34 900 000 000
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
