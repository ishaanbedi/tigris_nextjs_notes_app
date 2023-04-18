import NextProgress from "next-progress";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Toaster } from "react-hot-toast";
import { Ubuntu } from "next/font/google";
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: "300",
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={ubuntu.className}>
      <NextProgress color="#14B8A6" height={6} />
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      <Toaster />
    </main>
  );
}

export default MyApp;
