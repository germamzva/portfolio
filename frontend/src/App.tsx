import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// import Navs from "./components/Navs";
import VideoBg from "./components/VideoBg";
import Layout from "./routes/Layout";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <ScrollToTop />
      <div className="mx-auto max-w-7xl min-h-screen">
        <VideoBg />
        {/* <Navs /> */}
        <Navbar />
        <div className="pt-24">
          <Layout />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
