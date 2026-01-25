import { useState, useEffect } from "react";

const get_apod = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [apod, setApod] = useState()

    const fetchApod = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`, {
                method: "GET"
            })

            const data = await response.json()

            setApod(data as any)
        } catch (err) {
            console.error(`Error fetching apod: ${(err as Error).message}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchApod()
    }, [])

    return { loading, apod, fetchApod }
}

const get_neo = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [neo, setNeo] = useState()

    const fetchNeo = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${import.meta.env.VITE_NASA_API_KEY}`, {
                method: "GET"
            })

            const data = await response.json()

            setNeo(data.near_earth_objects as any)
        } catch (err) {
            console.error(`Error fetching neo: ${(err as Error).message}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNeo()
    }, [])

    return { loading, neo, fetchNeo }
}

export { get_apod, get_neo }