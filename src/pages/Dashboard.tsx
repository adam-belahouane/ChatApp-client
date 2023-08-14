import { useConversation } from "../Contexts/ConversationsProvider";
import Openconversation from "../components/Openconversation";
import Sidebar from "../components/Sidebar";


export default function Dashboard({id} : {id: string}) {
    const { selectConversation } = useConversation()
    return(
        <div className="h-[100vh] flex">
            <Sidebar id={id} />
            { selectConversation && <Openconversation/>}
        </div>
    )
}