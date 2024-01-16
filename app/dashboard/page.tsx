import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { sora } from '@/app/ui/fonts';
import {
  fetchCardData,
  fetchLatestInvoices,
  fetchRevenue,
} from '@/app/lib/data';

/* Making 'Page' async allows us to fetch data using 'await'. There are also 3 components
which receive data: <Card>, <RevenueChart> and <LatestInvoices>. */
export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();

  // Destructuring the data we need from the 'fetchCardData' function.
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await fetchCardData();

  /* 'fetchRevenue()', 'fetchLatestInvoices()' and 'fetchCardData()' create a request waterfall,
  a sequence of network request that depend on the completion of previous requests. This is not
  necessarily a bad pattern, there may be cases where you want waterfalls because you want a 
  condition to be satisfied before you make the next request. However, in this case, we can make
  all the requests in parallel, which is more efficient and avoids potential problems.
  
  In JavaScript, you can use the 'Promise.all()' method to make multiple requests in parallel.
  */
  return (
    <main>
      <h1 className={`${sora.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
