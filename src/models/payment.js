
export default {
  namespace: 'payment',
  state: {
    appList: [],
    appInterfaceList: [],
  },
  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
   
  },
};
