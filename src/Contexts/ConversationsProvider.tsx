import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ConversationsContext: any = React.createContext({})

export function useConversation() : any {
    return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }: { id: string, children: React.ReactNode }) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])

    function createConversation(recipients: string[]) {
        setConversations((prevConversations: []) => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    return (
        <ConversationsContext.Provider value={{ conversations, createConversation }}>
            {children}
        </ConversationsContext.Provider>
    )
}
