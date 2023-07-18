import WishlistBookCard from '@/components/WishlistBookCard';
import { useGetAllWishlistItemsQuery, useGetAllWishlistMutation } from '@/redux/features/products/productApi';
import { setWishlistItems } from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Button } from '@material-tailwind/react'
import { useState } from 'react'

const items = ["All", "Read Soon", "Currently Reading", "Finished Reading"]

export default function WishlistBooks() {
    const [selectedData, setSelectedData] = useState("All");
    const [getAllWishlist, { }] = useGetAllWishlistMutation()
    const { user } = useAppSelector((state) => state.user)
    const { wishlistItems } = useAppSelector((state) => state.product)


    const { data } = useGetAllWishlistItemsQuery(user?._id, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 2000,
    })


    const dispatch = useAppDispatch()




    const handleSelect = async (setData: string) => {
        if (setData !== "All") {
            dispatch(setWishlistItems([]))
            setSelectedData(setData)
            const options = {
                userId: user?._id,
                query: `status=${setData}`,
            };
            const result: any = await getAllWishlist(options)
            dispatch(setWishlistItems(result?.data?.data))
        } else {
            setSelectedData(setData)
        }
    }


    return (
        <section>
            <div className='max-w-[1440ox] mx-auto px-4 md:px-8'>
                <div className="flex items-center justify-between mt-8 mb-4 bg-blue-600">
                    {items.map((item, i) => (
                        <Button
                            key={i}
                            onClick={() => handleSelect(item)}
                            className={`w-full px-1 rounded-none shadow-none hover:shadow-none h-10 text-[10px]
                                ${selectedData === item
                                    ? "bg-primary"
                                    : "bg-blue-gray-50 text-black"
                                }`}
                        >
                            {item}
                        </Button>
                    ))}
                </div>

                {
                    selectedData === "All" && <WishlistBookCard books={data?.data} refetch={handleSelect} />
                }
                {
                    selectedData === "Read Soon" && <WishlistBookCard books={wishlistItems} refetch={handleSelect} />
                }
                {
                    selectedData === "Currently Reading" && <WishlistBookCard books={wishlistItems} refetch={handleSelect} />
                }
                {
                    selectedData === "Finished Reading" && <WishlistBookCard books={wishlistItems} refetch={handleSelect} />
                }

            </div>
        </section>
    )
}
