import type { Metadata } from "next";
import css from './page.module.css'

export const metadata: Metadata = {
  title: "NoteHub",
  description: "This page does not exist",
  openGraph: {
      title: "NoteHub",
      description: "This page does not exist",
      url: "https://08-zustand-juhr9a3ij-olhas-projects-b297de87.vercel.app/",
      siteName: 'NoteHub',
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub picture",
        },
      ],
    },
};

const NotFound = () => {
    return (
      <>
    <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p></>
  );
};

export default NotFound;
