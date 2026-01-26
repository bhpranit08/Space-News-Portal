import { useEffect, useState } from "react";

const get_launch_data = () => {
    const [loading, setLoading] = useState(false)
    const [launchData, setLaunchData] = useState()

    const get_data = async() => {
        setLoading(true)
        try {
            const response = await fetch(`https://fdo.rocketlaunch.live/json/launches/next/5`, {
                method: "GET"
            })

            const data = await response.json()

            setLaunchData(data as any)
        } catch (err) {
            console.error(`Error fetching apod: ${(err as Error).message}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        get_data()
    }, [])

    return { loading, launchData, get_data }
}

export { get_launch_data }