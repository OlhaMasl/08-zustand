'use client'

import css from './NoteList.module.css'
import type { Note } from '../../types/note';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import Link from 'next/link';

interface NoteListProps {
    noteSet: Note[],
};

const NoteList = ({ noteSet }: NoteListProps) => {

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (noteId: string) => deleteNote(noteId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        }
    });

    const handleDelete = (id: string) => { 
        mutate(id)
    };

    return (
        <ul className={css.list}>
            {noteSet.map((note) => (<li className={css.listItem}  key={note.id}>
                <h2 className={css.title}>{ note.title}</h2>
                <p className={css.content}>{note.content }</p>
                <div className={css.footer}>
                    <span className={css.tag}>{note.tag}</span>
                    <Link href={`/notes/${note.id}`} className={css.link}>View details</Link>
                    <button className={css.button} onClick={() => { handleDelete(note.id) }}>Delete</button>
                </div>
            </li>))}
        </ul>
    )
};

export default NoteList;