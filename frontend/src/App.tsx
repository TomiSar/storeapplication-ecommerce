import { Outlet, useNavigation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/footer/Footer';

export default function App() {
  const navigation = useNavigation();

  return (
    <div>
      <Header />
      {navigation.state === 'loading' ? (
        <div className="flex items-center justify-center min-h-[852px]">
          <span className="text-4xl font-semibold text-primary dark:text-light">Loading...</span>
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
}
