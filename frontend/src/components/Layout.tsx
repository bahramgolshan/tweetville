import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { APP_NAME } from "@/config/constants";
import { sliceString } from "@/util/strings";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { firstHalf, secondHalf } = sliceString(APP_NAME.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-200 text-gray-900">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-800 text-white shadow">
        <div className="container mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-xl ">
              <span>{firstHalf}</span>
              <span className="text-primary">{secondHalf}</span>
            </span>
          </div>

          <Button variant="link" size="sm" asChild>
            <Link to={"/logout"}>
              <LogOut />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl bg-white shadow-md rounded-md mt-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
