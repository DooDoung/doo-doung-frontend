import { StarIcon } from "@heroicons/react/20/solid";

interface StarRatingProps {
  score: number;
  className?: string;
}

const StarRating = ({ score, className = "" }: StarRatingProps) => {
  return (
    <div className="flex items-center space-x-0.5">
      {Array.from({ length: score }).map((_, index) => (
        <StarIcon key={index} className={`${className} text-[#A0522D]`} />
      ))}
    </div>
  );
};

export default StarRating;
