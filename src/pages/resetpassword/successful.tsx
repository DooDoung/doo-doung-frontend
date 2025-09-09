import { useState } from "react";
import { CircleCheck } from 'lucide-react';
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
  }

  return (
    <DefaultLayout
      includeFooter={false}
      includeHeader={false}
      contentClassName="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-black to-neutral-dark"
    >
      <div className="relative flex flex-col min-h-[80vh] w-8/9 items-center justify-center bg-neutral-black/50 backdrop-blur-[10px] rounded-4xl shadow-[0_0_20px] shadow-neutral-white">
        <h3 className="absolute top-8 left-10 font-sanctuary text-xl lg:text-3xl xl:text-5xl text-neutral-white">Doodoung</h3>

        <div className="mb-2 h-32 lg:h-40 xl:h-48 w-32 lg:w-40 xl:w-48 text-neutral-white">
          <CircleCheck 
            className="w-full h-full" 
            strokeWidth={0.5}
          />
        </div>
        <h2 className="mb-4 font-sanctuary text-neutral-white text-[42px] lg:text-5xl xl:text-[64px] text-center">Successfully reset password</h2>
        <a className="mb-10 font-chakra text-neutral-white text-sm lg:text-base xl:text-lg">Your password has been changed successfully</a>
      
        <div className="flex justify-center font-chakra text-neutral-white">
              <GlobalButton
                type="button"
                variant="primary"
                size="lg"
                className="w-fit text-l lg:text-xl xl:text-2xl"
                loading={loading}
                loadingText="Logging in..."
                onClick={handleSubmit}
              >Go to login</GlobalButton>
            </div>
      </div>
    </DefaultLayout>
  );
}
