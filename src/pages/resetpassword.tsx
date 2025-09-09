import { useState } from "react";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/router";

import { DefaultLayout, GlobalButton, GlobalInput } from "@/components/globalComponents";
import { AppToast } from "@/lib/app-toast";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isEmailInvalid = (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ? true: false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!email) {
      AppToast.error("Email are required.")
      return;
    }

    if(isEmailInvalid) {
      AppToast.error("Email not found");
      return;
    }

    setLoading(true);
    
    /// send token to email
    AppToast.success("A reset password has been sent to your email.");
    AppToast.info("Reset already requested. Please check your email");

    setLoading(false);
  }

  return (
    <DefaultLayout
      includeFooter={false}
      includeHeader={false}
      contentClassName="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-black to-neutral-dark"
    >
      <div className="relative flex flex-col min-h-[80vh] w-8/9 items-center justify-center bg-neutral-black/50 backdrop-blur-[10px] rounded-4xl shadow-[0_0_20px] shadow-neutral-white">
        <h3 className="absolute top-8 left-10 font-sanctuary text-xl lg:text-3xl xl:text-5xl text-neutral-white">Doodoung</h3>

        <h2 className="mb-4 font-sanctuary text-neutral-white text-[42px] lg:text-5xl xl:text-[64px]">Forgot your password?</h2>
        <a className="mb-6 font-chakra text-neutral-white text-base lg:text-lg xl:text-xl">Enter your email to reset your password.</a>
      
        <form onSubmit={handleSubmit} className="w-80">
          <div className="mb-6 font-chakra text-base lg:text-xl xl:text-2xl text-neutral-white">
            <div className="mb-8">
              <label className="block mb-2">Email</label>
              <GlobalInput
                type="email"
                className="w-full text-sm lg:text-base xl:text-xl"
                placeholder="example@gmail.com"
                isInvalid={email == "" ? false:isEmailInvalid}
                isValid={email == "" ? false:!isEmailInvalid}
                hintText={email == "" ? "":((isEmailInvalid)? "Email should look like name@example.com": "Email looks valid")}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <GlobalButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-fit text-l lg:text-xl xl:text-2xl"
                loading={loading}
                loadingText="Logging in..."
                onClick={handleSubmit}
              >Send email</GlobalButton>
            </div>
          </div>
        </form>

        <div className="absolute bottom-8 right-8">
          <GlobalButton
            type="button"
            variant="secondary"
            size="sm"
            className="w-fit text-base lg:text-lg xl:text-xl"
            loading={loading}
            icon={<ArrowLeft className="text-accent-pink" strokeWidth={3}/>}
            onClick={() => router.push("/login")}
          >Back to login</GlobalButton>
        </div>
      </div>
    </DefaultLayout>
  );
}
