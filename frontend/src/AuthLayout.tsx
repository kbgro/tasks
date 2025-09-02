import { Outlet, useNavigate } from 'react-router';
import Header from './components/Header';
import { useAppSelector } from './store/hooks';
import { useEffect } from 'react';

function AuthLayout() {
    const navigate = useNavigate();
    const { loggedIn } = useAppSelector((s) => s.users);

    useEffect(() => {
        if (!loggedIn) navigate('/login');
    }, [loggedIn]);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default AuthLayout;
