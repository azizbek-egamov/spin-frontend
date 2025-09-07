import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Project",
  description: "Created with ardentsoft.uz",
  generator: "ardentsoft.uz",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Disable right-click context menu
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
              });

              // Disable keyboard shortcuts
              document.addEventListener('keydown', function(e) {
                // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                if (e.keyCode === 123 || 
                    (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
                    (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88))) {
                  e.preventDefault();
                  return false;
                }
              });

              // Disable drag and drop
              document.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
              });

              // Disable text selection with mouse
              document.addEventListener('selectstart', function(e) {
                e.preventDefault();
                return false;
              });

              // Disable print
              window.addEventListener('beforeprint', function(e) {
                e.preventDefault();
                return false;
              });

              // Disable scrolling with mouse wheel and arrow keys
              document.addEventListener('wheel', function(e) {
                e.preventDefault();
              }, { passive: false });

              document.addEventListener('keydown', function(e) {
                // Disable arrow keys, page up/down, home, end
                if ([37, 38, 39, 40, 33, 34, 35, 36].includes(e.keyCode)) {
                  e.preventDefault();
                }
              });

              // Disable touch scrolling on mobile
              document.addEventListener('touchmove', function(e) {
                e.preventDefault();
              }, { passive: false });
            `,
          }}
        />
      </body>
    </html>
  )
}
