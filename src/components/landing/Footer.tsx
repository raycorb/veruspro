import { Building2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    producto: [
      { name: "Características", href: "#caracteristicas" },
      { name: "Cómo Funciona", href: "#como-funciona" },
      { name: "Precios", href: "#" },
      { name: "Integraciones", href: "#" },
    ],
    normativa: [
      { name: "CTE", href: "#" },
      { name: "DB-SI", href: "#" },
      { name: "DB-SUA", href: "#" },
      { name: "DB-HE", href: "#" },
    ],
    empresa: [
      { name: "Sobre Nosotros", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Carreras", href: "#" },
      { name: "Contacto", href: "#contacto" },
    ],
    legal: [
      { name: "Privacidad", href: "#" },
      { name: "Términos", href: "#" },
      { name: "Cookies", href: "#" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <Building2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">Veruspro</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              La plataforma líder en verificación de cumplimiento normativo para el sector de la construcción en España.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Producto</h4>
            <ul className="space-y-3">
              {links.producto.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Normativa</h4>
            <ul className="space-y-3">
              {links.normativa.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {links.empresa.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} Veruspro. Todos los derechos reservados.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Hecho con ❤️ en España
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
