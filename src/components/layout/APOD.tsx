import { Calendar, User, Copyright, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import DatePickerSimple from './APOD/DatePicker';

import { get_specific_apod } from '@/hooks/useNasaApi';

const APOD = () => {
    const { apod, get_apod } = get_specific_apod()

    return (
        <div className="min-h-screen bg-background w-full">
            {/* Hero Section */}
            <div className="bg-linear-to-b from-primary/10 to-background py-8 px-4 flex flex-col justify-start w-full items-center">
                <div className="max-w-6xl mx-auto">
                    <Badge className="mb-4">Astronomy Picture of the Day</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {apod?.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{apod?.date}</span>
                        </div>
                        {apod?.copyright && (
                            <>
                                <Separator orientation="vertical" className="h-4" />
                                <div className="flex items-center gap-2">
                                    <Copyright className="w-4 h-4" />
                                    <span className="text-sm">{apod?.copyright}</span>
                                </div>
                            </>
                        )}
                        <DatePickerSimple get_apod={get_apod} />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Image Section */}
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden mb-6">
                            <CardContent className="p-0">
                                <img 
                                    src={apod?.hdurl} 
                                    alt={apod?.title}
                                    className="w-full h-auto object-cover"
                                />
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <Button variant="outline" asChild className="flex-1 sm:flex-none">
                                <a href="https://apod.nasa.gov" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    NASA APOD
                                </a>
                            </Button>
                        </div>

                        {/* Explanation Section */}
                        <Card>
                            <CardContent className="pt-6">
                                <h2 className="text-2xl font-bold mb-4">About This Image</h2>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {apod?.explanation}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Image Details Card */}
                        <Card className="mb-6">
                            <CardContent className="pt-6">
                                <h3 className="font-semibold text-lg mb-4">Image Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Date</p>
                                        <p className="text-sm font-medium">{apod?.date}</p>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Media Type</p>
                                        <Badge variant="secondary" className="capitalize">
                                            {apod?.media_type}
                                        </Badge>
                                    </div>
                                    
                                    {apod?.copyright && (
                                        <>
                                            <Separator />
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Copyright</p>
                                                <p className="text-sm font-medium">{apod?.copyright}</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    <Separator />
                                    
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Source</p>
                                        <p className="text-sm font-medium">NASA APOD API</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Info Card */}
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    About APOD
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Each day a different image or photograph of our fascinating universe 
                                    is featured, along with a brief explanation written by a professional astronomer.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default APOD;