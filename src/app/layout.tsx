import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // production domain belli olunca değişecek
  title: {
    default: "GITBootcamp",
    template: "%s",
  },
  openGraph: {
    siteName: "GITBootcamp",
    type: "website",
    images: [
      {
        url: "/og-image.png", // az sonra oluşturacağımız görsel
        width: 1200,
        height: 630,
        alt: "GITBootcamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}