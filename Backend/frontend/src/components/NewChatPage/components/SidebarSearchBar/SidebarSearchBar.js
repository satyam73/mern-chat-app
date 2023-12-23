import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SidebarSearchBar.module.css';

export default function SidebarSearchBar({ onSearchInput }) {
  return (
    <Box className={styles['search-bar']}>
      <input
        className={styles['search-bar__input']}
        type='text'
        placeholder='Search Contact'
        // value={searchInput}
        onInput={onSearchInput}
      />
      <IconButton className={styles['search-bar__button']}>
        <SearchIcon fontSize='medium' />
      </IconButton>
    </Box>
  );
}
