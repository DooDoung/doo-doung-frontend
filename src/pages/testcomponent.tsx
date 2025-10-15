import CustomerPublicInfo from "@/components/account/CustomerPublicInfo";
import ProphetPublicInfo from "@/components/account/ProphetPublicInfo";
import { DefaultLayout } from "@/components/globalComponents/DefaultLayout";


export default function TestComponentPage() {
    return (
        <DefaultLayout>
            <div className="flex flex-col md:flex-row gap-4">
                <CustomerPublicInfo />
                <ProphetPublicInfo />
            </div>
        </DefaultLayout>
    );
}
