import react, {useState} from "react"
import Conversations from "./Conversations"
import Contacts from "./Contacts"


function Sidebar() {

    const [tab, setTab] = useState<String>("Conversations")

    function activeTab(str: string, isContent: boolean) {
        if(str === tab){
            if(isContent) return "absolute w-full top-0 bg-white"
            return "border-2 border-black relative"
        }

        return ""
    }

    return (
        <div className="flex flex-col w-1/4 h-full">
            <div className="flex flex-row border-b-2 border-black px-2">
                <button onClick={() => setTab("Conversations")} className={`${activeTab("Conversations", false)} flex-1`}>
                    <div className={`${activeTab("Conversations", true)}`}>Conversations</div>
                </button>
                <button onClick={() => setTab("Contacts")}  className={`${activeTab("Contacts", false)} flex-1`}>
                    <div className={`${activeTab("Contacts", true)}`}>Contacts</div>
                </button>
            </div>
            <div>
                {
                    tab === "Conversations"? <Conversations/> : <Contacts/>
                }
            </div>
        </div>
    )
}

export default Sidebar