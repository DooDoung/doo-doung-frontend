import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const contributors = [
    "Akkharaphon Chowatthakawanit", "Pitchaya Arkatvipat",
    "Chonlanan Srisanan", "Raksakul Hiranas",
    "Napat Srisamut", "Sivikom Nokham",
    "Naphat Serirak", "Thananan Palanand",
    "Nattarin Chetpattananondh", "Wanatha Chaturarat",
  ];

  return (
    <footer className={cn("text-white font-chakra", className)}>
      {/* ===== Upper Section ===== */}
      <div className="bg-neutral-white py-12 px-2 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row container mx-12 max-w-screen-xl">
          
          {/* Col 1: Logo & Tagline */}
          <div className="flex flex-col gap-6 text-center md:text-left mt-8">
            <h1 className="font-sanctuary text-6xl text-primary leading-[16px] [text-shadow:20px_10px_5px_rgba(0,0,0,0.25)] select-none">
              DooDoung
            </h1>
            <p className="mt-2 text-sm text-neutral-black">
              Online fortune-telling platform
            </p>
          </div>

          {/* Col 2: Contact Us */}
          <div className="text-sm text-neutral-black">
            <h2 className="mb-4 text-lg font-bold">Contact us</h2>
            <p className="font-bold text-accent-pink">Chulalongkorn University</p>
            <p>Phayathai Road, Pathumwan,</p>
            <p>Bangkok 10330, Thailand</p>
            <br />
            <p>Tel : +66 2218 2000</p>
            <p>Email : contact@doodoung.com</p>
          </div>

          {/* Col 3: Contributors */}
          <div className="text-sm text-neutral-black">
            <h2 className="mb-4 text-lg font-bold">Contributors</h2>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm text-neutral-black sm:grid-cols-2">
              {contributors.map((name) => (
                <li key={name} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ===== Bottom Section ===== */}
      <div className="bg-linear-to-r from-accent-pink to-accent-violet py-4">
        <div className="container mx-12 max-w-screen-xl px-4 sm:px-8">
          <p className="text-sm text-white">
            DooDoung @{currentYear} all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;