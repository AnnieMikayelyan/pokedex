import { useEffect, useRef } from 'react'

export const useOutsideClick = (onOutsideClick) => {
    const ref = useRef(null)

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onOutsideClick()
            }
        }

        document.addEventListener("click", handler);

        return () => document.removeEventListener("click", handler)
    }, [])

    return ref
}
