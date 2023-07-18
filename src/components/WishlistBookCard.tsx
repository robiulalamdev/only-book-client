import WCard from './WCard';


export default function WishlistBookCard({ books, refetch }: any) {

    return (
        <section className='max-w-[1440px] mx-auto px-4 mt-12'>
            {
                books?.length === 0 && <div className='flex justify-center items-center w-full'>
                    <h1>No Data</h1>
                </div>
            }
            <div className='grid lg:grid-cols-2 gap-8'>
                {
                    books?.map((item: any, i: number) => <WCard key={i} item={item} refetch={refetch} />)
                }
            </div>
        </section>
    );
}
