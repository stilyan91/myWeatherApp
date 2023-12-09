import { Routes, Route } from 'react-router-dom';
import { Logout } from './components/Logout';
import { AuthProvider } from './context/authContext';


import { LocationProvider } from './context/currentLocationContext';
import Header from './components/Header'
import Home from './components/Home';
import Footer from './components/Footer';
import ForecastDashboard from './components/ForecastDashboard';
import Register from './components/Register';
import Login from './components/Login';
import Favorites from './components/Favorites';
import HoursForecast from './components/ByHoursForecast';
import ErrorBoundary from './components/ErrorBoundary';
import AuthGuard from './components/AuthGuard';


function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <div className="site-content">
                    <Header />
                    <LocationProvider>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/:locationKey" element={<ForecastDashboard />} />
                            <Route element={<AuthGuard />} >
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/MyFavorites" element={<Favorites />} />
                                {/* <Route path="/MyFavorites/:location" element={<HoursForecast />} /> */}
                            </Route>
                        </Routes>
                    </LocationProvider>
                    <Footer />
                </div>
            </AuthProvider>
        </ErrorBoundary>
    );

};

export default App
