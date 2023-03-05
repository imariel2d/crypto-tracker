import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
// import Box from '@mui/material/Image';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// import FolderIcon from '@mui/icons-material/Folder';


import { images } from '../../helpers/image-finder';

export const CurrenciesList = ({ isUsersList = false, currencies, onTrackClick, onUntrackClick }) => {
  const action = isUsersList
    ? onUntrackClick
    : onTrackClick;

  const Icon = isUsersList
    ? DeleteIcon
    : AddIcon;

  if (currencies.length === 0) {
    return (
      <p>No currencies to show</p>
    )
  }

  return (
    <List>
      {
        currencies.length > 0 && currencies.map((currency) => {
          const percentageInLast24Hours = currency.metrics.market_data.percent_change_usd_last_24_hours;
          const isPositive = percentageInLast24Hours >= 0;

          return (
            <ListItem
              key={currency.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => action(currency)}>
                  <Icon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={images.get(currency.symbol)} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box>
                    <Typography>{currency.name}</Typography>
                    <Typography
                      style={{
                        color: isPositive ? 'green' : 'red',
                      }}
                    >
                      {percentageInLast24Hours.toString().slice(0, 8)}%
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          )
        })
      }
    </List>
  );
};

CurrenciesList.propTypes = {
  isUsersList: PropTypes.bool,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      metrics: PropTypes.shape({
        market_data: PropTypes.shape({
          percent_change_usd_last_24_hours: PropTypes.number.isRequired
        }).isRequired
      }).isRequired,
    }),
  ).isRequired,
  onTrackClick: PropTypes.func.isRequired,
  onUntrackClick: PropTypes.func.isRequired,
};
