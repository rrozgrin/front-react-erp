import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/app.scss';
import { AppRoutes } from './router';
import { Bounce, ToastContainer } from 'react-toastify';
import { AppProviders } from './providers/AppProviders';

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </AppProviders>
  );
}
