import Sidebar from "../components/Sidebar";


export default function Dashboard({id} : {id: string}) {
    return(
        <div className="h-[100vh]">
            <Sidebar id={id} />
        </div>
    )
}