import { QueryClient, HydrationBoundary, dehydrate,} from "@tanstack/react-query";
import { fetchNotes}  from '@/lib/api';
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';

interface NotesProps {
    params: Promise<{ slug: string[] }>;
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
