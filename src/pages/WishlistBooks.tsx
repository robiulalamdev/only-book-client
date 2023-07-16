import WishlistBookCard from '@/components/WishlistBookCard';
import { useGetAllWishlistMutation } from '@/redux/features/products/productApi';
import { setWishlistItems } from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'

const items = ["Wishlist", "Currently Reading", "Read Soon", "Finished Reading"]

export default function WishlistBooks() {
    const [selectedData, setSelectedData] = useState("Wishlist");
    const [getAllWishlist, { }] = useGetAllWishlistMutation()
    const { wishlistItems } = useAppSelector((state) => state.product)

    const dispatch = useAppDispatch()

    const handleSearch = async () => {
        const options = {
            userId: "64b3574549982c2b5e5510ea",
            query: `status=${selectedData === "Wishlist" ? "none" : selectedData}`,
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
                <div className="grid grid-cols-4 mt-8 mb-4">
                    {items.map((item, i) => (
                        <Button
                            key={i}
                            onClick={() => setSelectedData(item)}
                            className={`w-fit px-1 rounded-none shadow-none hover:shadow-none h-10
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
                    selectedData === "Wishlist" && <WishlistBookCard books={wishlistItems} />
                }

            </div>
        </section>
    )
}
