import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { sora } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from '@/app/ui/skeletons';

/* Making 'Page' async allows us to fetch data using 'await'. There are 3 components
which receive data: <Card>, <RevenueChart> and <LatestInvoices>. */
export default async function Page() {
  return (
    <main>
      <h1 className={`${sora.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Using Suspense from React enables streaming your dynamic components
        while they're loading. This is useful for components that take a long time to load.
        You can pass a fallback component to be shown while the dynamic component is loading,
        in this case, we show the <RevenueChartSkeleton /> component while the <RevenueChart />
        component is not fully ready (while it's data has not been fetched). */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
