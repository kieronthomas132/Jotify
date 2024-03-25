import Navbar from "../navbar/navbar.tsx";
import Sidebar from "../notes/sidebar.tsx";
import Note from "../note/note.tsx";

const Main = () => {
    return (
        <div className='h-full'>
            <Navbar />
              <div className='flex h-[100%]'>
                  <Sidebar />
                  <Note/>
              </div>
        </div>
    );
}

export default Main;