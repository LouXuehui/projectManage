import React, { Component } from 'react';
import styles from './index.less';
import { Input, DatePicker, Button, Select, Table, Tabs } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { defaultColumns, tabList } from 'common/array.js';

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '', //开始日期
      endDate: '', //结束日期
      searchValue: '', //筛选值
      type: '', //筛选条件
      activeKey: 'contract', //tab页
      dataSource: [
        { id: '1', approvalYear: '2020', name: '哈哈哈' },
        { id: '2', approvalYear: '2020', name: '哈哈哈' },
        { id: '3', approvalYear: '2020', name: '哈哈哈' },
        { id: '4', approvalYear: '2020', name: '哈哈哈' },
        { id: '5', approvalYear: '2020', name: '哈哈哈' },
        { id: '6', approvalYear: '2020', name: '哈哈哈' },
        { id: '7', approvalYear: '2020', name: '哈哈哈' },
        { id: '8', approvalYear: '2020', name: '哈哈哈' },
        // { id: '11', approvalYear: '2020', name: '哈哈哈' },
        // { id: '21', approvalYear: '2020', name: '哈哈哈' },
        // { id: '31', approvalYear: '2020', name: '哈哈哈' },
        // { id: '41', approvalYear: '2020', name: '哈哈哈' },
        // { id: '51', approvalYear: '2020', name: '哈哈哈' },
        // { id: '61', approvalYear: '2020', name: '哈哈哈' },
        // { id: '71', approvalYear: '2020', name: '哈哈哈' },
        // { id: '81', approvalYear: '2020', name: '哈哈哈' },
      ],
      projectHeight: '',
    };
  }

  componentDidMount() {
    let projectDom = document.getElementById('project');
    let projectHeight = projectDom ? projectDom.clientHeight : '';
    this.setState({ projectHeight });
  }

  //刷新
  refresh() {
    const { startDate, endDate, searchValue, type } = this.state;
    console.log('刷新', startDate, endDate, searchValue, type);
  }

  //排序
  sort() {
    const { startDate, endDate, searchValue, type } = this.state;
    console.log('排序', startDate, endDate, searchValue, type);
  }

  render() {
    const { dataSource, projectHeight, activeKey } = this.state;
    const columns = [
      ...defaultColumns,
      {
        key: 'remarks',
        dataIndex: 'remarks',
        title: '项目备注',
        width: '10%',
      },
    ];

    console.log(activeKey, 'activeKey');

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
            <Button onClick={() => this.refresh()}>刷新</Button>
            <Button type="primary" onClick={() => this.sort()}>
              排序
            </Button>
          </div>
        </div>
        <div id="project" className={styles.project}>
          <div className={styles.projectContent}>
            <Table
              id={'111'}
              columns={columns}
              dataSource={dataSource}
              scroll={{ y: projectHeight ? projectHeight / 2 - 43 : 0 }}
              pagination={false}
              scrollToFirstRowOnChange={true}
            />
          </div>
          <div className={styles.projectDetail}>
            <Tabs activeKey={activeKey} onChange={key => this.setState({ activeKey: key })}>
              {tabList.map(tab => {
                return (
                  <TabPane tab={tab.name} key={tab.id}>
                    <Table
                      columns={tab.columns}
                      dataSource={dataSource}
                      scroll={{ y: projectHeight ? projectHeight / 2 - 120 : 0 }}
                      pagination={false}
                      scrollToFirstRowOnChange={true}
                    />
                  </TabPane>
                );
              })}
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
