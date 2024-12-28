import ShoppingListDetailPage from './pages/shoppingListDetailPage';
import Dashboard from './pages/dashboard';
import Layout from './pages/layout';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ShoppingListDetail/:id" element={<ShoppingListDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
