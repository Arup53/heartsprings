import SuccessStoriesSection from "../SuccessStories/SuccessStoriesSection";
import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import PremiumMembers from "./PremiumMembers/PremiumMembers";
import SuccessCounter from "./SuccessCounter/SuccessCounter";

function Home() {
  return (
    <div className="">
      {/* banner */}
      <Banner />

      {/* Premium Members */}
      <PremiumMembers />
      {/* How it works */}
      <HowItWorks />
      {/* success Counter */}
      <SuccessCounter />
      {/* success story */}
      <SuccessStoriesSection />
    </div>
  );
}

export default Home;
