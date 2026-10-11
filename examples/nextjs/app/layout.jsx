import "@ds-gn/tokens/public";
import "@ds-gn/tokens/theme";
import "@ds-gn/tokens/properties";
import "./brand-overrides.css";
import "./globals.css";

export const metadata = {
  title: "DS-GN Next.js",
  description: "DS-GN React wrappers in the Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
