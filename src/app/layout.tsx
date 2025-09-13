import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link"; // ✅ pakai Link bukan <a>

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Himpunan",
  description: "Website Himpunan Mahasiswa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur dark:bg-gray-950/70">
              <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                <Link href="/" className="font-semibold">
                  Himpunan
                </Link>
                <nav className="flex items-center gap-4 text-sm">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                  <Link href="/about" className="hover:underline">
                    About
                  </Link>
                  {/* nanti tambah: /berita, /event, /admin */}
                  <ThemeToggle />
                </nav>
              </div>
            </header>
            <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
