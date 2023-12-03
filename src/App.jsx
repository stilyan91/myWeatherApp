import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home';
import Footer from './components/Footer';
import ForecastDashboard from './components/ForecastDashboard';
import { LocationProvider } from './context/currentLocationContext';
import Register from './components/Register';


function App() {
    return (
        <div className="site-content">
            <Header />
            <LocationProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Home />} />
                    <Route path="/:locationKey" element={<ForecastDashboard />} />
                </Routes>
            </LocationProvider>
            <Footer />
        </div>
    );

};

export default App
