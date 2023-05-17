import React, { useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { interval, from } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import QuotesStore from '../store/QuotesStore';
import { getColorForValueChange } from '../utils';

const QuotesScreen = observer(() => {
  useEffect(() => {
    const subscription = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => from(QuotesStore.fetchQuotes())),
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  if (QuotesStore.loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.bold]}>Ticker</Text>
        <Text style={[styles.cell, styles.bold]}>Last</Text>
        <Text style={[styles.cell, styles.bold]}>Highest Bid</Text>
        <Text style={[styles.cell, styles.bold]}>Percent Change</Text>
      </View>
      {QuotesStore.error && (
        <View style={styles.errorRow}>
          <Text style={styles.errorCell}>{QuotesStore.error}</Text>
        </View>
      )}
      <ScrollView>
        {Object.entries(QuotesStore.quotes).map(
          ([ticker, { last, highestBid, percentChange }]) => (
            <View style={styles.row} key={ticker}>
              <Text style={styles.cell}>{ticker}</Text>
              <Text
                style={[
                  styles.cell,
                  {
                    color: getColorForValueChange(
                      Number(last),
                      QuotesStore.previousQuotes[ticker]?.last
                        ? Number(QuotesStore.previousQuotes[ticker].last)
                        : undefined,
                    ),
                  },
                ]}
              >
                {numberFormatter.format(Number(last))}
              </Text>
              <Text
                style={[
                  styles.cell,
                  {
                    color: getColorForValueChange(
                      Number(highestBid),
                      QuotesStore.previousQuotes[ticker]?.highestBid
                        ? Number(QuotesStore.previousQuotes[ticker].highestBid)
                        : undefined,
                    ),
                  },
                ]}
              >
                {numberFormatter.format(Number(highestBid))}
              </Text>
              <Text
                style={[
                  styles.cell,
                  {
                    color: getColorForValueChange(
                      Number(percentChange),
                      QuotesStore.previousQuotes[ticker]?.percentChange
                        ? Number(
                            QuotesStore.previousQuotes[ticker].percentChange,
                          )
                        : undefined,
                    ),
                  },
                ]}
              >
                {(Number(percentChange) * 100).toFixed(2) + '%'}
              </Text>
            </View>
          ),
        )}
      </ScrollView>
    </View>
  );
});

export default QuotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  errorRow: {
    backgroundColor: 'red',
  },
  errorCell: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
});
