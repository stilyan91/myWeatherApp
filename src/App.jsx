
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home';
import Footer from './components/Footer';
import ForecastDashboard from './components/ForecastDashboard';

function App() {

    return (
        <div className="site-content">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Home />} />
                <Route path="/login" element={<Home />} />
                <Route path="/:locationKey" element={<ForecastDashboard />} />

            </Routes>
            <Footer />
        </div>
    );

};

export default App
