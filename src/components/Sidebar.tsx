import react, {useState} from "react"
import Conversations from "./Conversations"
import Contacts from "./Contacts"
import NewConversationModal from "./NewConversationModal"
import NewContactModal from "./NewContactModal"


function Sidebar({id} : {id : string}) {

    const [tab, setTab] = useState<String>("Conversations")
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function activeTab(str: string, isContent: boolean) {
        if(str === tab){
            if(isContent) return "absolute w-full top-0 pb-1 bg-white"
            return "border-gray-200"
        }

        if(!isContent) return "border-transparent"

        return ""
    }

    return (
        <div className="flex flex-col w-1/4 h-full">
            <div className="flex flex-row px-2">
                <button onClick={() => setTab("Conversations")} className={`border-2 relative rounded-sm ${activeTab("Conversations", false)} flex-1`}>
                    <div className={`${activeTab("Conversations", true)}`}>Conversations</div>
                </button>
                <button onClick={() => setTab("Contacts")}  className={`border-2 relative rounded-sm ${activeTab("Contacts", false)} flex-1`}>
                    <div className={`${activeTab("Contacts", true)}`}>Contacts</div>
                </button>
            </div>
            <div className="border-t-2 border-r-2 border-gray-200 h-full">
                {
                    tab === "Conversations"? <Conversations/> : <Contacts/>
                }
            </div>
            <div className="p-2 border-t-2 border-r-2 border-gray-200">
                Your Id : <span className="text-gray-400">{id}</span>
            </div>
            <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-lg text-white p-3 hover:bg-blue-950">
                New {tab == "Conversations"? "Conversation" : "Contact"}
            </button>
            {
                isOpen?tab === "Conversations"?<NewConversationModal setIsOpen={setIsOpen}/>:<NewContactModal setIsOpen={setIsOpen}/>: <></>
            }
        </div>
    )
}

export default Sidebar