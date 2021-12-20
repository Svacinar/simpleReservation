import Header from "./components/UI/Header";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import PreviousReservations from "./routes/PreviousReservations";
import MainPage from "./routes/MainPage";
import {AuthProvider} from "./components/context/auth-context";

function App() {
    return (
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/my-reservations" element={<PreviousReservations />} />
                        <Route path="*" component={() => <h2>404 Not Found </h2>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
    );
}

export default App;
