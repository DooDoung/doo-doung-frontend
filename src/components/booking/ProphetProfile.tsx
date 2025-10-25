import Image from "next/image";

interface ProphetProfileProps {
  imageSrc: string;
  name: string;
}

export default function ProphetProfile({ imageSrc, name }: ProphetProfileProps) {
  return (
    <div className="flex flex-col justify-center items-center mt-4 lg:mt-0 lg:mr-8 self-center lg:self-start">
      <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 bg-white rounded-full flex items-center justify-center overflow-hidden relative">
        <Image
          src={imageSrc}
          alt="Prophet profile"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 160px"
        />
      </div>
      <p className="text-neutral-black font-chakra mt-2 sm:mt-4 text-center text-sm md:text-base">{name}</p>
    </div>
  );
}
