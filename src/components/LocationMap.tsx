import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LocationMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function LocationMap({ onLocationSelect }: LocationMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert click coordinates to approximate lat/lng
    // This is a simple simulation - in production you'd use a real map library
    const lat = -23.5505 + (y - rect.height / 2) / 1000;
    const lng = -46.6333 + (x - rect.width / 2) / 1000;
    
    setSelectedLocation({ lat, lng });
    onLocationSelect(lat, lng);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setSelectedLocation({ lat, lng });
          onLocationSelect(lat, lng);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <Card className="w-full h-full min-h-[400px] rounded-xl overflow-hidden relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
      <div 
        className="w-full h-full cursor-crosshair relative"
        onClick={handleMapClick}
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center p-6 bg-card/80 backdrop-blur-sm rounded-xl">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-primary" />
            <p className="text-sm font-medium mb-1">Mapa Interativo</p>
            <p className="text-xs text-muted-foreground">Clique para selecionar uma localização</p>
          </div>
        </div>

        {selectedLocation && (
          <div 
            className="absolute w-8 h-8 -ml-4 -mt-8"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <MapPin className="w-8 h-8 text-primary drop-shadow-lg animate-in zoom-in" />
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex gap-2 pointer-events-auto">
          <Button
            onClick={handleCurrentLocation}
            variant="secondary"
            size="sm"
            className="shadow-lg"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Usar minha localização
          </Button>
          
          {selectedLocation && (
            <div className="flex-1 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-center shadow-lg">
              {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
