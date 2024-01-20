// This is a Client Component, which means we can use event listeners and hooks.
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  /* In this 'handleSearch()' function, ${pathname} is the current path e.g. "/dashboard/invoices"
  Whenever 'handleSearch()' is called, that is, whenever the user types something in the search bar,
  'params.toString()' translates this input into a URL-friendly format. The 'replace()' function
  updates the URL with the user's search data e.g. "/dashboard/invoices?query=hello" if the user
  searches for "hello". The URL is updated without reloading the page, thanks to Next.js's client-
  side navigation. Interpolating inside the 'replace()' function gives the URL we want to update to. 
  
  'useDebouncedCallback()' is used to prevent the 'handleSearch()' function from being called every
  time user types something in the search bar, thus reducing the number of queries in our database.
  After 300 milliseconds of inactivity, the 'handleSearch()' function will be called. */

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    term ? params.set('query', term) : params.delete('query');

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-9/12 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(event) => handleSearch(event.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
