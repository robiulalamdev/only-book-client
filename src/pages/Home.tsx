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
  console.log(data, isLoading, error)
  return (
    <>
      <div>
        <img src={banner} alt="" />
      </div>
      <div className='py-12'>

        <h1 className='text-center font-bold text-4xl text-gray-800 mb-4'>Recently 10 Books</h1>

        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
          {
            data?.data?.map((book: IBook, i: number) => <ProductCard key={i} data={book} />)
          }
        </div>

        <div className='flex justify-center items-center mt-8'>
          <Link to={`/all-books`}>
            <Button
              ripple={true}
              className="rounded-md bg-blue-600 text-gray-200 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
            >
              All Books
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
