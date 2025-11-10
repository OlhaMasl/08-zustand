import { Note, NoteTag } from "@/types/note";
import axios from "axios";


const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
};

interface NewNote {
  title: string,
  content?: string,
  tag: NoteTag
};

const headers = {
    Authorization: `Bearer ${myToken}`,
    accept: 'application/json',
  };


export const fetchNotes = async (query: string, page: number, tag?:string): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', {
    headers: headers,
    params: {
      search: query,
      tag,
      page,
      perPage: 10
    }
  });
  return response.data;
};

export const createNote = async(newNote: NewNote): Promise<Note> => { 
    const response = await axios.post<Note>('https://notehub-public.goit.study/api/notes', newNote, {headers: headers});
    return response.data;
};

export const deleteNote = async(noteId: string,): Promise<Note> => { 
    const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${noteId}`, {headers: headers});
    return response.data;
};

export const fetchNoteById = async(id: string,): Promise<Note> => { 
    const response = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {headers: headers});
    return response.data;
};