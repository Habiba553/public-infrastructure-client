import Banner from "./Banner";
import Statistics from "./Statistics";
import Testimonials from "./Testimonials";
import LatestResolvedIssues from "./LatestResolvedIssues";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
const Home = () => {
  return (
     
      <div>
      <Banner />
      <LatestResolvedIssues />
      <Features />
      <HowItWorks />
<Statistics />

<Testimonials />
</div>
  
  );
};

export default Home;