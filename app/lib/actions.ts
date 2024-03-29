// Every function exported from this file will be marked as server functions.
// They can be imported into Client and Server components.
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// An 'Invoice' expects the following format:
// type Invoice = {
//   id: string;
//   customer_id: string;
//   amount: number;
//   date: string;
//   status: 'pending' | 'paid';
// };

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  // Coercing 'amount' to change from a string to a number.
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

// Omitting 'id' and 'date' from the form schema, since they
// are not needed when creating a new invoice.
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, date, status)
    VALUES (${customerId}, ${amountInCents}, ${date}, ${status})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to create invoice.',
    };
  }

  // Refresh the '/dashboard/invoices' path and fetch new data from the server.
  revalidatePath('/dashboard/invoices');

  // Redirect user to the invoices page ('/dashboard/invoices').
  redirect('/dashboard/invoices');
}

// Omitting 'id' and 'date' from the form schema, since they
// are not needed when updating an existing invoice.
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to update invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  // 'redirect()' is being called outside of the 'try/catch' block. This is because 'redirect()'
  // intentionally throws an error to work, which would be caught by the 'catch' block.
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to delete invoice.');

  try {
    await sql`
      DELETE FROM invoices
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/invoices');
    return {
      message: 'Invoice deleted.',
    };
  } catch (error) {
    return {
      message: 'Database Error: Failed to delete invoice.',
    };
  }
}
