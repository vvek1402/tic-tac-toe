import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Provider/theme-provider";
import { NameProvider } from "@/context/NameContext";
import { SocketProvider } from "@/context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tick tac toe",
  description: "Tick tac toe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NameProvider>
            <SocketProvider>{children}</SocketProvider>
          </NameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
