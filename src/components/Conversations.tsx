import { ConversationI, useConversation } from "../Contexts/ConversationsProvider"
import { ContactI } from "../Contexts/ContactsProvider"

const Conversations = () => {

    const { conversations } = useConversation()
    console.log(conversations);
    
    return(
        <div>
            {
                conversations.map((conversation : ConversationI) => (
                    <div>
                        {conversation.recipients.map((r : any) => r.name).join(', ')}
                    </div>
                ))
            }
        </div>
    )
}

export default Conversations