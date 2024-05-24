import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Modals } from '@/app/enums';
import { Button } from '@/components/ui/button';
import { getRole } from '@/lib/utils';

const EmptyState = ({
  imgpath,
  btnText,
  description,
  handleOpenModal,
}: {
  imgpath: string;
  btnText: string;
  description: string;
  // eslint-disable-next-line no-unused-vars
  handleOpenModal: (modal: Modals) => void;
}) => {
  const role = getRole();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-10 text-center">
      {role === 'tenant' ? (
        <>
          <Image alt="" width={150} height={150} src={imgpath} />
          <h1 className="text-xl font-[600] mt-5">No Surveys available yet</h1>
          <p className="text-sm font-[500] text-gray-500 mt-3 lg:max-w-[50%] text-center">{description}</p>
          <Button className="mt-8 p-0 grid place-content-center">
            <Link className="w-full h-full p-3 px-12" href="/dashboard/home">
              Go Home
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Image alt="" width={150} height={150} src={imgpath} />
          <h1 className="text-xl font-[600] mt-5">No data available yet</h1>
          <p className="text-sm font-[500] text-gray-500 mt-3 lg:max-w-[50%] text-center">
            Ready to Gather Insights?– Create a survey to unlock valuable data and enhance decision-making.
          </p>
          <Button className="mt-8" onClick={() => handleOpenModal(Modals.createSurveyModal)}>
            {btnText}
          </Button>
        </>
      )}
    </div>
  );
};

export default EmptyState;
