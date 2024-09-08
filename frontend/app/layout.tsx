import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: 'DevConnector',
  description: 'Welcome to DevConnector',
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section className={`${styles.container}`} style={{
            backgroundImage: `url('/showcase.jpg')`,
          }}>
            <Nav />
            <main className={`${styles.main}`}>{children}</main>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}

