import { useEffect, useState } from 'react'
import { ContactI } from '../Contexts/ContactsProvider'
import { ConversationI } from '../Contexts/ConversationsProvider'

const PREFIX = 'whatsapp-clone-'

export default function useLocalStorage(key : string, initialValue : any) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if(jsonValue !== null) return JSON.parse(jsonValue)
        if ( typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}
