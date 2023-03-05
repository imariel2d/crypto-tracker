import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import RefreshIcon from '@mui/icons-material/Refresh';

import { CurrenciesList } from './components/currencies-list';

import { useCurrencies  } from './hooks/useCurrencies';

function App() {
  const { currencies, refetch, isInitialLoading } = useCurrencies();
  const [trackerCurrencies, setTrackedCurrencies] = useState(new Map());

  const updateLocalStorage = (updatedTrackedCurrencies) => {
    localStorage.setItem('trackedCurrencies', JSON.stringify(Array.from(updatedTrackedCurrencies)));
  }

  const onTrackClick = (currency) => {
    if (trackerCurrencies.get(currency.name)) {
      return;
    }

   const updatedTrackedCurrencies = new Map(trackerCurrencies.set(currency.name, true));

    updateLocalStorage(updatedTrackedCurrencies);
    setTrackedCurrencies(updatedTrackedCurrencies);
  };

  const onUntrackClick = (currency) => {
    const updatedTrackedCurrencies = new Map(trackerCurrencies.set(currency.name, false));

    updateLocalStorage(updatedTrackedCurrencies);

    setTrackedCurrencies(new Map(trackerCurrencies.set(currency.name, false)));
  };

  const updatedCurrencies = useMemo(() => {
    return currencies.filter((currency) => !trackerCurrencies.get(currency.name));
  }, [currencies, trackerCurrencies]);

  const updatedTrackedCurrencies = useMemo(() => {
    return currencies.filter((currency) => trackerCurrencies.get(currency.name));
  }, [currencies, trackerCurrencies]);

  useEffect(() => {
    try {
      setTrackedCurrencies(new Map(JSON.parse(localStorage.getItem('trackedCurrencies'))));
    } catch(e) {
      setTrackedCurrencies(new Map());
    }
  }, []);

  return (
    <Box sx={{ padding: 2, textAlign: 'center', margin: 'auto', maxWidth: 1280 }}>
      <Typography sx={{ marginBottom: 4 }} variant="h2" component="h1">
        Crypto Tracker
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: 4 }}>
        <Button
          onClick={refetch}
          variant="contained"
          startIcon={<RefreshIcon />}>
          Refresh
        </Button>
      </Box>
      <Typography variant="h6" component="h2">
        My currencies
      </Typography>
      <CurrenciesList
        onTrackClick={onTrackClick}
        onUntrackClick={onUntrackClick}
        isUsersList={true}
        isInitialLoading={isInitialLoading}
        currencies={updatedTrackedCurrencies}
      />
      <Typography variant="h6" component="h2">
        Currencies
      </Typography>
      <CurrenciesList
        onTrackClick={onTrackClick}
        onUntrackClick={onUntrackClick}
        isUsersList={false}
        isInitialLoading={isInitialLoading}
        currencies={updatedCurrencies}
      />
    </Box>
  );
}

export default App;
