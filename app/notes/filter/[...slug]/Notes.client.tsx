'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../../../lib/api';
import NoteList from '../../../../components/NoteList/NoteList'
import css from './NotesPage.module.css'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Pagination from '../../../../components/Pagination/Pagination';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import { useRouter } from 'next/navigation';

interface NotesClientProps {
  tag: string | undefined;
};

const NotesClient = ({ tag }: NotesClientProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['notes', searchValue, currentPage, tag,],
    queryFn: () => fetchNotes(searchValue, currentPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  
  const router = useRouter();
  const close = () => router.push('/notes/action/create');
  
  const handleSearch = useDebouncedCallback((search: string) => {
    setSearchValue(search)
    setCurrentPage(1)
  }, 1000);
 
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch} searchValue={searchValue} />
          {data && data?.totalPages > 1 && <Pagination page={currentPage} onChangeFn={(selectedPage) => setCurrentPage(selectedPage)} total={data?.totalPages} />}
          <button className={css.button} onClick={close}>Create note +</button>
        </header>
        <main>
          {data && data?.notes.length > 0 && <NoteList noteSet={data?.notes} />}
        </main>
      </div>
    </>
  );
};

export default NotesClient;