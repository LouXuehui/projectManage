import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Input, Button, Table } from 'antd';
import { paymentColumns, invoiceRegisterColumns } from 'common/array.js';
import Operation from 'components/Operation';
const { Search } = Input;

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '', //筛选值
      dataSource: [
        { payId: '1', pay: '2020', name: '哈哈哈' },
        { payId: '2', pay: '2020', name: '哈哈哈' },
        { payId: '3', pay: '2020', name: '哈哈哈' },
        { payId: '4', pay: '2020', name: '哈哈哈' },
        { payId: '5', pay: '2020', name: '哈哈哈' },
        { payId: '6', pay: '2020', name: '哈哈哈' },
        { payId: '7', pay: '2020', name: '哈哈哈' },
      ],
      projectHeight: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'approval/getApprovalList' });
    let projectDom = document.getElementById('project');
    let projectHeight = projectDom ? projectDom.clientHeight : '';
    this.setState({ projectHeight });
  }

  //刷新
  refresh() {
    const { searchValue } = this.state;
    console.log('刷新', searchValue);
  }

  //新增
  add() {
    console.log('新增');
  }

  //编辑
  update(record) {
    console.log(11111111);

    this.props.dispatch({ type: 'approval/getApprovalById', payload: { id: 113 } });
  }

  //删除
  delete(record) {}

  render() {
    const { dataSource, projectHeight } = this.state;
    const columns = [
      ...invoiceRegisterColumns,
      {
        key: 'action',
        dataIndex: 'action',
        title: '操作',
        width: '10%',
        fixed: 'right',
        render: (text, record, index) => (
          <div className="operation">
            <Operation name="编辑" addDivider onClick={() => this.update(record)} />
            <Operation name="删除" onClick={() => this.detele(record)} />
          </div>
        ),
      },
    ];
    return (
      <div className={styles.payment}>
        <div className={styles.top}>
          <div className={styles.tool}>
            <Search
              placeholder="请输入检索条件"
              style={{ width: 200 }}
              onSearch={value => this.setState({ searchValue: value })}
            />
          </div>
          <div className={styles.btn}>
            <Button onClick={() => this.refresh()}>刷新</Button>
            <Button type="primary" onClick={() => this.add()}>
              新增
            </Button>
          </div>
        </div>
        <div id="project" className={styles.project}>
          <div className={styles.projectContent}>
            <Table
              columns={paymentColumns}
              dataSource={dataSource}
              scroll={{ y: projectHeight ? projectHeight / 2 - 43 : 0 }}
              pagination={false}
              scrollToFirstRowOnChange={true}
            />
          </div>
          <div className={styles.invoiceRegister}>
            <div className={styles.registerTop}>
              <div className={styles.registerTitle}>
                <span>发票登记</span>
              </div>
              <div className={styles.btn}>
                <Button onClick={() => this.refresh()}>重新检索</Button>
                <Button type="primary" onClick={() => this.add()}>
                  新增发票
                </Button>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={dataSource}
              scroll={{ y: projectHeight ? projectHeight / 2 - 120 : 0 }}
              pagination={false}
              scrollToFirstRowOnChange={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state =>
  Object.assign({}, state.approval, { loading: state.loading.models.approval }),
)(Payment);
