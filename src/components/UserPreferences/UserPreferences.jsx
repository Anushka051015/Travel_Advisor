import React from 'react';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
} from '@material-ui/core';
import useStyles from './styles';

const UserPreferences = ({ preferences, setPreferences }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setPreferences({ ...preferences, [event.target.name]: event.target.value });
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.title}>Your Preferences</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Budget Range</InputLabel>
        <Select
          name="budget"
          value={preferences.budget}
          onChange={handleChange}
        >
          <MenuItem value="all">Any Budget</MenuItem>
          <MenuItem value="low">Budget-Friendly</MenuItem>
          <MenuItem value="medium">Mid-Range</MenuItem>
          <MenuItem value="high">Luxury</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Cuisine Type</InputLabel>
        <Select
          name="cuisine"
          value={preferences.cuisine}
          onChange={handleChange}
        >
          <MenuItem value="all">All Cuisines</MenuItem>
          <MenuItem value="indian">Indian</MenuItem>
          <MenuItem value="chinese">Chinese</MenuItem>
          <MenuItem value="italian">Italian</MenuItem>
        </Select>
      </FormControl>

      <Box className={classes.switchLabel}>
        <FormControlLabel
          control={(
            <Switch
              checked={preferences.accessibility}
              onChange={(e) => setPreferences({ ...preferences, accessibility: e.target.checked })}
              name="accessibility"
              color="primary"
            />
          )}
          label="Wheelchair Accessible"
        />
      </Box>
    </Paper>
  );
};

export default UserPreferences;
