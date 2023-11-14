import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home';
import Footer from './components/Footer';
function App() {


    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<Home />} />
                <Route path="/live-cameras" element={<Home />} />
                <Route path="/photos" element={<Home />} />
                <Route path="/contact" element={<Home />} />

            </Routes>
            <Footer />
        </>
    )
}

export default App
