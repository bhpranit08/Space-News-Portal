export interface RocketLaunchPadLocation {
    name?: string;
}

export interface RocketLaunchPad {
    location?: RocketLaunchPadLocation;
}

export interface RocketLaunchProvider {
    name?: string;
}

export interface RocketLaunchVehicle {
    name?: string;
}

export interface RocketLaunch {
    t0?: string;
    sort_date: string;
    name: string;
    slug?: string;
    mission_description?: string | null;
    provider?: RocketLaunchProvider;
    vehicle?: RocketLaunchVehicle;
    pad?: RocketLaunchPad;
    result?: number;
}

export interface RocketLaunchApiResponse {
    result: RocketLaunch[];
}

export interface NeoEstimatedDiameterMeters {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface NeoEstimatedDiameter {
    meters: NeoEstimatedDiameterMeters;
}

export interface NeoCloseApproachDatum {
    close_approach_date_full: string;
    relative_velocity: { kilometers_per_hour: string };
    miss_distance: { kilometers: string };
}

export interface NeoEntry {
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: NeoEstimatedDiameter;
    close_approach_data: NeoCloseApproachDatum[];
}

export type NeoFeed = Record<string, NeoEntry[]>;

export interface IssPosition {
    latitude: string;
    longitude: string;
}

export interface IssPositionResponse {
    longitude: number;
    latitude: number;
    velocity: number;
    altitude: number;
}

export interface IssPerson {
    name: string;
    craft: string;
}

export interface IssPeopleResponse {
    number: number;
    people: IssPerson[];
}
