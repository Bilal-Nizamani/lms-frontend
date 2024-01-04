"use client";
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import ThemeProvider from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Loadder from "./components/Loadder/Loadder";
import { Providers } from "./Provider";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom> {children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  return <> {isLoading ? <Loadder /> : <>{children}</>}</>;
  // return <>{children}</>;
};
