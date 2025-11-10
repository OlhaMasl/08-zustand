'use client'

import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';
import { useId } from 'react';
import * as Yup from "yup";
import { createNote } from '../../lib/api';


interface FormValues {
title: string,
content: string,
tag:  NoteTag
};

const FormSchema = Yup.object().shape({
  title: Yup.string().min(3, "Title must have more than 3 symbols")
    .max(50, "Title is too long")
        .required("Title is required"),
content: Yup.string()
    .max(500, "Content is too long"),
    tag: Yup.string()
        .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
        .required("This field is required")
});

interface NoteFormProps {
onClose: ()=> void,
};

interface NewNote {
  title: string,
  content: string,
  tag: NoteTag
};

const NoteForm = ({ onClose }: NoteFormProps) => {

    const fieldId = useId();
    
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (newNote: NewNote) => createNote(newNote),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            onClose();
        },
    });

    const formValues: FormValues = {
        title: '',
        content: '',
        tag: 'Todo'
    };

    const handleSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        mutate(values);
        formikHelpers.resetForm();
    };

    return (
        <Formik initialValues={formValues} onSubmit={handleSubmit} validationSchema={FormSchema}>
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
                    <ErrorMessage name="title" component='span' className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-content`}>Content</label>
                    <Field as="textarea"
                        id={`${fieldId}-content`}
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage name="content" component='span' className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component='span' className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onClose}>
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
            </Form>
        </Formik>
    )
};

export default NoteForm