import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import more from "../../public/more.webp";
import logo from "../../public/Q2_logo.png";
import Navbar from "@/components/navbar";
import TitleInPhoto from "@/components/titleInPhoto";

export const metadata: Metadata = {
  title: {
    default: "Blog | Q2",
    template: "%s | Q2",
  },
  description: "Digitální agentura Q2 bloguje o nejnovějších trendech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="cs">
      <body className="min-h-svh">
        <div className='relative'>
          <Image src={more} alt="More" width={2000} height={500} priority={false} style={{ minHeight: '350px', objectFit: 'cover' }}/>
          <div className="flex flex-row justify-between absolute w-full top-0 bg-black py-4 px-12 bg-opacity-20">
            <Link href='/'>
              <Image src={logo} alt="Logo" width={80} height={70} style={{ width: 'auto', height: 'auto' }}/>
            </Link>
            <Navbar />
          </div>

          <TitleInPhoto/>

        </div>

        <div className="container mx-auto py-[2.625rem]" style={{ paddingLeft: 'var(--padding-main-x)', paddingRight: 'var(--padding-main-x)' }}>
          {children}
        </div>

        <footer className="py-[2rem]" style={{backgroundColor: 'var(--primary)', paddingLeft: 'var(--padding-main-x)', paddingRight: 'var(--padding-main-x)'}}>
          <p className="text-sm font-bold text-white" style={{ color: '#E5E5E5' }}>2025 | Q2 Interactive s.r.o.</p>
        </footer>
      </body>
    </html>
  );
}
