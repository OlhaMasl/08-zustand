'use client'

import { useMutation,useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { useId } from 'react';
import { createNote } from '../../lib/api';
import type { NewNote } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';


const NoteForm = () => {

    const fieldId = useId();
    const router = useRouter();

    const { draft, setDraft, clearDraft } = useNoteDraftStore();
    const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (newNote: NewNote) => createNote(newNote),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            clearDraft();
            router.push('/notes/filter/all');
        },
    });

     const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNote;
    mutate(values);
     };
    
    const handleCancel = () => router.push('/notes/filter/all');

    return (
        
            <form className={css.form} action={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <input id={`${fieldId}-title`} type="text" name="title" className={css.input} defaultValue={draft?.title} onChange={handleChange}/>
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-content`}>Content</label>
                    <textarea
                        id={`${fieldId}-content`}
                        name="content"
                        rows={8}
                    className={css.textarea}
                    defaultValue={draft?.content}
                    onChange={handleChange}
                    ></textarea>
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <select id={`${fieldId}-tag`} name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={isPending ? true : false} 
                    >
                        Create note
                    </button>
                </div>
            </form>
        
    )
};

export default NoteForm