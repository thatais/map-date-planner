import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DateSelector from "./DateSelector";
import LocationMap from "./LocationMap";
import { toast } from "sonner";

export default function SearchSection() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleSearch = () => {
    if (!selectedDate || !selectedLocation) {
      toast.error("Por favor, selecione uma data e localização");
      return;
    }
    
    navigate("/results", { 
      state: { 
        date: selectedDate, 
        locationData: selectedLocation 
      } 
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <Card className="p-6 shadow-lg border-2">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Selecione a Data
              </label>
              <DateSelector onDateSelect={setSelectedDate} />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {selectedLocation 
                  ? `Localização: ${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`
                  : "Clique no mapa para selecionar"}
              </label>
            </div>

            <Button 
              onClick={handleSearch}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Pesquisar
            </Button>
          </div>

          <div className="h-[400px] md:h-auto rounded-xl overflow-hidden">
            <LocationMap onLocationSelect={(lat, lng) => setSelectedLocation({ lat, lng })} />
          </div>
        </div>
      </Card>
    </div>
  );
}
