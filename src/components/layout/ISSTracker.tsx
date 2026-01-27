import { useEffect, useState } from 'react';
import { Satellite, Users, MapPin, Gauge, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { get_iss_position } from "@/hooks/useIssApi";
import type { IssPerson } from "@/types/api";

const ISSTracker = () => {
    const { loadingPeople, loadingPosition, people, position } = get_iss_position();
    const [issCoordinates, setIssCoordinates] = useState({ x: 0, y: 0 });
    const peopleList: IssPerson[] = people?.people ?? [];

    useEffect(() => {
        if (!position?.iss_position) return;

        const lat = parseFloat(position.iss_position.latitude);
        const lng = parseFloat(position.iss_position.longitude);

        const x = ((lng + 180) / 360) * 100;
        const y = ((90 - lat) / 180) * 100;

        setIssCoordinates({ x, y });
    }, [position]);

    const formatCoordinate = (value: string | number | undefined, type: 'lat' | 'lng') => {
        if (value === undefined || value === '') return '—';
        const num = typeof value === 'number' ? value : parseFloat(String(value));
        const abs = Math.abs(num).toFixed(2);
        if (type === 'lat') {
            return `${abs}° ${num >= 0 ? 'N' : 'S'}`;
        }
        return `${abs}° ${num >= 0 ? 'E' : 'W'}`;
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Satellite className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        ISS Live Tracker
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Follow the International Space Station in real-time
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="w-5 h-5" />
                                    Current Position
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loadingPosition ? (
                                    <Skeleton className="w-full h-[400px]" />
                                ) : (
                                    <>
                                        <div className="relative w-full bg-gray-950 rounded-lg overflow-hidden border border-gray-800">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
                                                alt="World Map"
                                                className="w-full h-auto opacity-80"
                                                style={{ minHeight: '400px', objectFit: 'cover' }}
                                            />

                                            <div
                                                className="absolute transition-all duration-1000 ease-linear"
                                                style={{
                                                    left: `${issCoordinates.x}%`,
                                                    top: `${issCoordinates.y}%`,
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            >
                                                <div className="absolute inset-0 animate-ping">
                                                    <div className="w-16 h-16 rounded-full bg-blue-500 opacity-75"></div>
                                                </div>

                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-20 h-20 rounded-full bg-blue-500 opacity-30 blur-xl"></div>
                                                </div>

                                                <div className="relative z-10 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                                                    <Satellite className="w-6 h-6 text-white" />
                                                </div>

                                                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                    ISS
                                                </div>
                                            </div>

                                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs font-mono">
                                                <div>{formatCoordinate(position?.iss_position?.latitude, 'lat')}</div>
                                                <div>{formatCoordinate(position?.iss_position?.longitude, 'lng')}</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                            <div className="bg-muted/50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-xs font-medium">Latitude</span>
                                                </div>
                                                <p className="text-xl font-bold">
                                                    {formatCoordinate(position?.iss_position?.latitude, 'lat')}
                                                </p>
                                            </div>

                                            <div className="bg-muted/50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-xs font-medium">Longitude</span>
                                                </div>
                                                <p className="text-xl font-bold">
                                                    {formatCoordinate(position?.iss_position?.longitude, 'lng')}
                                                </p>
                                            </div>

                                            <div className="bg-muted/50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                                    <Gauge className="w-4 h-4" />
                                                    <span className="text-xs font-medium">Altitude</span>
                                                </div>
                                                <p className="text-xl font-bold">~408 km</p>
                                            </div>

                                            <div className="bg-muted/50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                                    <Gauge className="w-4 h-4" />
                                                    <span className="text-xs font-medium">Speed</span>
                                                </div>
                                                <p className="text-xl font-bold">27,600 km/h</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    People in Space
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loadingPeople ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i: number) => (
                                            <Skeleton key={i} className="h-16 w-full" />
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-4">
                                            <div className="flex items-center justify-center gap-2 bg-primary/10 rounded-lg p-3">
                                                <span className="text-3xl font-bold text-primary">
                                                    {people?.number || 0}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    people currently in space
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                            {peopleList.map((person, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                                            <Users className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm">
                                                                {person.name}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Astronaut
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="secondary" className="shrink-0">
                                                        {person.craft}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>

                                        {peopleList.length === 0 && (
                                            <div className="text-center py-8">
                                                <p className="text-sm text-muted-foreground">
                                                    No astronaut data available
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="mt-6 bg-primary/5 border-primary/20">
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Satellite className="w-4 h-4" />
                                    About the ISS
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    The International Space Station is a habitable artificial satellite 
                                    in low Earth orbit. It serves as a microgravity and space environment 
                                    research laboratory where scientific research is conducted in astrobiology, 
                                    astronomy, meteorology, physics, and other fields.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ISSTracker;