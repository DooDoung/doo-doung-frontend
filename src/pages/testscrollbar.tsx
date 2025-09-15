import { DefaultLayout } from "@/components/globalComponents";

export default function TestScrollBarPage() {
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center">
        <div className="custom-scrollbar h-100 w-200 overflow-y-scroll bg-blue-200">
          <div className="h-200">Scrollable Content</div>
        </div>
      </div>
    </DefaultLayout>
  );
}
