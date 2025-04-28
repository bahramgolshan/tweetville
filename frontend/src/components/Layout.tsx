import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
    </div>
  );
};

export default Layout;
