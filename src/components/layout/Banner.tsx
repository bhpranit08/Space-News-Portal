import { get_apod } from "../../hooks/useNasaApi"
import { Button } from "../ui/button"

const Banner = () => {
    const { apod } = get_apod()

    return (
        <div className="relative mt-6 w-full overflow-hidden rounded-2xl bg-slate-900">
            <div
                className="h-screen w-full bg-cover bg-center brightness-90"
                style={{
                    backgroundImage:
                        `url('${(apod as any)?.hdurl}')`,
                }}
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-4 left-5 flex flex-col gap-1 text-white drop-shadow-lg">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-200">
                    Astronomy Picture Of The Day
                </p>
                <h2 className="text-2xl font-bold leading-tight">
                    {(apod as any)?.title}
                </h2>
                <Button className="w-sm hover:cursor-pointer">
                    Learn More
                </Button>
            </div>
        </div>
    )
}

export default Banner
