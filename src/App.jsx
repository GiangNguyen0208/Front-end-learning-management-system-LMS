import { useEffect } from 'react';
import './App.css'
import AuthProvider from './context/AuthProvider';
import AppRoutes from './routes/index';
import { initializeAdmin } from './api/authApi';

function App() {
  useEffect(() => {
    initializeAdmin(); // 🔥 Kiểm tra & tạo admin khi ứng dụng chạy
  }, []);
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App
