import { useState, useEffect } from "react";
import type { NeoFeed } from "@/types/api";

const get_apod = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [apod, setApod] = useState<Record<string, unknown> | undefined>();

    const fetchApod = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`, {
                method: "GET"
            })

            const data = await response.json()

            setApod(data as Record<string, unknown>)
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
    const [loading, setLoading] = useState<boolean>(false);
    const [neo, setNeo] = useState<NeoFeed | undefined>();

    const fetchNeo = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${import.meta.env.VITE_NASA_API_KEY}`, {
                method: "GET"
            })

            const data = await response.json()

            setNeo(data.near_earth_objects as NeoFeed)
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

const get_specific_apod = () => {
    const [loading, setLoading] = useState(false)
    const [apod, setApod] = useState<any>(null)
    const [error, setError] = useState<string | undefined>()

    const get_apod = async (targetDate: string) => {
        setLoading(true)
        try {
            const response = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&date=${targetDate}`
            )
            const data = await response.json()

            if (data.code === 404 || data.msg) {
                setError(data.msg || "No data avaliable for this date")
                setApod(undefined)
                return
            }

            setError(undefined)
            setApod(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return { loading, apod, get_apod, error }
}


export { get_apod, get_neo, get_specific_apod }