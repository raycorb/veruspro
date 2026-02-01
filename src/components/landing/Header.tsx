import { Button } from "@/components/ui/button";
import { Building2, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Veruspro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#caracteristicas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Características
            </a>
            <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Cómo Funciona
            </a>
            <a href="#normativa" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Normativa
            </a>
            <a href="#contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Iniciar Sesión</Button>
            <Button size="sm">Solicitar Demo</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a href="#caracteristicas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Características
              </a>
              <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Cómo Funciona
              </a>
              <a href="#normativa" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Normativa
              </a>
              <a href="#contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" size="sm">Iniciar Sesión</Button>
                <Button size="sm">Solicitar Demo</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
