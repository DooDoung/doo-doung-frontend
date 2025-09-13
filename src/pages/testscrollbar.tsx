import { DefaultLayout } from "@/components/globalComponents";

export default function TestScrollBarPage() {
  return (
    <DefaultLayout>
      <div className="flex justify-center items-center">
        <div className="h-100 w-200 bg-blue-200 overflow-y-scroll custom-scrollbar">
          <div className="h-200">Scrollable Content</div>
        </div>
      </div>
    </DefaultLayout>
  );
}
