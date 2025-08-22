import { safeScale } from '@/src/utils/safeScale';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Icons from './icons/icons';

interface BoxLinkProps {
  children: React.ReactNode;
  path: string;
  name: string;
  style?: ViewStyle;
//   navigation: any;
}

const BoxLink: React.FC<BoxLinkProps> = ({ children, name, style, path }) => {
  return (
      <TouchableOpacity style={[styles.container, style]} onPress={() => 
    //   navigation.navigate(path)
    {}
      }>
        {children} 
        <Text style={styles.name}>{name}</Text> 
        <Icons.MaterialIcons name="keyboard-arrow-right" size={safeScale(24)} style={styles.icon} />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: safeScale(13),
    paddingHorizontal: safeScale(16),
    borderBottomWidth: safeScale(1),
    borderBottomColor: '#ccc',
  },
  name: {
    flex: 1,
    marginLeft: safeScale(40),
    marginTop: safeScale(-24),
    fontSize: safeScale(17),
    color: '#333',
  },
  icon: {
    flex: 1,
    color: '#333',
    textAlign: 'right',
    marginTop: safeScale(-24),
  },
});

export default BoxLink;
