import React from 'react';

type WarningBannerProps = {
  threshold: number;
};

const WarningBanner = ({ threshold }: WarningBannerProps): React.ReactElement => (
  <div className="bg-error text-white px-6 py-3 rounded-sm mb-6 text-center shadow-[0_0_4px_5px_#FFF]">
    <p className="font-chakra text-2xl">! WARNING !</p>
    <p className="font-chakra text-lg">You have received more than {threshold} reports this week.</p>
  </div>
);

export default WarningBanner;