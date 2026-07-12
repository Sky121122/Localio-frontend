import Navbar from "./Navbar";
import Footer from "./Footer";
import "./MainLayout.css";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;