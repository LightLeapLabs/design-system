import "@lightleaplabs/tokens/public";
import "@lightleaplabs/tokens/theme";
import "./brand-overrides.css";
import "./globals.css";

export const metadata = {
  title: "LightLeap Next.js",
  description: "LightLeap React wrappers in the Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
