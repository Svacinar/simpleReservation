import Header from "./components/Header";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import PreviousReservations from "./routes/PreviousReservations";
import MainPage from "./routes/MainPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/my-reservations" element={<PreviousReservations />} />
                    <Route path="*" component={() => <h2>404 Not Found </h2>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
