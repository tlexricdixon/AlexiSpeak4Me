import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

interface KeyboardWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const KeyboardWrapper: React.FC<KeyboardWrapperProps> = ({ children, backgroundColor }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor }]}
    >
      <View style={styles.inner}>{children}</View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default KeyboardWrapper;
