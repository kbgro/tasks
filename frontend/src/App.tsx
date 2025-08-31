import { Routes, Route } from 'react-router';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Tasks from './pages/Tasks.tsx';
import AddTask from './pages/AddTask.tsx';
import ViewTask from './pages/ViewTask.tsx';
import AuthLayout from './AuthLayout.tsx';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AuthLayout/>}>
                <Route path="/" element={<Tasks />} />
                <Route path="/tasks/new" element={<AddTask />} />
                <Route path="/tasks/:id" element={<ViewTask />} />
            </Route>
        </Routes>
    );
}

export default App;
