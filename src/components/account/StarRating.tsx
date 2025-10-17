import { StarIcon } from "@heroicons/react/20/solid";

interface StarRatingProps {
  score: number;
  className?: string;
  color?: string;
}

const StarRating = ({ score, className = "", color = "#A0522D" }: StarRatingProps) => {
  return (
    <div className="flex items-center space-x-0.5">
      {Array.from({ length: score }).map((_, index) => (
        <StarIcon key={index} className={className} style={{ color }} />
      ))}
    </div>
  );
};

export default StarRating;
