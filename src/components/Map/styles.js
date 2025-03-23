import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100px',
  },
  mapContainer: {
    height: '85vh',
    width: '100%',
    position: 'relative',
  },
  markerContainer: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    '&:hover': { 
      zIndex: 2,
      cursor: 'pointer',
    },
  },
  pointer: {
    cursor: 'pointer',
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  typography: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));
