import { Eye, Trash } from 'iconsax-react';
import { MoreVertical, Search } from 'lucide-react';
import React, { useState, useMemo } from 'react';

import { TSurveyData } from '@/app/types';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const ResponsesTab = ({ surveyDetail }: { surveyDetail: TSurveyData | undefined }) => {
  const [search, setSearch] = useState('');
  const [viewingResponse, setViewingResponse] = useState<any | null>(null);

  // Prepare respondent list
  const respondents = useMemo(() => {
    if (!surveyDetail?.responses) return [];
    return surveyDetail.responses.map((response: any, idx: number) => ({
      id: idx + 1,
      name: `${response.user?.firstName || ''} ${response.user?.lastName || ''}`.trim(),
      email: response.user?.email || '',
      raw: response,
    }));
  }, [surveyDetail]);

  // Filtered respondents
  const filtered = useMemo(() => {
    if (!search) return respondents;
    return respondents.filter(
      (r: any) =>
        r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [respondents, search]);

  // Modal for viewing individual response
  const renderResponseModal = () => {
    if (!viewingResponse) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8 relative">
          <button
            className="absolute top-5 right-6 text-gray-400 hover:text-gray-700 text-2xl"
            onClick={() => setViewingResponse(null)}
            aria-label="Close"
          >
            ×
          </button>
          <table className="w-full mt-2">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 font-semibold text-gray-700 w-12">No.</th>
                <th className="p-3 font-semibold text-gray-700">Question</th>
                <th className="p-3 font-semibold text-gray-700 w-32">Response</th>
              </tr>
            </thead>
            <tbody>
              {viewingResponse.answers.map((ans: any, idx: number) => (
                <tr key={ans._id} className="">
                  <td className="p-3 align-top">{idx + 1}</td>
                  <td className="p-3 align-top text-gray-800">{ans.question?.questionText || ''}</td>
                  <td className="p-3 align-top text-gray-800">{ans.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <div className="relative w-full max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search by name or email"
            className="border rounded-lg pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-semibold text-gray-700 w-12">ID</th>
              <th className="p-3 font-semibold text-gray-700">Name</th>
              <th className="p-3 font-semibold text-gray-700">Email Address</th>
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-8 text-gray-400">
                  No results.
                </td>
              </tr>
            ) : (
              filtered.map((r: any, idx: number) => (
                <tr key={r.id} className="border-b last:border-b-0 hover:bg-gray-50 group transition">
                  <td className="p-3 align-middle">{r.id}</td>
                  <td className="p-3 align-middle">{r.name}</td>
                  <td className="p-3 align-middle">{r.email}</td>
                  <td className="p-3 align-middle text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                          <MoreVertical size={22} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 p-1">
                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => setViewingResponse(r.raw)}
                        >
                          <Eye size={18} className="text-gray-600" />
                          <span>View response</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-600"
                          onClick={() => {
                            /* TODO: Implement remove logic */
                          }}
                        >
                          <Trash size={18} className="text-red-500" />
                          <span>Remove</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {viewingResponse && renderResponseModal()}
    </div>
  );
};

export default ResponsesTab;
