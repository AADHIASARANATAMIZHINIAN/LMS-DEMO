import type { Metadata } from "next";
import "./globals.css";
import { MockProvider } from "@/components/MockProvider";

export const metadata: Metadata = {
  title: "University Coding LMS",
  description: "Advanced Academic Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MockProvider>
          {children}
        </MockProvider>
      </body>
    </html>
  );
}
