import css from '@/app/notes/filter/@sidebar/SidebarNotes.module.css'

const SidebarNotes = async () => {
    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <a href={`/notes/filter/all`} className={css.menuLink}>
                    All notes
                </a>
            </li>
            <li className={css.menuItem}>
                <a href={`/notes/filter/Todo`} className={css.menuLink}>
                    Todo
                </a>
            </li>
            <li className={css.menuItem}>
                <a href={`/notes/filter/Work`} className={css.menuLink}>
                    Work
                </a>
            </li>
            <li className={css.menuItem}>
                <a href={`/notes/filter/Personal`} className={css.menuLink}>
                    Personal
                </a>
            </li>
            <li className={css.menuItem}>
                <a href={`/notes/filter/Meeting`} className={css.menuLink}>
                    Meeting
                </a>
            </li>
            <li className={css.menuItem}>
                <a href={`/notes/filter/Shopping`} className={css.menuLink}>
                    Shopping
                </a>
            </li>
        </ul>);
};

export default SidebarNotes;