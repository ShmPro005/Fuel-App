import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.msproducts.fuelApp',
  appName: 'Fuel Calculator',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // StatusBar: {
    //   backgroundColor: '#5ed1aa', // Set a default background color (replace with your preferred color)
    //   // style: 'DARK', // Options: 'LIGHT' or 'DARK'
    // },
 
    AdMob: {
      appIdAndroid: "ca-app-pub-1047405219515945~2800479571",
      // appIdIOS: "ca-app-pub-1047405219515945~6204319452",
    },
    SplashScreen: {
      launchShowDuration: 3000, // Time in milliseconds the splash screen will stay visible
      launchAutoHide: true,     // Auto hide splash screen when app is ready
      backgroundColor: '#2cccd1', // Background color for splash screen
      androidScaleType: 'CENTER_CROP', // Option for scaling splash image
      splashFullScreen: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      // fadeInDuration: 500,  // Duration for fade-in
      // fadeOutDuration: 500  // Duration for fade-out
    }
  }
  
}

export default config;
