import ProductCard from '@/components/ProductCard';
import { useGetBooksQuery } from '@/redux/features/products/productApi';
import { setGenre, setPublicationYear } from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/bookTypes';
import { Button, Menu, MenuHandler, MenuItem, MenuList, Tooltip } from '@material-tailwind/react';
import { useState } from 'react';


const genres = ["dfdf", "dfdf"]
const yeares = ["dfdf", "dfdf"]

export default function Books() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  const { genre, publicationYear } = useAppSelector((state) => state.product)
  const dispatch = useAppDispatch()



  console.log(isLoading, error)

  return (
    <section className='max-w-[1440px] mx-auto px-4 '>
      <div className='flex flex-col md:flex-row md:items-center justify-end gap-2 md:gap-8 mt-12 md:p-4'>
        <div className="flex items-center w-full">
          <input
            className="flex-grow md:flex-grow-0 h-10 w-full focus:outline-none border border-blue-600 focus:border-primary px-2"
            type="search"
            name="search"
            placeholder="What do you need?"
          />
          <Tooltip content="Search">
            <button
              className="w-36 h-10 text-white bg-blue-600 hover:bg-blue-700 duration-150 flex justify-center items-center"
              type="submit"
            >
              <span>Search</span>
            </button>
          </Tooltip>
        </div>

        <div className='md:w-[400px] grid grid-cols-2 gap-4'>
          <Tooltip content="Genre" >
            <Menu>
              <MenuHandler>
                <Button className='rounded-sm'>{genre ? genre : "Genre"}</Button>
              </MenuHandler>
              <MenuList>
                {
                  genres?.map((genre: string, i: number) => <MenuItem onClick={() => dispatch(setGenre(genre))} key={i} >{genre}</MenuItem>)
                }
              </MenuList>
            </Menu>
          </Tooltip>
          <Tooltip content="Publication Year">
            <Menu>
              <MenuHandler>
                <Button className='rounded-sm'>{publicationYear ? publicationYear : "Year"}</Button>
              </MenuHandler>
              <MenuList>
                {
                  yeares?.map((year: string, i: number) => <MenuItem onClick={() => dispatch(setPublicationYear(year))} key={i} >{year}</MenuItem>)
                }
              </MenuList>
            </Menu>
          </Tooltip>
        </div>

      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
        {
          data?.data?.map((book: IBook, i: number) => <ProductCard key={i} data={book} />)
        }
      </div>
    </section>
  );
}
