import { useDeleteWishlistMutation, useGetSignleWishlistQuery, usePatchWishlistMutation } from '@/redux/features/products/productApi'
import { setOpenDeleteMOdal } from '@/redux/features/products/productSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, Typography } from '@material-tailwind/react'
import moment from 'moment'
import { toast } from 'react-toastify';

const items = ["Read Soon", "Currently Reading", "Finished Reading"]

export default function WCard({ item, refetch }: any) {
    const { openDeleteMOdal } = useAppSelector((state) => state.product)
    const { user } = useAppSelector((state) => state.user)
    const [deleteWishlist, { }] = useDeleteWishlistMutation()
    const { data: wishlist } = useGetSignleWishlistQuery({ id: item?.book?._id, userId: user?._id }, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 2000,
    })
    const [patchWishlist, { }] = usePatchWishlistMutation()
    const dispatch = useAppDispatch()

    const handleUpdate = async (status: string) => {
        const optins = {
            id: item?._id,
            data: { status: status }
        }

        const result: any = await patchWishlist(optins)
        if (result?.data?.success) {
            refetch && refetch(item?.book?.status)
            toast.success("Wishlist Updated Successful", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        };
    }

    const handleWishlist = async () => {
        if (wishlist?.data?._id === item?._id) {
            const options = {
                id: item?._id
            }
            const deleteResult: any = await deleteWishlist(options)
            if (deleteResult?.data?.success) {
                refetch && refetch(item?.book?.status)
                toast.success("Book Removed from Wishlit", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            };
        }
    }
    return (
        <>
            <Card className="flex-col md:flex-row w-full h-fit md:h-96 px-4 mx-auto">
                <CardHeader shadow={false} floated={false} className="md:w-2/5 h-52 md:h-full shrink-0 m-0 rounded-md md:rounded-r-none">
                    <img
                        src={item?.book?.image}
                        alt="image"
                        className="w-full h-full object-cover"
                    />
                </CardHeader>
                <CardBody className='w-full'>
                    <div className="flex items-center justify-between mb-2">
                        <Typography color="blue-gray" className="font-medium font-bold text-2xl">
                            {item?.book?.title.slice(0, 50)}
                        </Typography>
                    </div>


                    <Typography color="gray" className="font-normal mb-2">
                        {item?.book?.description?.slice(0, 100) + "..."}
                    </Typography>

                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        Author: {item?.book?.author}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        Genre: {item?.book?.genre}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        Publication Date: {moment(item?.book?.publicationDate).format('DD-MM-YYYY')}
                    </Typography>

                    <div className='mt-4 flex items-center flex-wrap gap-4'>
                        {
                            items?.map((status: string) => (
                                <Button onClick={() => handleUpdate(status)} size='sm'
                                    className={`text-[10px] font-mediom flex items-center gap-2 bg-red-50 h-8 px-2
                                            ${item?.status === status ? "bg-blue-400 text-white" : "bg-blue-50 text-gray-800"}`}>
                                    {status}
                                </Button>
                            ))
                        }

                        <Button onClick={() => dispatch(setOpenDeleteMOdal(true))} variant="text" className="flex items-center gap-2 bg-red-50 h-8 px-2 text-red-600">
                            Remove
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </Button>
                    </div>

                </CardBody>
            </Card>

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
                            onClick={() => handleWishlist()}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </DialogFooter>
            </Dialog>
        </>
    )
}
