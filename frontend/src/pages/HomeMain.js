import React from 'react';
import TopBar from '../components/home/TopBar';
import HeroBanner from '../components/home/HeroBanner';
import TopCategories from '../components/home/TopCategories';
import PromoBanners from '../components/home/PromoBanners';
import BestSellers from '../components/home/BestSellers';
import PopularBrands from '../components/home/PopularBrands';
import FeaturedProducts from '../components/home/FeaturedProducts';
import SpecialOffer from '../components/home/SpecialOffer';
import ROGStrixBanner from '../components/home/ROGStrixBanner';
import PopularProducts from '../components/home/PopularProducts';
import ServiceFeatures from '../components/home/ServiceFeatures';
import CustomerReview from '../components/home/CustomerReview';
import LatestNews from '../components/home/LatestNews';
import JoinCommunity from '../components/home/JoinCommunity';
import HeroSlide from '../components/home/HeroSlide';

function HomeMain() {
  return (
    <div className="x_main-home">
      {/* <TopBar /> */}
      {/* <HeroBanner /> */}
      <HeroSlide></HeroSlide>
      <PromoBanners />
      <TopCategories />
      <BestSellers />
      <PopularBrands />
      <FeaturedProducts />
      <SpecialOffer />
      <PopularProducts />
      <ROGStrixBanner />
      <ServiceFeatures />
      <CustomerReview />
      {/* <LatestNews /> */}
      {/* <JoinCommunity /> */}
    </div>
  );
}

export default HomeMain;

