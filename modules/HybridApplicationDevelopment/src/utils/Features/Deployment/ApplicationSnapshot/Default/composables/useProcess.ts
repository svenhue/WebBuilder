export const useProcess = () => {
    return {
        isServer: process.server == true,
    }
  }