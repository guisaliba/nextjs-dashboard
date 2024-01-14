import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      // clsx is a library to conditionally apply classes to an element.
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          /* Here we want to apply the bg-gray-100 and text-gray-500 classes if the status is 'pending'. This ternary operator is the same as writing: if (status === 'pending')
            { 
              return 'bg-gray-100 text-gray-500';
            } else {
              return '';
            }
          */
          'bg-gray-100 text-gray-500': status === 'pending',
          // If the status is 'paid', we want to apply the bg-green-500 and text-white classes. We write a ternary for this too and clsx() will only apply the classes if the condition is true (status === 'paid').
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
