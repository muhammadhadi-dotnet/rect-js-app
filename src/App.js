import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ServiceProviderList from './components/ServiceProviderList';
import ServiceProviderForm from './components/ServiceProviderForm';
import ServiceProviderEdit from './components/ServiceProviderEdit';
import ServiceProviderMultiStepView from './components/ServiceProviderMultiStepView';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ServiceProviderList />} />
        <Route path="/create" element={<ServiceProviderForm />} />
        <Route path="/edit/:id" element={<ServiceProviderEdit/>} />
        <Route path="/view/:id" element={<ServiceProviderMultiStepView />} />
      </Routes>
    </Router>
  );
}

export default App;