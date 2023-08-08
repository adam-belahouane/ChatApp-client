import { useRef, FormEvent , Dispatch, SetStateAction } from "react"
import { v4 as uuidV4 } from 'uuid'

function Login( {setId}: {setId : Dispatch<SetStateAction<HTMLInputElement | null | undefined | string>>}) {
    const idRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setId(idRef.current)
    }

    const createNewId = () => {
        setId(uuidV4())
    }
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="user-id">Enter Your Id</label>
                    <input className="my-2 border border-gray-500 rounded " type="text" id="user-id" ref={idRef} />
                </div>
                <button className="bg-blue-500 text-white px-3 p-1 rounded mr-1" type="submit">Login</button>
                <button onClick={createNewId} className="bg-gray-500 text-white px-3 p-1 rounded ml-1"> Sign up</button>
            </form>
        </div>
    );
}

export default Login;