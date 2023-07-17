import { useState, useEffect } from 'react'
import { useGetSingleBookQuery, usePatchBookMutation } from "@/redux/features/products/productApi";
import { Button, Input, Spinner, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';

type IBookForm = {
    image: string;
    title: string;
    author: string;
    genre: string;
    publisher: string;
    publicationDate: string;
    publicationYear: string;
    description: string;
}


export default function EditeBook() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IBookForm>();
    const { user } = useAppSelector((state) => state.user)
    const navigate = useNavigate()



    const [image, setImage] = useState(null)

    const { id } = useParams();
    const { data: book } = useGetSingleBookQuery(id);

    const [patchBook, { isLoading, isError, error }] = usePatchBookMutation();
    const errorResult: any = error


    useEffect(() => {
        if (user?._id !== book?.data?.publisher?._id) {
            navigate(-1)
        }
    }, [])


    const imageUpload = async (files: any[]) => {
        let images = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append("image", file);
            const response = await fetch(
                "https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            images.push(data?.data?.url);
        }
        return images;
    };

    const onSubmit = async (data: IBookForm) => {

        let imageFile: any[] = []
        if (image) {
            imageFile = await imageUpload([image])
        }

        const date = data?.publicationDate
        const yearData = date.split("-")

        const options = {
            data: {
                image: image ? imageFile[0] : book?.data?.image,
                title: data?.title,
                author: data?.author,
                genre: data?.genre,
                publisher: book?.data?.publisher?._id,
                publicationDate: data?.publicationDate,
                publicationYear: yearData[0],
                description: data?.description,
            },
            id: id
        };
        const addResult: any = await patchBook(options);

        if (addResult?.data?.success) {
            toast.success('Book Update successfully', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    if (isError && error) {
        toast.error(`${errorResult?.data?.message}`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
    return (
        <section className="max-w-[1440px] mx-auto px-4">
            <h1 className="text-center font-bold text-3xl text-gray-800 mt-4" >Add a New Book</h1>
            <form onSubmit={handleSubmit(onSubmit)}
                className="mt-6 max-w-[800px] mx-auto">
                <div className="grid gap-3">
                    <div className="grid md:grid-cols-2 gap-3 md:mb-4">
                        <Input
                            type="text"
                            label="Title"
                            defaultValue={book?.data?.title}
                            error={errors.title ? true : false}
                            {...register('title', { required: 'Title is required' })}
                        />
                        <Input
                            type="text"
                            label="author"
                            defaultValue={book?.data?.author}
                            error={errors.author ? true : false}
                            {...register('author', { required: 'Author is required' })}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 md:mb-4">
                        <Input
                            type="text"
                            label="Genre"
                            defaultValue={book?.data?.genre}
                            error={errors.genre ? true : false}
                            {...register('genre', { required: 'genre is required' })}
                        />
                        <Input
                            type="date"
                            label="publication Date"
                            defaultValue={book?.date?.publicationDate}
                            error={errors.publicationDate ? true : false}
                            {...register('publicationDate', { required: 'Publication Date is required' })}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:mb-4">
                        <Textarea
                            {...register("description", { required: false })}
                            maxLength={300}
                            error={errors.description ? true : false}
                            label="Description"
                            defaultValue={book?.data?.description}
                            {...register('description', { required: 'Description is required' })}
                        />
                        <p className="text-xs text-gray-500">Max Characters 300</p>
                    </div>





                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full lg:h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            {
                                image ? <img
                                    className="w-32 h-24 object-cover"
                                    src={URL.createObjectURL(image)}
                                    alt=""
                                />
                                    :
                                    <img
                                        className="w-32 h-24 object-cover"
                                        src={book?.data?.image}
                                        alt=""
                                    />
                            }

                            <input
                                onChange={(e: any) => setImage(e.target.files[0])}
                                type="file"
                                id="dropzone-file"
                                accept="image/*"
                                multiple={false}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <Button disabled={isLoading} type='submit' className='mt-4'>
                        {
                            isLoading ? <div className='flex justify-center items-center gap-2'>
                                <Spinner />
                                <span>Update Book</span>
                            </div> : "Update Book"
                        }
                    </Button>
                </div>
            </form>
        </section>
    )
}

