import SideNav from '@/app/ui/dashboard/sidenav';

/* 'layout.tsx' is a special file that allows you to create UI that is shared between multiple
pages. It exports a React component 'Layout' which receives a 'children' prop. This child can
either be a page or another layout, meaning that every page under this route '/dashboard' will
get this layout applied to it. In this case, it is a <SideNav /> component with some CSS. 

This also means that pages inside nested routes like '/customers' or '/invoices' also gets this
layout applied to them, because of the file-system hierarchy Next.js use to create routes. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-screen flex-col md:flex-row md:overflow-hidden`}>
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
