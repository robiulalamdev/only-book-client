import { IBook } from "@/types/bookTypes";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function ProductCard({ data }) {
  console.log(data)
  return (
    <Card className="w-full border bg-[#f8fafc] h-96">
      <CardHeader shadow={false} floated={false} className="h-fit">
        <img
          className="w-full h-32 md:h-52 object-cover"
          src={data?.image}
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-medium font-bold">
            {data?.title}
          </Typography>
          <Button className="rounded-full p-0 bg-transparent hover:shadow-none shadow-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </Button>
        </div>
        <Typography variant="small" color="gray" className="font-normal opacity-75">
          Author: {data?.author}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal opacity-75">
          Genre: {data?.genre}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal opacity-75">
          Publication Date: {moment(data?.publicationDate).format('DD-MM-YYYY')}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to={`/books/${data?._id}`}>
          <Button
            ripple={true}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
          >
            Book Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}