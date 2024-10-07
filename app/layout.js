import localFont from "next/font/local";
import "./globals.css";
import MobileNavbar from "./components/MoblieNavbar";
const geistSans = localFont({
  src: "./fonts/ProximaNovaSemibold.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/ProximaNovaSemibold.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Xodern",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <MobileNavbar /> 
      </body>
    </html>
  );
}