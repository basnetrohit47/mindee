import { useEffect, useState } from "react"

export const useDebounce = (value: string) => {
    const [debouncedValue, setDebouncedValue] = useState("");
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 500)
        return () => {
            clearTimeout(handler)
        }
    }, [value])
    return debouncedValue
}