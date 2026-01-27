import { useState, useEffect } from 'react';
import { Rocket, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { get_launch_data } from "@/hooks/useRocketLaunch";
import type { RocketLaunch } from "@/types/api";

interface CountdownTimerProps {
    targetDate: RocketLaunch;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateCountdown = () => {
            const launch = targetDate.t0
                ? new Date(targetDate.t0)
                : new Date(parseInt(targetDate.sort_date, 10) * 1000);

            const now = new Date();
            const diff = launch.getTime() - now.getTime();

            if (diff < 0) {
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        };

        calculateCountdown();
        const interval = setInterval(calculateCountdown, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const formatNumber = (num: number) => String(num).padStart(2, '0');

    return (
        <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square">
                    <div className="absolute inset-0 bg-linear-to-br from-red-600 via-red-700 to-red-900 rounded-lg transform rotate-1 opacity-20"></div>
                    <div className="relative bg-linear-to-br from-red-600 to-red-800 rounded-lg border-4 border-red-400/30 shadow-2xl overflow-hidden h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                        <span className="relative text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl font-mono tracking-tighter">
                            {formatNumber(countdown.days)}
                        </span>
                    </div>
                </div>
                <span className="text-xs md:text-sm font-bold text-red-500 mt-2 uppercase tracking-widest">Days</span>
            </div>

            <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square">
                    <div className="absolute inset-0 bg-linear-to-br from-orange-600 via-orange-700 to-orange-900 rounded-lg transform rotate-1 opacity-20"></div>
                    <div className="relative bg-linear-to-br from-orange-600 to-orange-800 rounded-lg border-4 border-orange-400/30 shadow-2xl overflow-hidden h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                        <span className="relative text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl font-mono tracking-tighter">
                            {formatNumber(countdown.hours)}
                        </span>
                    </div>
                </div>
                <span className="text-xs md:text-sm font-bold text-orange-500 mt-2 uppercase tracking-widest">Hours</span>
            </div>

            <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square">
                    <div className="absolute inset-0 bg-linear-to-br from-yellow-600 via-yellow-700 to-yellow-900 rounded-lg transform rotate-1 opacity-20"></div>
                    <div className="relative bg-linear-to-br from-yellow-600 to-yellow-800 rounded-lg border-4 border-yellow-400/30 shadow-2xl overflow-hidden h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                        <span className="relative text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl font-mono tracking-tighter">
                            {formatNumber(countdown.minutes)}
                        </span>
                    </div>
                </div>
                <span className="text-xs md:text-sm font-bold text-yellow-500 mt-2 uppercase tracking-widest">Minutes</span>
            </div>

            <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square">
                    <div className="absolute inset-0 bg-linear-to-br from-green-600 via-green-700 to-green-900 rounded-lg transform rotate-1 opacity-20"></div>
                    <div className="relative bg-linear-to-br from-green-600 to-green-800 rounded-lg border-4 border-green-400/30 shadow-2xl overflow-hidden h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                        <span className="relative text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl font-mono tracking-tighter">
                            {formatNumber(countdown.seconds)}
                        </span>
                    </div>
                </div>
                <span className="text-xs md:text-sm font-bold text-green-500 mt-2 uppercase tracking-widest">Seconds</span>
            </div>
        </div>
    );
};

const NextLaunch = () => {
    const { launchData, loading } = get_launch_data();
    const nextLaunch = launchData?.result?.[0];

    const formatDate = (launch: RocketLaunch) => {
        if (!launch) return '';
        const targetDate = launch.t0
            ? new Date(launch.t0)
            : new Date(parseInt(launch.sort_date, 10) * 1000);
        
        return targetDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
    };

    if (loading) {
        return (
            <div className="py-16 px-4 bg-linear-to-b from-background via-red-950/5 to-background">
                <div className="max-w-6xl mx-auto text-center">
                    <Skeleton className="h-12 w-64 mx-auto mb-8" />
                    <Skeleton className="h-48 w-full max-w-3xl mx-auto" />
                </div>
            </div>
        );
    }

    if (!nextLaunch) return null;

    return (
        <div className="py-16 px-4 bg-linear-to-b from-background via-red-950/5 to-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="max-w-6xl mx-auto relative">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-red-600/20 border-2 border-red-500/50 rounded-full px-6 py-2 mb-4">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Next Launch</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        {nextLaunch.name}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
                        <Badge variant="outline" className="text-base px-4 py-1">
                            {nextLaunch.provider?.name}
                        </Badge>
                        <span className="text-sm">•</span>
                        <Badge variant="outline" className="text-base px-4 py-1">
                            {nextLaunch.vehicle?.name}
                        </Badge>
                    </div>
                </div>

                <div className="mb-12">
                    <CountdownTimer targetDate={nextLaunch} />
                </div>

                <Card className="max-w-3xl mx-auto bg-linear-to-br from-background via-red-950/10 to-background border-red-500/20">
                    <div className="p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-red-600/20 rounded-lg">
                                    <Calendar className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                                        Launch Window
                                    </p>
                                    <p className="text-sm font-medium">
                                        {formatDate(nextLaunch)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-red-600/20 rounded-lg">
                                    <MapPin className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                                        Launch Site
                                    </p>
                                    <p className="text-sm font-medium">
                                        {nextLaunch.pad?.location?.name || 'Unknown'}
                                    </p>
                                </div>
                            </div>

                            {nextLaunch.mission_description && (
                                <div className="md:col-span-2 flex items-start gap-3">
                                    <div className="p-2 bg-red-600/20 rounded-lg">
                                        <Rocket className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                                            Mission
                                        </p>
                                        <p className="text-sm font-medium leading-relaxed">
                                            {nextLaunch.mission_description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex justify-center">
                            <Button 
                                size="lg"
                                className="bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold uppercase tracking-wider"
                                asChild
                            >
                                <a href={`https://rocketlaunch.live/launch/${nextLaunch.slug}`} target="_blank" rel="noopener noreferrer">
                                    <Rocket className="w-5 h-5 mr-2" />
                                    Watch Live Stream
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default NextLaunch;