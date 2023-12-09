import Dashboard from "./pages/dashboard";
import Create from "./pages/create";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Home />
                            </>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <>
                                <Dashboard />
                            </>
                        }
                    />
                    <Route
                        path="/create"
                        element={
                            <>
                                <Create />
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
