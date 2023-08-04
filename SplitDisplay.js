import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SplitDisplay = ({ tableData, tipPercentage }) => {
  const calculateSplitAndTip = () => {
    let totalValue = 0;
    const peopleTotals = {};

    tableData.forEach((item) => {
      totalValue += item.value;
      const numOfPeople = item.tags.length;
      const itemValuePerPerson = item.value / numOfPeople;

      item.tags.forEach((person) => {
        if (!peopleTotals[person]) {
          peopleTotals[person] = 0;
        }
        peopleTotals[person] += itemValuePerPerson;
      });
    });

    const tipAmount = (totalValue * tipPercentage) / 100;
    const totalAmountWithTip = totalValue + tipAmount;

    return {
      totalValue,
      tipAmount,
      totalAmountWithTip,
      peopleTotals,
    };
  };

  const { totalValue, tipAmount, totalAmountWithTip, peopleTotals } = calculateSplitAndTip();

  // Function to format currency with ₪ symbol
  const formatCurrency = (value) => {
    return value.toLocaleString('he-IL', { style: 'currency', currency: 'ILS' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Value: {formatCurrency(totalValue)}</Text>
      <Text style={styles.label}>Tip Amount: {formatCurrency(tipAmount)}</Text>
      <Text style={styles.label}>Total Amount with Tip: {formatCurrency(totalAmountWithTip)}</Text>

      <Text style={styles.subTitle}>Split per Person:</Text>
      {Object.entries(peopleTotals).map(([person, amount]) => (
        <Text key={person} style={styles.label}>
          {person}: {formatCurrency(amount)}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default SplitDisplay;
