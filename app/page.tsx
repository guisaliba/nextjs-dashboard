import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { sora } from '@/app/ui/fonts';

/* Special React component required for the route to be accessible. In this case, the home page
route is only available because of this 'page.tsx' file and its 'Page' component. This one is the
home page associated with the route '/'*/
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {<AcmeLogo />}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* Another way to style components is with CSS Modules. They allow you to write vanilla CSS syntax in 
          other files (e.g. 'file.css.module') then import it into your component (import styles from 'file.css.module';)
          and style them with 'className={styles.something}' where 'something' is the class you've created and styled.
          CSS Modules create unique class names for each component, so you don't have to worry about style collisions! */}
          <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-black border-l-transparent border-r-transparent"></div>

          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span className={`${sora.className}`}>Log in</span>{' '}
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Image is a component that optimizes images for the web. It's a Next.js component, not a React component.
          The <Image> component is built on top of the HTML <img> element. It supports lazy loading, automatically
          adding the correct image sizes, and optimizing images on the fly. It also allows you to add a placeholder
          image while the image is loading. */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
