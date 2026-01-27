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
            const response = await fetch(`https://corsproxy.io/?http://api.open-notify.org/iss-now.json`, {
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
            const response = await fetch(`https://corsproxy.io/?http://api.open-notify.org/astros.json`, {
                method: "GET"
            })

            const data = await response.json()

            setPeople(data as IssPeopleResponse)
        } catch (err) {
            console.error(`Error fetching apod: ${(err as Error).message}`)
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