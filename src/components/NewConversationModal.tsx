import { ContactI, useContacts } from "../Contexts/ContactsProvider"
import { useState } from "react"
import { useConversation } from "../Contexts/ConversationsProvider"


function NewConversationModal({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [selectedContactIds, setSelectedContactIds] = useState<string[]>([])
    const { Contacts } = useContacts()
    const { createConversation } = useConversation()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createConversation(selectedContactIds)
        setIsOpen(false)
    }

    function handleCheckboxChange(contactId: string) {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }
    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50`}>
            <div className="bg-white p-8 rounded w-1/2">
                <h2 className="text-xl font-semibold mb-4">Create Contact</h2>
                <form onSubmit={handleSubmit}>
                    {
                        Contacts.map((contact: ContactI) => (
                            <div>
                                <h4>{contact.name}</h4>
                                <input type="checkbox"
                                    checked={selectedContactIds.includes(contact.id)}
                                    onChange={() => handleCheckboxChange(contact.id)} />
                            </div>
                        ))
                    }

                    <div className="flex w-full justify-between">
                        <button type="submit" className="mt-4 px-4 py-2 rounded w-[45%] bg-blue-300 hover:bg-blue-400">
                            Create
                        </button>
                        <button onClick={() => setIsOpen(false)} className="mt-4 px-4 py-2 rounded w-[45%] bg-gray-300 hover:bg-gray-400">
                            Close
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default NewConversationModal