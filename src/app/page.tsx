import { Laugh } from "lucide-react";
import Image from "next/image";

import { DefaultLayout } from "@/components/globalComponents";
import GlobalButton from "@/components/globalComponents/component-ex";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <GlobalButton variant="default">Click Me</GlobalButton>

        <GlobalButton variant="secondary">Cancel</GlobalButton>

        <GlobalButton variant="default" loading>
          Saving...
        </GlobalButton>

        <GlobalButton variant="default" icon={<Laugh />}>
          icon
        </GlobalButton>

        <GlobalButton variant="secondary" fullWidth>
          Submit
        </GlobalButton>
      </div>
    </DefaultLayout>
  );
}
