import { Bot } from "lucide-react";
import SearchSection from "@/components/SearchSection";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="w-full bg-card shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Dines de Jumps
                </h1>
                <p className="text-sm text-muted-foreground">Encontre seu local ideal</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Assistente IA disponível</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
          Planeje sua próxima aventura
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
          Selecione a data e o local perfeito para sua experiência inesquecível
        </p>
      </section>

      {/* Search Section */}
      <SearchSection />

      {/* Footer */}
      <footer className="w-full mt-16 py-8 border-t bg-card">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Dines de Jumps. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Index;
