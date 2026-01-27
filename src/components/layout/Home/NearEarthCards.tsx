import { Card, CardTitle, CardHeader, CardAction, CardContent, CardFooter } from "@/components/ui/card"
import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle, Zap, Ruler, Navigation, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { get_neo } from "@/hooks/useNasaApi"

const NearEarthCards = () => {
    const { neo } = get_neo()

    const firstDateData = neo ? Object.values(neo)?.[0]?.length > 2 ? Object.values(neo)[0] : Object.values(neo)[1] : null;

    return (
        <div className="flex flex-col gap-6 w-full">
            <h1 className="text-2xl font-semibold tracking-[0.3rem] w-full text-center">
                Near Earth Objects
            </h1>

            <div className="grid w-full gap-4 md:grid-cols-3">
                {firstDateData?.slice(0, 3).map((card, idx) => {
                    const avgDiameter = (
                        (card.estimated_diameter.meters.estimated_diameter_min +
                        card.estimated_diameter.meters.estimated_diameter_max) / 2
                    ).toFixed(2);

                    return (
                        <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-4">
                                    <CardTitle className="text-lg leading-tight">{card?.name}</CardTitle>
                                    <CardAction>
                                        {card.is_potentially_hazardous_asteroid ? (
                                            <Badge variant="destructive" className="shrink-0">High Risk</Badge>
                                        ) : (
                                            <Badge className="shrink-0 bg-green-600 text-white">Low Risk</Badge>
                                        )}
                                    </CardAction>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <Ruler className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                            Estimated Diameter
                                        </h3>
                                        <p className="text-sm">
                                            {card.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} - {card.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} meters
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Avg: {avgDiameter} meters
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t pt-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium text-muted-foreground">Velocity</span>
                                        </div>
                                        <span className="text-sm font-medium">
                                            {parseFloat(card.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString('en-US', { maximumFractionDigits: 0 })} km/h
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Navigation className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium text-muted-foreground">Miss Distance</span>
                                        </div>
                                        <span className="text-sm font-medium">
                                            {parseFloat(card.close_approach_data[0].miss_distance.kilometers).toLocaleString('en-US', { maximumFractionDigits: 0 })} km
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium text-muted-foreground">Close Approach</span>
                                        </div>
                                        <span className="text-sm font-medium">
                                            {card.close_approach_data[0].close_approach_date_full}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>

                            {card.is_potentially_hazardous_asteroid && (
                                <CardFooter className="pt-0">
                                    <Alert variant="destructive" className="w-full">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle className="text-sm">Potentially Hazardous Asteroid</AlertTitle>
                                    </Alert>
                                </CardFooter>
                            )}
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default NearEarthCards