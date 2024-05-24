import { useQuery } from '@tanstack/react-query';
import { Trash } from 'iconsax-react';
import React from 'react';
import { useDispatch } from 'react-redux';

import OverviewTab from '../tabs/OverviewTab';
import ResponsesTab from '../tabs/ResponsesTab';
import Loader from '@/app/_components/utils/Loader';
import SurveyCtx from '@/app/_context/Survey';
import usePathParams from '@/app/_hooks/usePathParams';
import { Modals, closeModal } from '@/app/_slices/ModalSlice';
import { TSurveyData } from '@/app/types';
import { Button } from '@/components/ui/button';
import q from "@/lib/queries";

const ViewSurveyDetails = () => {
  const dispatch = useDispatch();
  const { surveyId, handleShowDeleteModal } = React.useContext(SurveyCtx);

  const { defaultEnable, blockTenant } = usePathParams();

  const surveyDetails = useQuery({
    queryKey: ['surveydetails'],
    queryFn: () => q.surverDetailRq(surveyId as string),
    enabled: defaultEnable && !!surveyId && blockTenant,
  });

  const surveyDetail: TSurveyData = surveyDetails?.data?.data?.survey;

  const [active, setActive] = React.useState('overview');
  const links = [
    {
      title: 'Overview',
      href: 'overview',
    },
    {
      title: 'Responses',
      href: 'responses',
    },
  ];

  return (
    <>
      {surveyDetails.isLoading || surveyDetails.isFetching ? (
        <div className="w-full h-full grid place-content-center">
          <Loader />
        </div>
      ) : surveyDetails.isError ? (
        <div className="w-full h-full grid place-content-center">
          <p className="text-red-500">Something went wrong</p>
        </div>
      ) : (
        <div className="w-full">
          <h2 className="text-xl text-gray-800 font-[600] capitalize">{surveyDetail?.title}</h2>
          <hr className="my-3 mb-8" />

          <ul className="grid grid-cols-2 text-center gap-3 w-full mb-10 bg-gray-200 place-content-center p-1 rounded-[7px]">
            {links.map((link, i) => (
              <li
                key={i}
                onClick={() => setActive(link.href)}
                className={`cursor-pointer p-2 text-sm transition font-[600] ${
                  active === link.href ? 'text-gray-700 bg-white rounded-[var(--rounded)]' : 'text-gray-500'
                }`}
              >
                {link.title}
              </li>
            ))}
          </ul>

          <div className="flex w-full lg:gap-10 gap-5 flex-col justify-between min-h-[330px]">
            {active === 'overview' ? (
              <OverviewTab surveyDetail={surveyDetail} />
            ) : (
              <ResponsesTab surveyDetail={surveyDetail} />
            )}
            {active === 'overview' && (
              <Button
                variant="destructiveOutline"
                className="max-w-[500px] self-center flex gap-3 items-center w-full"
                onClick={() => {
                  handleShowDeleteModal(surveyDetail?._id || '');
                  dispatch(closeModal(Modals.viewSurveyModal));
                }}
              >
                <Trash size={16} />
                Delete
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSurveyDetails;
