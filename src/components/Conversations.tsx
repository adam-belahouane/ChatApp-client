import { ConversationI, useConversation } from "../Contexts/ConversationsProvider"
import { ContactI } from "../Contexts/ContactsProvider"

const Conversations = () => {

    const { conversations, selectConversationIndex } = useConversation()
    
    return(
        <div>
            {
                conversations.map((conversation : any, index: number) => (
                    <div key={index} onClick={() => selectConversationIndex(index)} className={`${conversation.selected ? "bg-blue-600 text-white": ""}`}>
                        {conversation.recipients.map((r : any) => r.name).join(', ')}
                    </div>
                ))
            }
        </div>
    )
}

export default Conversations