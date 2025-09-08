import { DefaultLayout } from "@/components/globalComponents";
import { AppToast } from "../lib/app-toast";

export default function TestToastPage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center py-5 bg-primary-250 min-h-screen">
        <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md my-28">
          <h1 className="text-2xl font-bold text-center text-neutral-800 mb-6">
            Test App Toast
          </h1>
          <div className="grid grid-cols-1 gap-4">
            <button
              className="w-full px-4 py-3 font-semibold text-white bg-success rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              onClick={() => AppToast.success("This is a success message!")}
            >
              Show Success Toast
            </button>
            <button
              className="w-full px-4 py-3 font-semibold text-white bg-error rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              onClick={() => AppToast.error("This is an error message!")}
            >
              Show Error Toast
            </button>
            <button
              className="w-full px-4 py-3 font-semibold text-white bg-warning rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
              onClick={() => AppToast.warning("This is a warning message!")}
            >
              Show Warning Toast
            </button>
            <button
              className="w-full px-4 py-3 font-semibold text-white bg-accent-violet rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
