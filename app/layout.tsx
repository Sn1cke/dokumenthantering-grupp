import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthProvider from "@/components/authprovider/Authprovider";
import UserValidation from "@/components/UserValidation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dokke",
  description: "Dokumenthantering online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="fantasy">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <UserValidation>
            <main>{children}</main>
          </UserValidation>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
