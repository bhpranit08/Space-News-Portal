import { useState, useEffect } from 'react';
import { Rocket, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { get_launch_data } from "@/hooks/useRocketLaunch";
import type { RocketLaunch } from "@/types/api";

interface CountdownProps {
    launchDate: RocketLaunch;
}

function Countdown(props: CountdownProps) {
    const { launchDate } = props;
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const calculateCountdown = () => {
            const targetDate = launchDate.t0
                ? new Date(launchDate.t0)
                : new Date(parseInt(launchDate.sort_date, 10) * 1000);

            const now = new Date();
            const diff: number = targetDate.getTime() - now.getTime();

            if (diff < 0) {
                setCountdown('Launched');
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (days > 0) {
                setCountdown(`T-${days}d ${hours}h ${minutes}m`);
            } else if (hours > 0) {
                setCountdown(`T-${hours}h ${minutes}m ${seconds}s`);
            } else {
                setCountdown(`T-${minutes}m ${seconds}s`);
            }
        };

        calculateCountdown();
        const interval = setInterval(calculateCountdown, 1000);

        return () => clearInterval(interval);
    }, [launchDate]);

    return <span className="font-mono">{countdown}</span>;
}

const LaunchData = () => {
    const { launchData, loading } = get_launch_data();
    const launches: RocketLaunch[] = launchData?.result ?? [];

    const formatDate = (launch: RocketLaunch): string => {
        const targetDate = launch.t0
            ? new Date(launch.t0)
            : new Date(parseInt(launch.sort_date, 10) * 1000);

        return targetDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatTime = (launch: RocketLaunch): string => {
        if (launch.t0) {
            const date = new Date(launch.t0);
            return date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                timeZoneName: 'short'
            });
        }
        return 'TBD';
    };

    const getStatusColor = (launch: RocketLaunch): string => {
        if (launch.result === 1) return 'bg-green-500';
        if (launch.result === 0) return 'bg-red-500';

        const targetDate = launch.t0
            ? new Date(launch.t0)
            : new Date(parseInt(launch.sort_date, 10) * 1000);
        const now = new Date();
        const hoursUntil: number = (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (hoursUntil < 24 && hoursUntil > 0) return 'bg-yellow-500';
        return 'bg-blue-500';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <Skeleton className="h-12 w-64 mx-auto mb-4" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i: number) => (
                            <Card key={i}>
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-24 w-full" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-7xl mx-auto">
                
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Rocket className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Upcoming Rocket Launches
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Track the next space missions from around the world
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {launches.map((launch: RocketLaunch, idx: number) => (
                        <Card key={idx} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <Badge className={`${getStatusColor(launch)} text-white shrink-0 text-xs px-3 py-1`}>
                                        <Countdown launchDate={launch} />
                                    </Badge>
                                    <Badge variant="outline" className="shrink-0">
                                        {launch.provider?.name || 'Unknown'}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl leading-tight line-clamp-2">
                                    {launch.name}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {launch.vehicle?.name || 'Rocket'}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-muted-foreground mb-0.5">Launch Date</p>
                                        <p className="text-sm font-medium">
                                            {formatDate(launch)}
                                        </p>
                                    </div>
                                </div>

                                
                                <div className="flex items-start gap-3">
                                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-muted-foreground mb-0.5">Launch Time</p>
                                        <p className="text-sm font-medium">
                                            {formatTime(launch)}
                                        </p>
                                    </div>
                                </div>

                                
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                                        <p className="text-sm font-medium line-clamp-2">
                                            {launch.pad?.location?.name || 'Unknown Location'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0">
                                <Button 
                                    variant="outline" 
                                    className="w-full group-hover:bg-primary transition-colors"
                                    asChild
                                >
                                    <a href={`https://rocketlaunch.live/launch/${launch.slug}`} target="_blank" rel="noopener noreferrer">
                                        View Details
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                
                {!loading && launches.length === 0 && (
                    <div className="text-center py-12">
                        <Rocket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No Upcoming Launches</h3>
                        <p className="text-muted-foreground">Check back later for new launch schedules.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LaunchData;