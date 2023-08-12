

function NewConversationModal({setIsOpen}: {setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50`}>
            <div className="bg-white p-8 rounded shadow-lg w-64">
                <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
                <p>Cons</p>
                <button onClick={() => setIsOpen(false)} className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400">
                    Close
                </button>
            </div>
        </div>
    )
}

export default NewConversationModal