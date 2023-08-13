import { useContacts, ContactI } from "../Contexts/ContactsProvider"

const Contacts = () => {
    const { Contacts } = useContacts()

    return(
        <div>
            {
                Contacts.map((contact : ContactI) => (
                    <div>
                        {contact.name}
                    </div>
                ))
            }
        </div>
    )
}

export default Contacts