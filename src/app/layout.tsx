import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json"/>
        <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4667051183270672"
            crossOrigin="anonymous"
        ></script>
        <meta charSet="UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta
            name="google-adsense-account"
            content="ca-pub-4667051183270672"
        />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
            name="keywords"
            content="아기, 터치, 원, 네모, 세모, 감각 발달"
        />
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="베이붐"/>
        <meta
            property="og:description"
            content="우리 아치 터치 놀이 앱"
        />
        <title>베이붐</title>
      </head>
      <body className={inter.className}>{children}</body>
      </html>
  );
}
