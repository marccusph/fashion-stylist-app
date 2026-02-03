export const metadata = {
  title: 'Style AI - Fashion Styling Assistant',
  description: 'Get instant AI-powered outfit suggestions for any fashion item',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
