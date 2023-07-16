import WishlistBookCard from '@/components/WishlistBookCard';
import { useGetAllWishlistItemsQuery, useGetAllWishlistMutation } from '@/redux/features/products/productApi';
import { setWishlistItems } from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'

const items = ["Read Soon", "Currently Reading", "Finished Reading"]

export default function WishlistBooks() {
    const [selectedData, setSelectedData] = useState("Read Soon");
    const [getAllWishlist, { }] = useGetAllWishlistMutation()
    const { wishlistItems } = useAppSelector((state) => state.product)

    const { data } = useGetAllWishlistItemsQuery("64b3574549982c2b5e5510ea", {
        refetchOnMountOrArgChange: true,
        pollingInterval: 2000,
    })

    const dispatch = useAppDispatch()

    const handleSearch = async () => {
        const options = {
            userId: "64b3574549982c2b5e5510ea",
            query: `status=${selectedData}`,
        };
        const result: any = await getAllWishlist(options)
        dispatch(setWishlistItems(result?.data?.data))
    }

    useEffect(() => {
        handleSearch()
    }, [])


    return (
        <section>
            <div>
                <div className="flex items-center justify-between mt-8 mb-4 bg-blue-600">
                    {items.map((item, i) => (
                        <Button
                            key={i}
                            onClick={() => setSelectedData(item)}
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
                    selectedData === "Read Soon" && <WishlistBookCard books={data?.data} />
                }

            </div>
        </section>
    )
}
