import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {PieChart, LineChart} from 'react-native-chart-kit';
import {apiRequest} from '../../utils/network';
import GlobalStyles from '../../styles/GlobalStyles';
import {AppColors} from '../../constants/AppColors';

const Dashboard = () => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const datePart = date.toISOString().split('T')[0];
    const timePart = date.toISOString().split('T')[1].split('.')[0];

    return `${datePart} ${timePart}`;
  };

  const fetchAnalysisData = async () => {
    try {
      const response = await apiRequest('POST', 'journals/analysis');
      setAnalysisData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analysis data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.appName}>WELCOME TO JORNIFY</Text>
        <Text style={GlobalStyles.labels}>Entry Frequency</Text>

        <LineChart
          data={{
            labels: analysisData.entryFrequencyData.map(
              (entry: {date: any}) => entry.date,
            ),
            datasets: [
              {
                data: analysisData.entryFrequencyData.map(
                  (entry: {entryCount: any}) => entry.entryCount,
                ),
              },
            ],
          }}
          width={360}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>
      <View style={[styles.section, {backgroundColor: '#f9f9f9'}]}>
        {' '}
        {/* Lighter background for the section */}
        <Text style={[GlobalStyles.labels, {color: '#333'}]}>
          Category Distribution
        </Text>
        <PieChart
          data={analysisData.categoryDistributionData.map((category: { categoryId: any; entryCount: any; }) => ({
            name: category.categoryId,
            population: category.entryCount,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, 
            legendFontSize: 14, 
          }))}
          width={360}
          height={220}
          chartConfig={{
           
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
            style: {
              borderRadius: 16, 
            },
          }}
          accessor="population"
          style={styles.chart}
          backgroundColor={'white'}
          paddingLeft={''}
        />
      </View>

      <View style={styles.section}>
        <Text style={GlobalStyles.labels}>Word Count Trends</Text>
        <LineChart
          data={{
            labels: analysisData.wordCountTrendsData.map(
              (entry: {date: any}) => entry.date,
            ),
            datasets: [
              {
                data: analysisData.wordCountTrendsData.map(
                  (entry: {totalWords: any}) => entry.totalWords,
                ),
              },
            ],
          }}
          width={360}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#26e6a3',
            backgroundGradientTo: '#18db8f',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>

      <View style={styles.section}>
        <Text style={GlobalStyles.labels}>Time-of-day Writing Patterns</Text>
        <LineChart
          data={{
            labels: analysisData.timeOfDayWritingPatternsData.map(
              (entry: {hour: any}) => entry.hour,
            ),
            datasets: [
              {
                data: analysisData.timeOfDayWritingPatternsData.map(
                  (entry: {entryCount: any}) => entry.entryCount,
                ),
              },
            ],
          }}
          width={360}
          height={220}
          chartConfig={{
            backgroundColor: '#ff7043',
            backgroundGradientFrom: '#ffcc80',
            backgroundGradientTo: '#ffab91',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Mood Analysis</Text>
     
        {analysisData.moodData.map((entry:any, index:any) => (
          <Text key={index}>
            Date: { formatDate(entry.date) } - Sentiment Score: {entry.sentimentScore}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,

    minWidth: '90%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 30,
    fontFamily: 'Nunito-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    color: AppColors.AppBlue,
  },
});

export default Dashboard;
