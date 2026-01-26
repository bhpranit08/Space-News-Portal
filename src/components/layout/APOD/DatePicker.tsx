import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

export default function DatePickerSimple({ get_apod }) {
    const [date, setDate] = React.useState<Date>()

    React.useEffect(() => {
        if (!date) {
            const today = new Date();
            
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            
            const formattedDate = `${yyyy}-${mm}-${dd}`;

            get_apod(formattedDate)
        } else {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            
            const formattedDate = `${yyyy}-${mm}-${dd}`;

            get_apod(formattedDate)
        }
    }, [date])

    return (
        <Field className="mx-auto w-44">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date-picker-simple"
                        className="justify-start font-normal"
                    >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    )
}
