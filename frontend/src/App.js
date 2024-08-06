import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// import CarList from './pages/CarList';
import AddCar from './pages/AddCar';
import UpdateCar from './pages/UpdateCar';
import DeleteCar from './pages/DeleteCar';
import Dashboard from './pages/Dashboard';
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Sidebar />
      </div>
      <div className="content">
        <Routes> 
        <Route path="/" element={<Dashboard />} />
          {/* <Route path="/car" element={<CarList />} />  */}
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/update-car" element={<UpdateCar />} />
          <Route path="/delete-car" element={<DeleteCar />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
