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
  const format
