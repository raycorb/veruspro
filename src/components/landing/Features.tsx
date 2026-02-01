import { FileCheck, Shield, Zap, FileText, Building, Clock } from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Verificación Automática",
    description:
      "Analiza automáticamente tus proyectos contra el CTE y detecta incumplimientos en segundos.",
  },
  {
    icon: Shield,
    title: "Cumplimiento Garantizado",
    description:
      "Asegura que tus proyectos cumplen con todas las normativas antes de presentarlos.",
  },
  {
    icon: Zap,
    title: "Resultados Instantáneos",
    description:
      "Obtén informes detallados de cumplimiento en tiempo real mientras diseñas.",
  },
  {
    icon: FileText,
    title: "Documentación Completa",
    description:
      "Genera automáticamente la documentación requerida para visados y licencias.",
  },
  {
    icon: Building,
    title: "Normativa Autonómica",
    description:
      "Incluye las normativas específicas de cada comunidad autónoma española.",
  },
  {
    icon: Clock,
    title: "Actualizaciones Continuas",
    description:
      "Mantente al día con los cambios normativos automáticamente sincronizados.",
  },
];

const Features = () => {
  return (
    <section id="caracteristicas" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Características
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Todo lo que necesitas para el cumplimiento normativo
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Herramientas profesionales diseñadas para arquitectos, ingenieros y constructores españoles.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:shadow-elevated hover:border-accent/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl bg-accent-gradient transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
