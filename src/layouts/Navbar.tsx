import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo/logo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Ref, useEffect, useRef, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useGetAllWishlistItemsQuery } from '@/redux/features/products/productApi';
import { setLoading, setUser } from '@/redux/features/user/userSlice';

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAppSelector((state) => state.user);
  const { data: wishlistItems } = useGetAllWishlistItemsQuery(user?._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 2000,
  })

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.removeItem("only-book-token");
    dispatch(setUser({
      name: "",
      email: "",
      password: "",
      _id: "",
      createdAt: "",
      updatedAt: "",
      __v: ""
    }))
    if (pathname.includes("/wishlist")) {
      navigate("/")
    }
    dispatch(setLoading(false))
  }



  let navberRef: any = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    let handler = (e: { target: any; }) => {
      if (!navberRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10 bg-[#f1f5f9]">
      <nav ref={navberRef} className='uppercase'>
        <div className='relative cursor-pointer flex justify-between items-center gap-6 lg:gap-10 h-14 px-4 md:px-8 max-w-[1440px] mx-auto'>
          <div className='flex-grow'>
            <Link to='/'><img className='w-10 rounded-full' src={logo} alt="navberImage" /></Link>
          </div>
          <div className='hidden lg:block'>
            <Link to='/home' className='text-black hover:text-primary duration-100 font-semibold text-[13px]'>Home</Link>
          </div>
          <div className='hidden lg:block'>
            <Link to='/all-books' className='text-black hover:text-primary duration-100 font-semibold text-[13px]'>All Books</Link>
          </div>
          <div className='hidden lg:block'>
            <Link to='/add-book' className='text-black hover:text-primary duration-100 font-semibold text-[13px]'>Add Book</Link>
          </div>

          <div className='flex justify-between items-center gap-6'>
            <div className='flex items-center' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <div className='relative'>

                <Link to='/wishlist' className='text-black hover:text-primary duration-100 font-semibold text-[13px]'>Wishlist</Link>

                <div className='absolute -right-2 -top-3 h-4 w-4 bg-rose-600 rounded-full flex justify-center items-center bg-red-100'>
                  <span className='text-red-600 p-1'>
                    {wishlistItems?.data ? wishlistItems?.data?.length : 0}
                  </span>
                </div>
              </div>
            </div>


          </div>
          {
            user?._id ? <div className='flex items-center gap-2'>
              <Button onClick={() => handleLogout()} size='sm' className='text-xs rounded-md'>
                Logout
              </Button>
            </div>
              :
              <div className='hidden lg:block lg:flex justify-between items-center gap-6'>
                <Link to='/signin' className='w-24 h-8 bg-blue-600 hover:bg-blue-700 duration-300 flex justify-center items-center rounded'>
                  <h1 className='text-white font-semibold text-sm'>SIGN IN</h1>
                </Link>
                <Link to='/signup' className='w-24 h-8 border border-blue-600 hover:bg-gray-300 duration-300 flex justify-center items-center rounded'>
                  <h1 className='text-blue-600 font-semibold text-sm'>SIGNUP</h1>
                </Link>
              </div>
          }
          {/* -----------toggler button----------- */}
          <div onClick={() => setOpen(!open)} className="w-10 lg:hidden text-blue-600">
            {
              open ? <span>
                <svg className='w-8 ' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd"></path></svg>
              </span>
                :
                <span>
                  <svg className='w-6 ml-2 ' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"></path></svg>
                </span>
            }
          </div>
          {/* -----------toggler button end----------- */}

        </div>
        <div className={`bg-[#f1f5f9] absolute z-50 duration-300 border-r mt-[17px] lg:hidden flex flex-col items-start w-72 min-h-screen bg-white px-4 py-4
            ${open ? 'left-0' : '-left-[300px]'}`}>
          <div className='lg:hidden w-full flex items-center px-2 text-left hover:bg-[#0029FF]'>
            <Link to='/home' className='text-black font-semibold hover:text-white w-full py-2'>Home</Link>
          </div>
          <div className='lg:hidden w-full flex items-center px-2 text-left hover:bg-[#0029FF]'>
            <Link to='/all-books' className='text-black font-semibold hover:text-white w-full py-2'>All Books</Link>
          </div>
          <div className='lg:hidden w-full flex items-center px-2 text-left hover:bg-[#0029FF]'>
            <Link to='/add-book' className='text-black font-semibold hover:text-white w-full py-2'>Add Book</Link>
          </div>

          {
            !user?._id && <div className='lg:hidden flex items-center gap-6 mt-4'>
              <Link to='/signin' className='w-24 h-8 bg-blue-600 hover:bg-blue-700 duration-300 flex justify-center items-center rounded'>
                <h1 className='text-white font-semibold'>SIGN IN</h1>
              </Link>
              <Link to='/signup' className='w-24 h-8 border border-[#0029FF] hover:bg-blue-700 duration-300 flex justify-center items-center rounded'>
                <h1 className='text-primary font-semibold'>SIGN UP</h1>
              </Link>
            </div>
          }
        </div>
      </nav>
    </nav>
  );
}


Navbar.prototype.setRef = (ref: Ref<HTMLDivElement>) => {
  ref = ref;
};