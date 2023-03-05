import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { images } from '../../helpers/image-finder';
import { formatter } from '../../helpers/money-formatter';

export const CurrenciesList = ({ isUsersList = false, currencies = [], onTrackClick, onUntrackClick, isInitialLoading }) => {
  const action = isUsersList
    ? onUntrackClick
    : onTrackClick;

  const Icon = isUsersList
    ? DeleteIcon
    : AddIcon;

  if (isInitialLoading) {
    return (
      <Stack sx={{ marginBottom: 2, gap: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={80} />
        <Skeleton variant="rectangular" width="100%" height={80} />
        <Skeleton variant="rectangular" width="100%" height={80} />
        <Skeleton variant="rectangular" width="100%" height={80} />
      </Stack>
    );
  }

  if (currencies.length === 0) {
    return (
      <Typography sx={{ marginBottom: 2 }}>No currencies to show</Typography>
    )
  }


  return (
    <List sx={{ marginBottom: 2 }}>
      {
        currencies.length > 0 && currencies.map((currency) => {
          const percentageInLast24Hours = currency.metrics.market_data.percent_change_usd_last_24_hours;
          const price = formatter.format(currency.metrics.market_data.price_usd);
          const isPositive = percentageInLast24Hours >= 0;

          return (
            <ListItem
              key={currency.id}
              sx={{ boxShadow: 2, marginBottom: 2, borderRadius: 3 }}
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
                    <Typography sx={{ fontWeight: 800 }}>{currency.name}</Typography>
                    <Typography>{price}</Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
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
  isInitialLoading: PropTypes.bool,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      metrics: PropTypes.shape({
        market_data: PropTypes.shape({
          percent_change_usd_last_24_hours: PropTypes.number.isRequired,
          price_usd: PropTypes.number.isRequired,
        }).isRequired
      }).isRequired,
    }),
  ).isRequired,
  onTrackClick: PropTypes.func.isRequired,
  onUntrackClick: PropTypes.func.isRequired,
};
