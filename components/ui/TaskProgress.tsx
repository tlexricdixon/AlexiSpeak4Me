import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const TaskProgress: React.FC = () => {
  return (
    <View style={styles.progressSection}>
      <Text style={styles.progressText}>Task Completion: 60% Done</Text>
      <ProgressBar progress={0.6} color="#4CAF50" style={styles.progressBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressSection: { marginBottom: 20 },
  progressText: { fontSize: 14, color: '#333', marginBottom: 5 },
  progressBar: { height: 10, borderRadius: 5 },
});

export default TaskProgress;
