// Next.js downloads font files at build time and hosts them with your other static assets. This means when a user
// visits your application, there are no additional network requests for fonts which would impact performance.
import { Inter, Sora, Poppins } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const sora = Sora({ subsets: ['latin'], weight: ['400', '700'] });
export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
