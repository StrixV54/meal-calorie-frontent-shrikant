import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Meal Calorie Counter",
    template: "%s | Meal Calorie Counter",
  },
  description: "Track your meal calories with ease using USDA FoodData Central",
  keywords: [
    "calorie counter",
    "meal tracker",
    "nutrition",
    "USDA",
    "food data",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen md:h-screen! overflow-hidden flex-col border-0 bg-muted dark:bg-background">
            <Header />
            <main className="flex items-center justify-center md:h-[calc(100vh-128px)] overflow-y-auto bg-cover bg-center bg-no-repeat bg-[linear-gradient(0deg,rgba(255,255,255,0.3),rgba(255,255,255,0.7)),url('https://images.unsplash.com/photo-1648421714382-70d47442b354?q=80')] dark:bg-[linear-gradient(0deg,rgba(0,0,0,0.6),rgba(0,0,0,0.9)),url('https://images.unsplash.com/photo-1648421714382-70d47442b354?q=80')]">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
