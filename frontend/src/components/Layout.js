import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <style>
        {`
          .app-layout {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .app-content {
            flex: 1;
          }
        `}
      </style>

      <div className="app-layout">
        <Navbar />

        <main className="app-content">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
