import type { Metadata } from "next";
import { QueryClient, HydrationBoundary, dehydrate, } from "@tanstack/react-query";
import { fetchNotes}  from '@/lib/api';
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';



interface NotesProps {
    params: Promise<{ slug: string[] }>
};

export const generateMetadata = async ({ params }: NotesProps): Promise<Metadata> => {
  const { slug } = await params;
    const tag = slug[0];
  return {
    title: `${tag} notes`,
    description: `Review your ${tag} notes`,
    openGraph: {
      title: `${tag} notes`,
      description: `Review your ${tag} notes`,
      url: `https://08-zustand-sandy-six.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "notehub picture",
        },
      ],
    },
  }
};

const Notes = async ({ params }: NotesProps) => {
    const { slug } = await params;
    const tag = slug[0] === 'all' ? undefined : slug[0];
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", '', 1, tag],
        queryFn: () => fetchNotes('', 1, tag),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
};

export default Notes;
