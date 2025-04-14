import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

// 直接使用导入的字体对象，不需要调用
const fontSans = GeistSans;
const fontMono = GeistMono;

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
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className={`${fontSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}