import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import backgroundImage from "../../../public/background.jpg";
import "./styles.css";
import FlightSearchResults from "./SearchResults";
import Header from "./Header";
import SearchButton from "./SearchButton";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Container  from "./Container";

function FlightPage() {
  return (
    <div
        className="app-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
    <div className="app-container">
            <main className="app-background flex flex-col w-[90vw] mx-auto">
                <Header />
                <Container/>
                <SearchButton/>
            </main>
            <div className="py-8 sm:py-10 md:py-12 lg:py-16" />
            <FAQ />
            <Footer />
        </div>
        </div>
  );
}

export default FlightPage;