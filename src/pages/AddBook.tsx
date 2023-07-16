import { useState } from 'react'
import { usePostCreateBookMutation } from "@/redux/features/products/productApi";
import { Button, Input, Spinner, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

type LoginFormInputs = {
    image: string;
    title: string;
    author: string;
    genre: string;
    publisher: string;
    publicationDate: Date;
    description: string;
}


export default function AddBook() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const [image, setImage] = useState(null)

    const [postCreateBook, { isLoading, isError, error, data: result }] = usePostCreateBookMutation();
    const errorResult: any = error


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

    const onSubmit = async (data: LoginFormInputs) => {

        if (image === null) {
            toast.error(`Please Upload Book Image`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        const imageFile = await imageUpload([image])

        const options = {
            data: {
                image: imageFile[0],
                title: data?.title,
                author: data?.author,
                genre: data?.genre,
                publisher: "654+54d4fd546",
                publicationDate: data?.publicationDate,
                description: data?.description,
            },
        };

        console.log(options)
        const result: any = await postCreateBook(options);
        console.log(result)
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
                            error={errors.title ? true : false}
                            {...register('title', { required: 'Title is required' })}
                        />
                        <Input
                            type="text"
                            label="author"
                            error={errors.author ? true : false}
                            {...register('author', { required: 'Author is required' })}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 md:mb-4">
                        <Input
                            type="text"
                            label="Genre"
                            error={errors.genre ? true : false}
                            {...register('genre', { required: 'genre is required' })}
                        />
                        <Input
                            type="date"
                            label="publication Date"
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
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            aria-hidden="true"
                                            className="w-10 h-10 mb-3 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            ></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and
                                            drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX. 3 Images)
                                        </p>
                                    </div>
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
                                <span>Add Book</span>
                            </div> : "Add Book"
                        }
                    </Button>
                </div>
            </form>
        </section>
    )
}

