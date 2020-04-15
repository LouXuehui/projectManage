export const defaultColumns = [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'ID',
    width: '10%',
  },
  {
    key: 'approvalYear',
    dataIndex: 'approvalYear',
    title: '立项年度',
    width: '8%',
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: '项目名称',
    width: '10%',
  },
  {
    key: 'leader',
    dataIndex: 'leader',
    title: '项目负责人',
    width: '9%',
  },
  {
    key: 'assist',
    dataIndex: 'assist',
    title: '协助负责人',
    width: '9%',
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: '项目类别',
    width: '8%',
  },
  {
    key: 'dept',
    dataIndex: 'dept',
    title: '申请部门',
    width: '8%',
  },
  {
    key: 'approvalDate',
    dataIndex: 'approvalDate',
    title: '立项时间',
    width: '10%',
  },
  {
    key: 'budgetAmount',
    dataIndex: 'budgetAmount',
    title: '预算金额',
    width: '8%',
  },
  {
    key: 'etc',
    dataIndex: 'etc',
    title: '预计完成时间',
    width: '8%',
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    width: '5%',
  },
];

export const tabList = [
  {
    id: 'contract',
    name: '项目合同',
    columns: [
      ...defaultColumns,
      {
        key: 'enter',
        dataIndex: 'enter',
        title: '录入人',
        width: '10%',
      },
    ],
  },
  {
    id: 'payment',
    name: '付款情况',
    columns: [
      ...defaultColumns,
      {
        key: 'enter',
        dataIndex: 'enter',
        title: '录入人',
        width: '10%',
      },
    ],
  },
  {
    id: 'enclosure',
    name: '合同附件',
    columns: [
      ...defaultColumns,
      {
        key: 'enter',
        dataIndex: 'enter',
        title: '录入人',
        width: '10%',
      },
    ],
  },
  {
    id: 'plan',
    name: '项目活动',
    columns: [
      ...defaultColumns,
      {
        key: 'enter',
        dataIndex: 'enter',
        title: '录入人',
        width: '10%',
      },
    ],
  },
  {
    id: 'tender',
    name: '招标情况',
    columns: [
      ...defaultColumns,
      {
        key: 'enter',
        dataIndex: 'enter',
        title: '录入人',
        width: '10%',
      },
    ],
  },
  {
    id: 'bid',
    name: '投标情况',
    columns: [
      ...defaultColumns,
      {
        key: 'enter',
        dataIndex: 'enter',
        title: '录入人',
        width: '10%',
      },
    ],
  },
];

export const paymentColumns = [
  {
    key: 'payId',
    dataIndex: 'payId',
    title: '支付ID',
    width: '10%',
  },
  {
    key: 'pay',
    dataIndex: 'pay',
    title: '支付',
    width: '10%',
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: '合同名称',
    width: '10%',
  },
  {
    key: 'payName',
    dataIndex: 'payName',
    title: '付款名称',
    width: '10%',
  },
  {
    key: 'payman',
    dataIndex: 'payman',
    title: '付款人',
    width: '10%',
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: '项目类别',
    width: '10%',
  },
  {
    key: 'dept',
    dataIndex: 'dept',
    title: '申请部门',
    width: '10%',
  },
  {
    key: 'date',
    dataIndex: 'date',
    title: '立项时间',
    width: '10%',
  },
  {
    key: 'money',
    dataIndex: 'money',
    title: '预算金额',
    width: '10%',
  },
  {
    key: 'endDate',
    dataIndex: 'endDate',
    title: '预计完成时间',
    width: '10%',
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    width: '10%',
  },
  {
    key: 'payType',
    dataIndex: 'payType',
    title: '支付途径',
    width: '10%'
  },
]

export const invoiceRegisterColumns = [
  {
    key: 'payId',
    dataIndex: 'payId',
    title: '发票ID',
    width: '10%',
  },
  {
    key: 'pay',
    dataIndex: 'pay',
    title: '发票号码',
    width: '10%',
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: '发票名称',
    width: '10%',
  },
  {
    key: 'payName',
    dataIndex: 'payName',
    title: '项目负责人',
    width: '10%',
  },
  {
    key: 'payman',
    dataIndex: 'payman',
    title: '协助负责人',
    width: '10%',
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: '项目类别',
    width: '10%',
  },
  {
    key: 'dept',
    dataIndex: 'dept',
    title: '申请部门',
    width: '10%',
  },
  {
    key: 'date',
    dataIndex: 'date',
    title: '立项时间',
    width: '10%',
  },
  {
    key: 'money',
    dataIndex: 'money',
    title: '预算金额',
    width: '10%',
  },
  {
    key: 'endDate',
    dataIndex: 'endDate',
    title: '预计完成时间',
    width: '10%',
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    width: '10%',
  }
]

