import { DefaultLayout } from "@/components/globalComponents";

import { AppToast } from "../lib/app-toast";

export default function TestToastPage() {
  return (
    <DefaultLayout>
      <div className="bg-primary-250 flex min-h-screen flex-col items-center py-5">
        <div className="my-28 w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-bold text-neutral-800">
            Test App Toast
          </h1>
          <div className="grid grid-cols-1 gap-4">
            <button
              className="bg-success w-full rounded-lg px-4 py-3 font-semibold text-white transition-colors hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
              onClick={() => AppToast.success("This is a success message!")}
            >
              Show Success Toast
            </button>
            <button
              className="bg-error w-full rounded-lg px-4 py-3 font-semibold text-white transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              onClick={() => AppToast.error("This is an error message!")}
            >
              Show Error Toast
            </button>
            <button
              className="bg-warning w-full rounded-lg px-4 py-3 font-semibold text-white transition-colors hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
              onClick={() => AppToast.warning("This is a warning message!")}
            >
              Show Warning Toast
            </button>
            <button
              className="bg-accent-violet w-full rounded-lg px-4 py-3 font-semibold text-white transition-colors hover:bg-purple-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              onClick={() => AppToast.info("This is an info message!")}
            >
              Show Info Toast
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
