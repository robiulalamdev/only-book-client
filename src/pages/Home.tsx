import hero from '@/assets/images/hero.png';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import { Button } from '@material-tailwind/react';

import banner from "../assets/images/banner.jpg"

export default function Home() {
  return (
    <>
      <div>
        <img src={banner} alt="" />
      </div>

      <div className='min-h-screen'>

      </div>

      <Footer />
    </>
  );
}
