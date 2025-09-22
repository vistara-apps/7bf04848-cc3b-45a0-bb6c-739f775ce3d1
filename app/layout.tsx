import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'CollabCraft - Skill-match, build, and remix your next big idea',
  description: 'A platform for creative individuals to discover collaborators with complementary skills and collectively build projects.',
  openGraph: {
    title: 'CollabCraft',
    description: 'Skill-match, build, and remix your next big idea',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
