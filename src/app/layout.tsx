import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const geistSans = GeistSans({
  subsets: ["latin"],
  variable: '--font-geist-sans',
  display: 'swap'
});

const geistMono = GeistMono({
  subsets: ["latin"], 
  variable: '--font-geist-mono',
  display: 'swap'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}