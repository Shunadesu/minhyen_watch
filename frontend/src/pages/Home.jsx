import Hero from '../components/Hero';
import Collections from '../components/Collections';
import FeaturedSlider from '../components/FeaturedSlider';
import Services from '../components/Services';
import BlogPreview from '../components/BlogPreview';
import HighlightProducts from '../components/HighlightProducts';
import Partners from '../components/Partners';

const Home = () => {
  return (
    <>
      <Hero />
      <HighlightProducts />
      <Collections />
      <FeaturedSlider />
      <BlogPreview />
      <Services />
      <Partners />
    </>
  );
};

export default Home;


