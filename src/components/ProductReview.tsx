import { ChangeEvent, FormEvent, useState } from 'react';
import {
  useGetReviewsQuery,
  usePostReviewMutation,
} from '@/redux/features/products/productApi';
import { Button, Chip, Textarea } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import moment from 'moment';

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const { data } = useGetReviewsQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const [postReview, { }] = usePostReviewMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options = {
      data: { comment: inputValue, book: id },
    };

    const result: any = await postReview(options);
    setInputValue('');

    if (result?.data?.success) {
      toast.success('Book Review Send successfully', {
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

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center h-14 justify-between" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-sm h-full w-fit px-2"
        >
          Send
        </Button>
      </form>
      <h1 className='text-left font-bold text-2xl text-gray-800 pt-4'>Book Reviews</h1>
      <div className="mt-4 max-h-[800px] overflow-y-scroll mb-6">

        {data?.data?.map((comment: any, index: number) => (
          <div key={index} className="grid grid-cols-1 gap-1 items-center mb-5 bg-[#e2e8f0]">
            <p className='p-2'>{comment?.comment}</p>

            <Chip size='sm' variant="ghost" className='text-xs' value={moment(comment?.createdAt).fromNow()} />
          </div>
        ))}
      </div>
    </div>
  );
}
