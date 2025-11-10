'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../../../lib/api';
import NoteList from '../../../../components/NoteList/NoteList'
import css from './NotesPage.module.css'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Pagination from '../../../../components/Pagination/Pagination';
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import SearchBox from '../../../../components/SearchBox/SearchBox';

interface NotesClientProps {
  tag: string | undefined;
};

const NotesClient = ({tag}: NotesClientProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

    const { data } = useQuery({
        queryKey: ['notes', searchValue, currentPage, tag,],
        queryFn: () => fetchNotes(searchValue, currentPage, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    });
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleSearch = useDebouncedCallback((search: string) => {
    setSearchValue(search)
    setCurrentPage(1)
  }, 1000);
 
  return (
    <>
  <div className={css.app}>
	<header className={css.toolbar}>
          <SearchBox onSearch={handleSearch} searchValue={searchValue } />
    {data && data?.totalPages>1 &&<Pagination page={currentPage} onChangeFn={(selectedPage)=>setCurrentPage(selectedPage)} total={data?.totalPages} />}
		<button className={css.button} onClick={openModal}>Create note +</button>
        </header>
        <main>
          {data && data?.notes.length > 0 && <NoteList noteSet={data?.notes} />}
        </main>
        {isModalOpen && <Modal onClose={closeModal}>
          <NoteForm onClose={ closeModal} />
        </Modal>}
</div>
    </>
  )
};

export default NotesClient;