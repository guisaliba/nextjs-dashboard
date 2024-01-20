import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

// This page is a Server Component that fetches customers and pass it to the <Form /> component.
export default async function Page() {
  // What is this code doing?
  // It's fetching the customers from the database, and passing them to the form.
  // The <Breadcrumb /> component is just a UI component, so it doesn't need any data.
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
