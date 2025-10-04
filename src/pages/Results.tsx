import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CloudRain, Thermometer, Wind, Droplets, Sun, CloudDrizzle, Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  rainChance: number;
  windSpeed: number;
  condition: string;
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { date, locationData } = location.state || {};

  useEffect(() => {
    if (!date || !locationData) {
      toast.error("Dados incompletos. Por favor, selecione data e localização.");
      navigate("/");
      return;
    }

    // Simulação de dados meteorológicos
    const mockWeather: WeatherData = {
      temperature: Math.floor(Math.random() * 15) + 20,
      feelsLike: Math.floor(Math.random() * 15) + 18,
      humidity: Math.floor(Math.random() * 50) + 30,
      rainChance: Math.floor(Math.random() * 100),
      windSpeed: Math.floor(Math.random() * 20) + 5,
      condition: Math.random() > 0.5 ? "Ensolarado" : "Parcialmente nublado"
    };

    setWeather(mockWeather);

    // Gerar sugestões baseadas nos dados
    const newSuggestions: string[] = [];

    if (mockWeather.humidity < 40) {
      newSuggestions.push("💧 A umidade do ar está baixa. Lembre-se de levar uma garrafa d'água!");
    }

    if (mockWeather.rainChance > 60) {
      newSuggestions.push("☂️ Alta probabilidade de chuva. Não esqueça seu guarda-chuva!");
    }

    if (mockWeather.temperature > 30) {
      newSuggestions.push("🧴 Temperatura elevada. Use protetor solar e evite exposição prolongada ao sol.");
    }

    if (mockWeather.windSpeed > 15) {
      newSuggestions.push("💨 Ventos fortes previstos. Tenha cuidado com objetos soltos.");
    }

    if (mockWeather.feelsLike < 15) {
      newSuggestions.push("🧥 Sensação térmica baixa. Vista-se adequadamente e leve um casaco.");
    }

    if (newSuggestions.length === 0) {
      newSuggestions.push("✨ Condições climáticas favoráveis! Aproveite seu dia!");
    }

    setSuggestions(newSuggestions);
  }, [date, locationData, navigate]);

  if (!weather) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <Card className="p-6 border-2">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Previsão do Tempo
            </h1>
            <p className="text-muted-foreground">
              Data: {new Date(date).toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              Localização: {locationData.lat.toFixed(4)}, {locationData.lng.toFixed(4)}
            </p>
          </Card>

          {/* Weather Data Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 border-2">
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className="w-8 h-8 text-primary" />
                <h2 className="text-xl font-semibold">Temperatura</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Atual</span>
                  <span className="text-3xl font-bold text-primary">{weather.temperature}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sensação térmica</span>
                  <span className="text-xl font-semibold">{weather.feelsLike}°C</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-center gap-3 mb-4">
                <CloudRain className="w-8 h-8 text-primary" />
                <h2 className="text-xl font-semibold">Precipitação</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Chance de chuva</span>
                  <span className="text-3xl font-bold text-primary">{weather.rainChance}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all"
                    style={{ width: `${weather.rainChance}%` }}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-8 h-8 text-primary" />
                <h2 className="text-xl font-semibold">Umidade</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Umidade relativa</span>
                  <span className="text-3xl font-bold text-primary">{weather.humidity}%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-center gap-3 mb-4">
                <Wind className="w-8 h-8 text-primary" />
                <h2 className="text-xl font-semibold">Vento</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Velocidade</span>
                  <span className="text-3xl font-bold text-primary">{weather.windSpeed} km/h</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Condition */}
          <Card className="p-6 border-2 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center gap-3">
              {weather.condition === "Ensolarado" ? (
                <Sun className="w-12 h-12 text-primary" />
              ) : (
                <CloudDrizzle className="w-12 h-12 text-primary" />
              )}
              <div>
                <h2 className="text-2xl font-bold">{weather.condition}</h2>
                <p className="text-muted-foreground">Condição atual</p>
              </div>
            </div>
          </Card>

          {/* Suggestions */}
          <Card className="p-6 border-2">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-accent" />
              <h2 className="text-xl font-semibold">Sugestões Personalizadas</h2>
            </div>
            <div className="space-y-3">
              {suggestions.map((suggestion, idx) => (
                <div 
                  key={idx}
                  className="p-4 bg-muted rounded-lg border-l-4 border-accent"
                >
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
