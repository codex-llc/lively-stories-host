import Image from "next/image";
import HeroSection from "./components/hero";
import GlassmorphismNavbar from "./components/navbar";
import LivelyFooter from "./components/footer";
import TrendingWorkSection from "./components/works";

import LivelyInfiniteScroll from "./components/infinite_scroll";

export default function Home() {
  return (
    <>
    <GlassmorphismNavbar/>
    <HeroSection/>
    <LivelyInfiniteScroll/>
    <TrendingWorkSection/>
    <LivelyFooter/>
    </>
  );
}
