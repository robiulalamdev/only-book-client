import ProductCard from '@/components/ProductCard';
import { useGetAllGenreQuery, useGetBooksMutation, usePostAllYearsByGenreMutation } from '@/redux/features/products/productApi';
import { setAllPublicationYears, setBooks, setGenre, setPublicationYear, setSearch } from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/bookTypes';
import { Button, Menu, MenuHandler, MenuItem, MenuList, Tooltip } from '@material-tailwind/react';
import { useEffect } from 'react';


export default function Books() {
  const { books, search, genre, publicationYear, allPublicationYears } = useAppSelector((state) => state.product)
  const { data: genries } = useGetAllGenreQuery(undefined)
  const dispatch = useAppDispatch()

  const [postAllYearsByGenre, { }] = usePostAllYearsByGenreMutation()
  const [getBooks, { }] = useGetBooksMutation()

  let queryData = ``


  const handleSearch = async () => {
    if (search) {
      queryData = queryData + `searchTerm=${search}`
    } if (genre) {
      queryData = queryData + `&genre=${genre}`
    } else if (publicationYear) {
      queryData = queryData + `&publicationYear=${publicationYear}`
    }
    const options = {
      query: queryData,
    };
    const result: any = await getBooks(options)
    dispatch(setBooks(result?.data?.data))
    dispatch(setSearch(""))
    queryData = ``
  }

  useEffect(() => {
    handleSearch()
  }, [])


  const handleGetYears = async (genreName: string) => {
    dispatch(setGenre(genreName))
    handleSearch()
    const options = {
      genre: genreName,
    };

    const addResult: any = await postAllYearsByGenre(options);
    dispatch(setAllPublicationYears(addResult.data.data))
  }

  const handleSetYear = async (pYear: string) => {
    console.log(pYear)
    dispatch(setPublicationYear(pYear))
    handleSearch()
  }

  return (
    <section className='max-w-[1440px] mx-auto px-4 '>
      <div className='flex flex-col md:flex-row md:items-center justify-end gap-2 md:gap-8 mt-12 md:p-4'>
        <div className="flex items-center w-full">
          <input
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="flex-grow md:flex-grow-0 h-10 w-full focus:outline-none border border-blue-600 focus:border-primary px-2"
            type="search"
            name="search"
            placeholder="What do you need?"
          />
          <Tooltip content="Search">
            <button
              onClick={() => handleSearch()}
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
                  genries?.data?.map((genre: any, i: number) => <MenuItem onClick={() => handleGetYears(genre?.genre)} key={i} >{genre?.genre}</MenuItem>)
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
                  allPublicationYears?.map((year: any, i: number) => <MenuItem
                    onClick={() => handleSetYear(year?.publicationYear)}
                    key={i} >
                    {year?.publicationYear}</MenuItem>)
                }
              </MenuList>
            </Menu>
          </Tooltip>
        </div>

      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
        {
          books?.map((book: IBook, i: number) => <ProductCard key={i} data={book} />)
        }
      </div>
    </section>
  );
}
