import { useState, useMemo } from 'react';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import RefreshIcon from '@mui/icons-material/Refresh';

import { CurrenciesList } from './components/currencies-list';

import { useCurrencies  } from './hooks/useCurrencies';

function App() {
  const { currencies, refetch } = useCurrencies();
  const [trackerCurrencies, setTrackedCurrencies] = useState(new Map());

  const onTrackClick = (currency) => {
    if (trackerCurrencies.get(currency.name)) {
      return;
    }

    setTrackedCurrencies(new Map(trackerCurrencies.set(currency.name, true)));
  };

  const onUntrackClick = (currency) => {
    setTrackedCurrencies(new Map(trackerCurrencies.set(currency.name, false)));
  };

  const updatedCurrencies = useMemo(() => {
    return currencies.filter((currency) => !trackerCurrencies.get(currency.name));
  }, [currencies, trackerCurrencies]);

  const updatedTrackedCurrencies = useMemo(() => {
    return currencies.filter((currency) => trackerCurrencies.get(currency.name));
  }, [currencies, trackerCurrencies]);

  return (
    <div className="App">
      <Typography variant="h2" component="h1">
        Crypto Tracker
      </Typography>
      <Button
        onClick={refetch}
        variant="contained"
        startIcon={<RefreshIcon />}>
        Refresh
      </Button>
      <Typography variant="h3" component="h2">
        My currencies
      </Typography>
      <CurrenciesList
        onTrackClick={onTrackClick}
        onUntrackClick={onUntrackClick}
        isUsersList={true}
        currencies={updatedTrackedCurrencies}
      />
      <Typography variant="h3" component="h2">
        Currencies
      </Typography>
      <CurrenciesList
        onTrackClick={onTrackClick}
        onUntrackClick={onUntrackClick}
        isUsersList={false}
        currencies={updatedCurrencies}
      />
    </div>
  );
}

export default App;
