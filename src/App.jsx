import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home';
import Footer from './components/Footer';
function App() {


    return (
        <div className="site-content">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Home />} />
                <Route path="/login" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
