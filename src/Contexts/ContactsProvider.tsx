import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext : any = React.createContext({})

export function useContacts() : any {
    return useContext(ContactsContext)
}

interface ContactI {
    id: string,
    name: string
}

export default function ContactsProvider({ children }: {children : React.ReactNode }) {

    const [Contacts, setContacts] = useLocalStorage('Contacts', [])

    function createContact(id : string, name: string) {
        setContacts((prevContacts : ContactI[]) => {
            return [ ...prevContacts, {id, name}]
        })
    }
    return (
        <ContactsContext.Provider value={{ Contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    )
}
