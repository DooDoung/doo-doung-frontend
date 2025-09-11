import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/router";

import { DefaultLayout, GlobalButton } from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";

export default function ResetPasswordSuccessfulPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      router.push("/login");
    } catch (err: any) {
      AppToast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout
      includeFooter={false}
      includeHeader={false}
      contentClassName="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-black to-neutral-dark"
    >
      <div className="bg-neutral-black/50 shadow-neutral-white relative flex min-h-[80vh] w-8/9 flex-col items-center justify-center rounded-4xl shadow-[0_0_20px] backdrop-blur-[10px]">
        <h3 className="font-sanctuary text-neutral-white absolute top-8 left-10 text-5xl">
          Doodoung
        </h3>

        <div className="text-neutral-white mb-2 h-48 w-48">
          <CircleCheck className="h-full w-full" strokeWidth={0.5} />
        </div>
        <h2 className="font-sanctuary text-neutral-white mb-4 text-center text-[64px]">
          Successfully reset password
        </h2>
        <a className="font-chakra text-neutral-white mb-10 text-lg">
          Your password has been changed successfully
        </a>

        <div className="font-chakra text-neutral-white flex justify-center">
          <GlobalButton
            type="button"
            variant="primary"
            size="lg"
            className="w-fit text-xl"
            loading={loading}
            loadingText="Logging in..."
            onClick={handleSubmit}
          >
            Go to login
          </GlobalButton>
        </div>
      </div>
    </DefaultLayout>
  );
}
