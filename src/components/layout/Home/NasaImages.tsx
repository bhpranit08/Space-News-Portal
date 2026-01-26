import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rocket, Sparkles, Telescope, ArrowRight } from 'lucide-react';

const NasaImages = () => {

    const data = [
        {
            id: 1,
            title: "Mars Exploration",
            description: "Discover stunning images from Mars rovers including Perseverance, Curiosity, and historic missions to the Red Planet.",
            query: "mars+rover+perseverance",
            icon: "rocket",
            color: "text-red-500"
        },
        {
            id: 2,
            title: "Nebulae & Galaxies",
            description: "Explore breathtaking cosmic landscapes captured by Hubble and James Webb Space Telescopes showcasing the beauty of our universe.",
            query: "nebula+galaxy+hubble",
            icon: "sparkles",
            color: "text-purple-500"
        },
        {
            id: 3,
            title: "Spacecraft & Missions",
            description: "View iconic spacecraft, rockets, and historic space missions from Apollo to modern day exploration vehicles.",
            query: "spacecraft+rocket+mission",
            icon: "telescope",
            color: "text-blue-500"
        }
    ];

    const getIcon = (iconName, className) => {
        const icons = {
            rocket: <Rocket className={className} />,
            sparkles: <Sparkles className={className} />,
            telescope: <Telescope className={className} />
        };
        return icons[iconName] || <Rocket className={className} />;
    };

    const handleExplore = (query) => {
        // Navigate to gallery page with query parameter
        // or fetch images based on query
        console.log(`Exploring: ${query}`);
        // Example: router.push(`/gallery?q=${query}`)
        // or setSearchQuery(query) and fetch images
    };

    // Component
    return (
        <div className='flex flex-col gap-6 w-full'>
            <h1 className="text-2xl font-semibold tracking-[0.3rem] w-full text-center">
                Explore Gallery
            </h1>
            <div className="grid w-full gap-4 md:grid-cols-3">

                {data.map((category) => (
                    <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className={`${category.color} transition-transform group-hover:scale-110 duration-300`}>
                                        {getIcon(category.icon, "w-6 h-6")}
                                    </div>
                                    <CardTitle className="text-xl">{category.title}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
        
                        <CardContent>
                            <CardDescription className="text-sm leading-relaxed">
                                {category.description}
                            </CardDescription>
                        </CardContent>
        
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleExplore(category.query)}
                            >
                                Explore Gallery
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default NasaImages