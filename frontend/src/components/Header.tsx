import { NavLink } from 'react-router';
import icon from '../assets/icon.svg';

function Header() {
    const handleLogout = () => {};

    return (
        <header className="shadow p-1">
            <nav className="container mx-auto p-1">
                <div className="flex justify-between items-center">
                    <NavLink to="/" className="p-2 shadow rounded-full hover:p-2 hover:bg-white">
                        <img src={icon} width={28} height={28} />
                    </NavLink>
                    <div className="items-center">
                        <button
                            type="button"
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
