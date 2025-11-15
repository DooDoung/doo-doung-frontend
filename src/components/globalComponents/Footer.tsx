import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const contributors = [
    "Akkharaphon Chowatthakawanit",
    "Pitchaya Arkatvipat",
    "Chonlanan Srisanan",
    "Raksakul Hiranas",
    "Napat Srisamut",
    "Sivikom Nokham",
    "Naphat Serirak",
    "Thananan Palanand",
    "Nattarin Chetpattananondh",
    "Wanatha Chaturarat",
  ];

  return (
    <footer className={cn("font-chakra w-full text-white", className)}>
      {/* ===== Upper Section ===== */}
      <div className="bg-neutral-white px-2 py-12 sm:px-8">
        <div className="container mx-12 flex max-w-screen-xl flex-col justify-between gap-8 md:flex-row">
          {/* Col 1: Logo & Tagline */}
          <div className="mt-8 flex flex-col gap-6 text-center md:text-left">
            <h1 className="font-sanctuary text-primary text-6xl leading-[16px] select-none [text-shadow:20px_10px_5px_rgba(0,0,0,0.25)]">
              DooDoung
            </h1>
            <p className="text-neutral-black mt-2 text-sm">
              Online fortune-telling platform
            </p>
          </div>

          {/* Col 2: Contact Us */}
          <div className="text-neutral-black text-sm">
            <h2 className="mb-4 text-lg font-bold">Contact us</h2>
            <p className="text-accent-pink font-bold">
              Chulalongkorn University
            </p>
            <p>Phayathai Road, Pathumwan,</p>
            <p>Bangkok 10330, Thailand</p>
            <br />
            <p>Tel : +66 2218 2000</p>
            <p>Email : contact@doodoung.com</p>
          </div>

          {/* Col 3: Contributors */}
          <div className="text-neutral-black text-sm">
            <h2 className="mb-4 text-lg font-bold">Contributors</h2>
            <ul className="text-neutral-black grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
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
      <div className="from-accent-pink to-accent-violet bg-linear-to-r py-4">
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
