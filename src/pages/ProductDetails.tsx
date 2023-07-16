import ProductReview from '@/components/ProductReview';
import { useDeleteBookMutation, useGetSingleBookQuery } from '@/redux/features/products/productApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setOpenDeleteMOdal } from '@/redux/features/products/productSlice';

export default function ProductDetails() {
  const { openDeleteMOdal } = useAppSelector((state) => state.product)
  const { id } = useParams();
  const dispatch = useAppDispatch()
  const { data: product } = useGetSingleBookQuery(id);

  const navigate = useNavigate()


  const [deleteBook, { }] = useDeleteBookMutation()

  const confirm = async () => {
    const options = {
      id: id,
    };
    const result: any = await deleteBook(options)
    if (result?.data?.success) {
      toast.success('Book Delete successfully', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/")
    }
    dispatch(setOpenDeleteMOdal(false))
  };

  return (
    <section className='max-w-[1040px] mx-auto px-4 mt-12'>
      <Card className="flex-col md:flex-row w-full h-fit md:h-96 px-4 mx-auto">
        <CardHeader shadow={false} floated={false} className="md:w-2/5 h-52 md:h-full shrink-0 m-0 rounded-r-none">
          <img
            src={product?.data?.image}
            alt="image"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody className='w-full'>
          <div className="flex items-center justify-between mb-2">
            <Typography color="blue-gray" className="font-medium font-bold text-3xl">
              {product?.data?.title}
            </Typography>
            <Button className="rounded-full p-0 bg-transparent hover:shadow-none shadow-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </Button>
          </div>


          <Typography color="gray" className="font-normal mb-2 hidden md:block">
            {product?.data?.description?.slice(0, 350) + "..."}
          </Typography>
          <Typography color="gray" className="font-normal mb-2 md:hidden">
            {product?.data?.description?.slice(0, 100) + "..."}
          </Typography>

          <Typography variant="small" color="gray" className="font-normal opacity-75">
            Author: {product?.data?.author}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal opacity-75">
            Genre: {product?.data?.genre}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal opacity-75">
            Publication Date: {moment(product?.data?.publicationDate).format('DD-MM-YYYY')}
          </Typography>

          <div className='mt-4 flex items-center flex-wrap gap-4'>


            <Button onClick={() => dispatch(setOpenDeleteMOdal(true))} variant="text" className="flex items-center gap-2 bg-red-50 h-8 px-2 text-red-600">
              Delete Book
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>

            </Button>

            <Link to={`/books/${id}/edit`} className="inline-block">
              <Button variant="text" className="flex items-center gap-2 bg-blue-50 h-8 px-2">
                Edit Book
                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </CardBody>
      </Card>
      <ProductReview id={id!} />





      <Dialog open={openDeleteMOdal} handler={() => dispatch(setOpenDeleteMOdal(false))}>
        <DialogBody>
          <div className={``}>
            <div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-red-600 w-8" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-full h-full">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                </div>
                <h1 className="text-center font-bold text-xl">Are You Sure?</h1>
              </div>
              <p className="text-sm font-sans text-gray-600 text-center mt-4">
                Do You Really Want to Delete these Records? This proccess cannot
                be undone.
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => dispatch(setOpenDeleteMOdal(false))}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => confirm()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </DialogFooter>
      </Dialog>
    </section>
  );
}
