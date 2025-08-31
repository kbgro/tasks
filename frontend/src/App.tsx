import { Routes, Route } from "react-router";
import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx";
import Tasks from "./pages/Tasks.tsx";
import AddTask from "./pages/AddTask.tsx";
import ViewTask from "./pages/ViewTask.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks/new" element={<AddTask />} />
            <Route path="/tasks/:id" element={<ViewTask />} />
        </Routes>
    );
}

export default App;
