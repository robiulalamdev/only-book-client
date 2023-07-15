import hero from '@/assets/images/hero.png';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import { Button } from '@material-tailwind/react';

import banner from "../assets/images/banner.jpg"
import { useGetRecentlyBooksQuery } from '@/redux/features/products/productApi';
import ProductCard from '@/components/ProductCard';
import { IBook } from '@/types/bookTypes';



export default function Home() {
  const { data, isLoading, error } = useGetRecentlyBooksQuery(undefined);
  console.log(data)
  return (
    <>
      <div>
        <img src={banner} alt="" />
      </div>

      <div className='min-h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {
          data?.data?.map((book: IBook, i: number) => <ProductCard key={i} data={book} />)
        }
      </div>

      <Footer />
    </>
  );
}
