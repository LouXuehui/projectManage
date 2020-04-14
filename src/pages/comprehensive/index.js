import React, { Component } from 'react';
import styles from './index.less';
import { Input, DatePicker, Button, Select, Table } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

class Index extends Component {
  constructor(props) {
    super(props);
    this.setate = {
      startDate: '', //开始日期
      endDate: '', //结束日期
      searchValue: '', //筛选值
      type: '', //筛选条件
    };
  }

  render() {
    const columns = [
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
      {
        key: 'remarks',
        dataIndex: 'remarks',
        title: '项目备注',
        width: '10%',
      },
    ];

    const dataSource = [{ id: '111', approvalYear: '2020', name: '哈哈哈' }];

    return (
      <div className={styles.comprehensive}>
        <div className={styles.top}>
          <div className={styles.tool}>
            <Search
              placeholder="请输入检索条件"
              style={{ width: 200 }}
              onSearch={value => this.setState({ searchValue: value })}
            />
            <RangePicker
              locale={locale}
              onChange={(data, dataString) => {
                this.setState({ statDate: dataString[0], endDate: dataString[1] });
              }}
            />
            <Select
              style={{ width: 120 }}
              placeholder="筛选条件"
              onChange={value => this.setState({ type: value })}
            >
              <Option value="1">1</Option>
              <Option value="21">21</Option>
              <Option value="31">31</Option>
              <Option value="41">41</Option>
            </Select>
          </div>
          <div className={styles.btn}>
            <Button>刷新</Button>
            <Button type="primary">排序</Button>
          </div>
        </div>
        <div className={styles.project}>
          <Table columns={columns} dataSource={dataSource} scroll={{ x: 1300 }}/>
        </div>
        <div className={styles.projectDetail}></div>
      </div>
    );
  }
}

export default Index;