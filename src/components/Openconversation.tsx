import React, { useCallback, useState } from 'react'
import { Imessage, useConversation } from '../Contexts/ConversationsProvider'

function Openconversation() {
    const [text, setText] = useState<string>("")
    const { sendMessage, selectConversation } = useConversation()
    const setRef = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            node.scrollIntoView({ behavior: 'smooth' })
          }
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        sendMessage(
            selectConversation.recipients.map((r: any) => r.id),
            text
        )

        setText("")
    }
    return (
        <div className='flex flex-col flex-grow'>
            <div className='flex-grow overflow-auto'>
                <div className='flex flex-col items-start min-h-full justify-end px-3'>
                    {
                        selectConversation.messages.map((messsage: Imessage, index: number) => {
                            const lastMessage = selectConversation.messages.length - 1 === index
                            return <div ref={lastMessage ? setRef : null} key={index} className={`my-1 flex flex-col ${messsage.fromMe ? 'self-end' : ''}`}>
                                <div className={`rounded px-2 py-1 text-lg ${messsage.fromMe ? 'bg-blue-500 text-white' : 'border border-gray-300'}`}>{messsage.text}</div>
                                <div className={` text-gray-400 text-sm ${messsage.fromMe ? 'text-right' : ''}`}>{messsage.fromMe ? "You" : messsage.senderName}</div>
                            </div>
                        })
                    }

                </div>

            </div>
            <form className='flex w-full' onSubmit={handleSubmit}>
                <div className=' h-[75px] m-2 w-full flex'>
                    <input className='border-2 border-gray-300 border-r-0 rounded-l h-full resize-none flex-grow-[4]' type="textarea" required value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
                    <button className='bg-blue-500 text-white text-lg h-full px-2 rounded-r flex-grow '>Send</button>
                </div>
            </form>
        </div>
    )
}

export default Openconversation