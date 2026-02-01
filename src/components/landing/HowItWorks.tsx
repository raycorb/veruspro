import { Upload, Cpu, FileCheck, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Sube tu Proyecto",
    description:
      "Carga los planos y documentación de tu proyecto en cualquier formato compatible (IFC, DWG, PDF).",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Análisis Automático",
    description:
      "Nuestro motor de IA analiza tu proyecto contra todas las secciones aplicables del CTE.",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Revisión de Resultados",
    description:
      "Recibe un informe detallado con cumplimientos, incumplimientos y recomendaciones.",
  },
  {
    icon: Download,
    step: "04",
    title: "Exporta Documentación",
    description:
      "Genera documentos oficiales listos para presentar a colegios profesionales y administraciones.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-secondary/50 geometric-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Cómo Funciona
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Cuatro pasos hacia el cumplimiento total
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un proceso simple y eficiente para garantizar que tu proyecto cumple con toda la normativa.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="absolute top-24 left-0 right-0 hidden lg:block">
            <div className="mx-auto max-w-4xl h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Number & Icon Container */}
                <div className="relative mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-border shadow-elevated">
                    <step.icon className="h-8 w-8 text-accent" />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
