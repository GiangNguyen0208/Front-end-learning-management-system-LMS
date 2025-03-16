import './App.css'
import AuthProvider from './context/AuthProvider';
import AppRoutes from './routes/index';

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App
