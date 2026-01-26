import { Rocket, Telescope, Sparkles, Globe, Code, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
    const features = [
        {
            icon: Telescope,
            title: "Astronomy Picture of the Day",
            description: "Discover stunning space imagery curated daily by NASA, featuring galaxies, nebulae, and cosmic phenomena.",
            color: "text-purple-500"
        },
        {
            icon: Rocket,
            title: "Rocket Launch Data",
            description: "See the next few rocket launches happening as of right now.",
            color: "text-red-500"
        },
        {
            icon: Sparkles,
            title: "Near-Earth Objects",
            description: "Monitor asteroids approaching Earth with real-time data on size, velocity, and potential hazards.",
            color: "text-yellow-500"
        },
        {
            icon: Globe,
            title: "Space Image Gallery",
            description: "Browse through curated collections of space imagery from various NASA missions and telescopes.",
            color: "text-blue-500"
        }
    ];

    const techStack = [
        { name: "React", type: "Frontend" },
        { name: "Tailwind CSS", type: "Styling" },
        { name: "Shadcn/ui", type: "Components" },
        { name: "NASA APIs", type: "Data Source" },
        { name: "Lucide React", type: "Icons" }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-primary/10 to-background py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <Rocket className="w-12 h-12 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        About Space News Portal
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A comprehensive space exploration platform bringing NASA's incredible data 
                        and imagery directly to you. Built as a school project to showcase the wonders 
                        of our universe.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Mission Statement */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                                To make space exploration data accessible and engaging for everyone by leveraging 
                                NASA's open APIs. We aim to inspire curiosity about the cosmos through 
                                stunning imagery, real-time data, and educational content about our universe's 
                                most fascinating phenomena.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={idx} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Icon className={`w-6 h-6 ${feature.color}`} />
                                            <CardTitle className="text-xl">{feature.title}</CardTitle>
                                        </div>
                                        <CardDescription className="leading-relaxed">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Built With</h2>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2 justify-center mb-4">
                                <Code className="w-5 h-5 text-primary" />
                                <CardTitle>Technology Stack</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3 justify-center">
                                {techStack.map((tech, idx) => (
                                    <Badge key={idx} variant="secondary" className="px-4 py-2 text-sm">
                                        {tech.name}
                                        <span className="ml-2 text-xs text-muted-foreground">
                                            {tech.type}
                                        </span>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Source */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Data & Attribution</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                                <Database className="w-8 h-8 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">NASA Open APIs</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        All data and imagery on this platform are provided by NASA's public APIs, 
                                        including the Astronomy Picture of the Day (APOD), Near-Earth Object Web 
                                        Service and NASA Image and Video Library.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        This project is a student initiative and is not affiliated with or 
                                        endorsed by NASA. All content belongs to their respective owners and is 
                                        used for educational purposes.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default About;