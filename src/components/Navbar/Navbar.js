import React, { useContext, useEffect } from 'react'
import './Navbar.css'
import SessionContainer from '../SessionContainer/SessionContainer.js';
import { SessionContext } from '../../context/SessionContext';
import ImageUploadModal from '../ImageUploadModal/ImageUploadModal';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Search = styled('div')(({ theme }) => ({
  
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'lightgrey',
  '&:hover': {
    backgroundColor: 'lightgrey',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function Navbar() {

  const {localUser} = useContext(SessionContext)

  useEffect(()=> {

  }, [localUser])

  return (

    <div className="navbar">

      <Link to='/'> <img className="titleImg" src='instagram.png' alt="Instagram" /> </Link>

      <Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
      </Box>

      <div className='rightNavbar'>

        <Link to='/'> 
          < HomeIcon fontSize="large" style={{ color: 'black' }} />
        </Link>
        
        {/* addIcon */}
        { 
          localUser && <ImageUploadModal username={localUser.displayName} />
        }

        < SendIcon  fontSize="large"/>
        
        < FavoriteBorderIcon fontSize="large"/>

        < SessionContainer />
        
      </div>
      
    </div>
    
  )
}

export default Navbar