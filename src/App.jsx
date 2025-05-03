import { useEffect } from 'react';
import './App.css'
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';

import AppRoutes from './routes/index';

import { initializeAdmin } from './api/authApi';
import { ToastContainer } from 'react-toastify';


function App() {
  useEffect(() => {
    initializeAdmin(); // 🔥 Kiểm tra & tạo admin khi ứng dụng chạy
  }, []);
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
          <ToastContainer />
        </AppProvider>
      </AuthProvider>
    </>
  )
}

export default App
