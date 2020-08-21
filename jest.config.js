module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@expo|expo-font|@unimodules/.*|unimodules|expo-asset|expo(nent)?|scheduler)',
  ],
}
