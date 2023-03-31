import Notes from "../components/Notes.js"
import Addnote from "./Addnote.js";

const Home = () => {
    return (<>
        <div className="container ">
            <Addnote/>
            <Notes />
        </div>

    </>);
}
export default Home;