import Sidebar from "@/components/Sidebar";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div className="px-8 py-4 sm:ml-64 space-y-4">{children}</div>
    </div>
  );
};

export default Layout;
