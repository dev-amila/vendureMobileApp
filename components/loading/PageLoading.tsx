import { View } from 'react-native'

import BigLoading from './BigLoading'
import styles from '@/components/styles/LoadingStyles';

export default function PageLoading() {
  return (
    <View style={styles.container_PageLoading}>
      <BigLoading />
    </View>
  )
}
