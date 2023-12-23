import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SidebarSearchBar.module.css';

export default function SidebarSearchBar() {
  return (
    <Box className={styles['search-bar']}>
      <input
        className={styles['search-bar__input']}
        type='text'
        placeholder='Search Contact'
      />
      <IconButton className={styles['search-bar__button']}>
        <SearchIcon fontSize='medium' />
      </IconButton>
    </Box>
  );
}
