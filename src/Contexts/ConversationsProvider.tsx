import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { ContactI, useContacts } from './ContactsProvider'

const ConversationsContext: any = React.createContext([])

export function useConversation(): any {
    return useContext(ConversationsContext)
}

export interface ConversationI {
    recipients: string[] | ContactI[],
    messages: string[]
}

export function ConversationsProvider({ id, children }: { id: string, children: React.ReactNode }) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const { Contacts } = useContacts()

    function createConversation(recipients: string[]) {
        setConversations((prevConversations: []) => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    const formattedConversations = conversations.map((conversation: ConversationI) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact : (ContactI | undefined)= Contacts.find((contact: ContactI) => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })
        return { ...conversation, recipients }
    })

    const value = {
        conversations : formattedConversations,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}
