import ProductCard from '@/components/ProductCard';
import { useGetBooksQuery } from '@/redux/features/products/productApi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/bookTypes';

export default function Books() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  console.log(data)
  const dispatch = useAppDispatch();

  return (
    <div className='max-w-[1480px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
      {
        data?.data?.map((book: IBook, i: number) => <ProductCard key={i} data={book} />)
      }
    </div>
  );
}
