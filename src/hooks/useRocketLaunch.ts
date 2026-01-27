import { useEffect, useState } from "react";
import type { RocketLaunchApiResponse } from "@/types/api";

export type LaunchDataHookReturn = {
    loading: boolean;
    launchData: RocketLaunchApiResponse | undefined;
    get_data: () => Promise<void>;
};

const get_launch_data = (): LaunchDataHookReturn => {
    const [loading, setLoading] = useState(false);
    const [launchData, setLaunchData] = useState<RocketLaunchApiResponse | undefined>();

    const get_data = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://fdo.rocketlaunch.live/json/launches/next/5`, {
                method: "GET",
            });
            const data = await response.json();
            setLaunchData(data as RocketLaunchApiResponse);
        } catch (err) {
            console.error(`Error fetching launch data: ${(err as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get_data();
    }, []);

    return { loading, launchData, get_data };
};

export { get_launch_data }