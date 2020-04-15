import * as services from '../services/project.js';

export default {
  namespace: 'approval',
  state: {
    approvalList: [],
    selectedApproval: {},
  },
  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    *getApprovalList({ payload }, { call, put }) {
      const { data } = yield call(services.getApprovalList);
      yield put({ type: 'setState', payload: { approvalList: data } });
    },
    *getApprovalById({ payload }, { call, put }) {
      console.log(payload, 'payload2222');

      const { data } = yield call(services.getApprovalById, payload);
      yield put({ type: 'setState', payload: { selectedApproval: data } });
    },
  },
};
