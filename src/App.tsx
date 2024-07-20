import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PayslipList from "./pages/PayslipList";
import PayslipDetails from "./pages/PayslipDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PayslipList />} />
        <Route path="/payslip/:id" element={<PayslipDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
