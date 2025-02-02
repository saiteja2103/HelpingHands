import React from 'react'
import Header from '../../components/Header'
import HeroSection from '../../components/Hero'
import FeaturedCauses from '../../components/Causes'
import Footer from '../../components/Footer'
import CarouselComponent from '../../components/CarouselComponent'
import Ngos from '../../components/Ngos'

const index = () => {
  return (
    <div>
      <Header></Header>
      <HeroSection></HeroSection>
      <CarouselComponent></CarouselComponent>
      <FeaturedCauses></FeaturedCauses>
      <Ngos></Ngos>
      <Footer></Footer>
    </div>
  )
}

export default index
