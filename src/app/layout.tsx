import Sidebar from '@/components/Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0b] text-[#fafafa] antialiased">
        <Sidebar />
        <main className="ml-60">
          {children}
        </main>
      </body>
    </html>
  )
}
