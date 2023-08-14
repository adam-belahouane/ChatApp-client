import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { ContactI, useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext: any = React.createContext([])

export function useConversation(): any {
    return useContext(ConversationsContext)
}

export interface ConversationI {
    recipients: string[] | ContactI[],
    messages: Imessage[]
}

export interface Imessage {
    sender: string,
    text: string,
    senderName : string,
    fromMe : boolean
}

export function ConversationsProvider({ id, children }: { id: string, children: React.ReactNode }) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectConversationIndex, setSelectConversationIndex] = useState(0)
    const { Contacts } = useContacts()
    const { socket } = useSocket()

    function createConversation(recipients: string[]) {
        setConversations((prevConversations: []) => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }


    const addMessageToConversation = useCallback(({ recipients, text, sender}: {recipients: (ContactI[]|string[]), text: string, sender: string}) => {
        setConversations((prevConversations : ConversationI[]) => {
            let isChanged = false
            const newMessage = { sender, text }
            const newConversations= prevConversations.map(conversation => {
                if(arrayEquality(conversation.recipients, recipients)){
                    isChanged = true
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }
                return conversation
            })


            if(isChanged){
                return newConversations
            } else {
                return [... prevConversations, {
                    recipients, messages: [newMessage]
                }]
            }
        })

    }, [setConversations])

    useEffect(() => {
      if (socket == null) return

      socket.on('receive-message', addMessageToConversation)

      return () => socket.off('receive-message')
    },[socket, addMessageToConversation])
    

    function sendMessage(recipients: string[], text: string){
        console.log("im here");
        
        socket.emit('send-message', { recipients, text})
        addMessageToConversation({ recipients, text, sender :id})
    }

    const formattedConversations = conversations.map((conversation: ConversationI, index: number) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact : (ContactI | undefined)= Contacts.find((contact: ContactI) => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })

        const messages = conversation.messages.map(message => {
            const contact = Contacts.find((contact : ContactI) => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe}
        })
        const selected = index === selectConversationIndex
        return { ...conversation, messages, recipients, selected }
    })

    const value = {
        conversations : formattedConversations,
        selectConversation : formattedConversations[selectConversationIndex],
        sendMessage,
        selectConversationIndex : setSelectConversationIndex,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}

function arrayEquality(a: any, b: ContactI[] | string[]){
    if(a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element : any, index : number) => {
        return element === b[index]
    })
}
