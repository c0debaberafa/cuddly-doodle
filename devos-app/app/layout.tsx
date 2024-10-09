import "./globals.css"; // Tailwind CSS should be included here
import LogoTitleBar from "./components/LogoTitleBar"; // Import your component
import SideNavBar from "./components/SideNavbar"; // Import your component
import AppWalletProvider from "./components/WalletProvider";

export const metadata = {
  title: "My App",
  description: "A great app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          {/* LogoTitleBar at the top */}
          <header className="w-full">
            <LogoTitleBar />
          </header>

          <div className="flex flex-1">
            {/* SideNavBar taking height below the header */}
            <aside className="w-20 h-full bg-gray-200">
              <SideNavBar />
            </aside>

            {/* Main content will take the remaining width */}
            <main className="flex-1">
              <AppWalletProvider>{children}</AppWalletProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
