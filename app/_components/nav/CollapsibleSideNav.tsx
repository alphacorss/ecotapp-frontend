import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function CollapsibleSideNav({
  array,
  role,
  isOpen,
  item,
  expandDrawer,
  setExpandDrawer,
  setIsOpen,
}: {
  item: (typeof array)[number];
  expandDrawer: boolean;
  setExpandDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  array: any[];
  role: string | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const active = usePathname();
  const isActive = array.some((nav) => active.split('/')[2] === nav.href.split('/')[2]);
  const isTenantAndBroadcast = item.title === 'Broadcast & Survey' && role === 'tenant';

  return (
    <Collapsible open={isOpen} defaultOpen={true} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <button
          onClick={() => setExpandDrawer(!expandDrawer ? true : true)}
          className={`side_nav ${expandDrawer ? 'flex justify-between items-center px-4 py-2' : 'justify-center'} ${
            isActive
              ? 'bg-primary-300 text-white hover:bg-primary-300/90 transition'
              : 'text-gray-500 hover:border hover:border-primary-300 '
          }`}
        >
          <span className="flex items-center gap-2">
            {item.icon(isActive ? 'white' : 'gray')}
            {expandDrawer && <span className="font-[500]">{isTenantAndBroadcast ? 'Survey' : item.title}</span>}
          </span>
          {expandDrawer && <span>{isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</span>}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full pl-10 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
        <ul className="flex flex-col">
          {array.map((item, index) => {
            if (!item?.allowedRoles?.includes(role as string)) {
              return null;
            }
            return (
              <Link
                key={index}
                className={`text-sm font-[500] mb-2 px-4 py-2 rounded-[var(--rounded)] border border-white transition w-full
                ${
                  item.href.split('?')[0] === active.split('?')[0]
                    ? 'bg-primary-100/20 text-gray-700'
                    : 'border hover:border-primary-300 text-gray-500'
                }
            `}
                href={item.href}
              >
                {item.title}
              </Link>
            );
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
