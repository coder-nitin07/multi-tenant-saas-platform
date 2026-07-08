import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import OrganizationProvider from './context/OrganizationContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthProvider>
          <OrganizationProvider>
              <App />
              <Toaster position='top-right' />
          </OrganizationProvider>
      </AuthProvider>
  </BrowserRouter>
);