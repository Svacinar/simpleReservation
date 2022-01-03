import Header from "./components/UI/Header";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReservationManager from "./routes/ReservationManager";
import MainPage from "./routes/MainPage";
import {AuthProvider} from "./components/context/auth-context";

function App() {
    return (
        <div style={
            {
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://upload.wikimedia.org/wikipedia/commons/c/cd/Hradec_Králové%2C_Moravské_Předměst%C3%AD_a_centrum_z_Husovy_ulice%2C_detail.jpg')`,
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
            }
        }>
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/my-reservations" element={<ReservationManager />} />
                        <Route path="*" component={() => <h2>404 Not Found </h2>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>

    );
}

export default App;
