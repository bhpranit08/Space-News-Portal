import { useEffect, useState } from "react";
import type { IssPeopleResponse, IssPositionResponse } from "@/types/api";

const get_iss_position = () => {
    const [loadingPosition, setLoadingPosition] = useState<boolean>(false);
    const [loadingPeople, setLoadingPeople] = useState<boolean>(false);
    const [position, setPosition] = useState<IssPositionResponse | undefined>();
    const [people, setPeople] = useState<IssPeopleResponse | undefined>();

    const fetch_position = async () => {
        setLoadingPosition(true)
        try {
            const response = await fetch(`https://api.wheretheiss.at/v1/satellites/25544`, {
                method: "GET"
            })
            const data = await response.json()

            setPosition(data as IssPositionResponse)
        } catch (err) {
            console.error(`Error fetching apod: ${(err as Error).message}`)
        } finally {
            setLoadingPosition(false)
        }
    }

    const fetch_people = async () => {
        setLoadingPeople(true)
        try {
            const response = await fetch('https://ll.thespacedevs.com/2.2.0/astronaut/?in_space=true&format=json')
            const data = await response.json()

            const mapped: IssPeopleResponse = {
                number: data.count,
                people: data.results.map((a: { name: string; spacecraft?: string }) => ({
                    name: a.name,
                    craft: a.spacecraft ?? 'ISS'
                })),
            }
            setPeople(mapped)
        } catch (err) {
            console.error(`Error fetching people: ${(err as Error).message}`)
        } finally {
            setLoadingPeople(false)
        }
    }

    useEffect(() => {
        fetch_position()
        fetch_people()
    }, [])

    return { loadingPosition, loadingPeople, people, position }
}

export { get_iss_position }