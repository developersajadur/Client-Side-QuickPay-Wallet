import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';

const Root = () => {
    return (
        <div className='container mx-auto'>
             <Navbar/>
            <div className="px-2 md:px-5 lg:px-10">
            <Outlet/>
            </div>
        </div>
    );
};

export default Root;