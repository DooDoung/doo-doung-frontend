import { useRouter } from "next/router";

import {
  DefaultLayout,
  GlassContainer,
  GlobalButton,
} from "@/components/globalComponents";

const SessionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Mock data for session details based on the image
  const sessionDetails = {
    id: id,
    prophetName: "ItsGuitar",
    method: "Astrology",
    sector: "Career & Finance",
    time: "8 October 2025, 03:30 PM - 04:30 PM",
    customerName: "Sivikorn Nokham",
    customerUsername: "ItsGuitar_sleep",
    transactionId: "xxx-xxxx-xxx",
    amount: "199 Baht",
    payoutStatus: "COMPLETED",
    createdDate: "2025-10-07 14:54",
    payoutAccountName: "สิวิกรมณ์ โนคำ",
    payoutBank: "Kasikorn Thai Bank",
    payoutAccountNumber: "***-*-*****-*",
  };

  return (
    <DefaultLayout includeHeader={false}>
      <div className="font-chakra flex flex-col items-center justify-center">
        <h1 className="font-sanctuary text-5xl font-bold text-white">
          DooDoung
        </h1>
        <GlassContainer className="mt-4 flex h-[80vh] w-[calc(80vh*1261/746)] flex-row">
          <div className="flex h-full w-[30%] flex-col items-center rounded-l-3xl bg-[#F9B7BB]/60 py-8">
            <h2 className="font-sanctuary text-2xl font-bold text-[#3E3753]">
              PROPHET
            </h2>
            <div className="my-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
              <p className="text-[#3E3753]">Profile</p>
            </div>
            <p className="text-sm text-[#3E3753]">USERNAME</p>
            <div className="mt-2 w-2/3 rounded-full bg-white/80 px-4 py-2 text-center">
              <p className="font-semibold text-[#3E3753]">
                {sessionDetails.prophetName}
              </p>
            </div>
          </div>
          <div className="relative w-[70%] p-8">
            <GlobalButton
              variant="primary"
              className="absolute top-4 right-4"
              size="default"
              onClick={() => router.back()}
            >
              Back
            </GlobalButton>
            <div className="mt-12 grid h-[calc(100%-100px)] grid-cols-2 grid-rows-2 gap-4 text-xs text-[#3E3753]">
              <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
                <h3 className="mb-2 font-bold">Session Information</h3>
                <p>Prophet's Name: {sessionDetails.prophetName}</p>
                <p>Method: {sessionDetails.method}</p>
                <p>Sector: {sessionDetails.sector}</p>
                <p>Time: {sessionDetails.time}</p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
                <h3 className="mb-2 font-bold">Customer's Information</h3>
                <p>Name: {sessionDetails.customerName}</p>
                <p>Username: {sessionDetails.customerUsername}</p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
                <h3 className="mb-2 font-bold">Transaction Information</h3>
                <p>Transaction ID: {sessionDetails.transactionId}</p>
                <p>Amount: {sessionDetails.amount}</p>
                <p>Payout Status: {sessionDetails.payoutStatus}</p>
                <p>Created: {sessionDetails.createdDate}</p>
              </div>
              <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
                <h3 className="mb-2 font-bold">Payout Information</h3>
                <p>Account Name: {sessionDetails.payoutAccountName}</p>
                <p>Bank: {sessionDetails.payoutBank}</p>
                <p>Account Number: {sessionDetails.payoutAccountNumber}</p>
              </div>
            </div>
            <GlobalButton
              variant="primary"
              className="absolute right-4 bottom-4"
              size="default"
            >
              Mark as Completed
            </GlobalButton>
          </div>
        </GlassContainer>
      </div>
    </DefaultLayout>
  );
};

export default SessionDetailPage;
