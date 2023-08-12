import React, { useRef } from "react"
import { useContacts } from "../Contexts/ContactsProvider"


function NewContactModal({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const idRef : React.RefObject<HTMLInputElement> = useRef(null)
    const nameRef : React.RefObject<HTMLInputElement> = useRef(null)
    const { createContact } = useContacts()
    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        createContact(idRef.current?.value, nameRef.current?.value)


        setIsOpen(false)
    }
    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50`}>
            <div className="bg-white p-8 rounded w-1/2">
                <h2 className="text-xl font-semibold mb-4">Create Contact</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Id</h3>
                    <input type="text" required ref={idRef}/>
                    <h3>Name</h3>
                    <input type="text" required ref={nameRef} />
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

export default NewContactModal