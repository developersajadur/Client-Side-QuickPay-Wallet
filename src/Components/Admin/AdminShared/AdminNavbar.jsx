import { FaUsers } from 'react-icons/fa';
import useUser from '../../Hooks/useUser';
import { IoMdGitPullRequest } from 'react-icons/io';
import { LuLayoutDashboard } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    const { user } = useUser();

    return (
        <div className='bg-blue-500 h-screen px-5 pt-8 '>
          <div className="">
              <h2 className="text-xl font-medium mb-8">{`Hi, ${user?.name || "Name Not Found"}`}</h2>
            </div>
            <div className="flex flex-col gap-5">
                <Link to='/admin/dashboard'>
                <div className="flex gap-2 items-center w-fit">
                <LuLayoutDashboard className='text-xl font-semibold'/>
                <h5 className="text-xl font-semibold">Dashboard</h5>
                </div>
                </Link>
                <Link to='/admin/users'>
                <div className="flex gap-2 items-center w-fit">
                <FaUsers className='text-xl font-semibold'/>
                <h5 className="text-xl font-semibold">Users</h5>
                </div>
                </Link>
                <Link to='/admin/translations'>
                <div className="flex gap-2 items-center w-fit">
                <IoMdGitPullRequest className='text-xl font-semibold'/>
                <h5 className="text-xl font-semibold">Translations</h5>
                </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminNavbar;