import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
 
const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="flex-1 pb-16 pt-32 md:pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
 
export default Layout;