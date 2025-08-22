import { safeScale } from "@/src/utils/safeScale";
import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  //BigLoading
  container_Big: {
    display: 'flex',
    alignItems: 'center',
    padding: safeScale(16),
    marginHorizontal: 'auto',
    marginBottom: safeScale(16),
    textAlign: 'center', 
    borderRadius: safeScale(8),
    backgroundColor: '#1F2937',
    maxWidth: 9999,
  },
  //Loading
  constainer_Loading:{
    width: safeScale(80), 
    height: safeScale(24), 
    position: 'relative'
  },
  AnimatedStyle:{
    width: safeScale(13), 
    height: safeScale(13), 
    backgroundColor: 'white', 
    borderRadius: safeScale(7), // Changed from 13/2 to 7 to avoid division
    position: 'absolute', 
    top: '15%'
  },
  //PageLoading
  container_PageLoading: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0, // Changed from moderateScale(0, 0.1) to 0
    left: 0, // Changed from moderateScale(0, 0.1) to 0
    zIndex: safeScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  }
});
