/**
 * Created by Winna on 8/6/18.
 */
import React, {Component} from 'react'
import {connect} from 'dva'
import styles from './style.less'
import {Form, Modal, Input} from 'antd'
import axios from 'axios'

const {Item: FormItem} = Form

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.resetFields()
  }

  resetFields() {
    this.props.form.resetFields()
  }

  updatePwd(e) {
    e.preventDefault()
    const {form, updatePwd, changeVisible} = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        updatePwd({userId: window.sessionStorage.getItem("userId"), password: values.password})
        changeVisible()
      }
    })
  }

  checkPwd(value, callback) {
    if (value) {
      axios.post('/verifyPassword', {
        userId: window.sessionStorage.getItem("userId"),
        password: value
      }).then(response => {
        let {data} = response
        if (data.code === 1) {
          if (data.payload === "1") {
            callback()
          } else {
            callback("输入密码不正确")
          }
        } else {
          callback("调用验证失败")
        }
      })
    } else {
      callback()
    }
  }


  checkNewPwd(value, callback) {
    const {getFieldValue} = this.props.form
    if (value && value !== getFieldValue('password')) {
      callback('请保持一致密码')
    } else {
      callback()
    }
  }

  render() {
    const {form, visible, changeVisible} = this.props
    const {getFieldDecorator} = form
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    }
    return (
      <Modal className={styles.updatePwd}
             wrapClassName="vertical-center-modal"
             title="修改密码"
             visible={visible}
             onOk={(e) => this.updatePwd(e)}
             onCancel={() => changeVisible()}>
        <div className={styles.body}>
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label="原密码">
              {getFieldDecorator('oldPwd', {
                rules: [{
                  required: true, message: '原密码不能为空',
                }, {validator: (rule, value, callback) => this.checkPwd(value, callback)}],
                initialValue: name,
              })(
                <Input type="password"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新密码">
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '新密码不能为空'
                }],
                initialValue: name,
              })(
                <Input type="password"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认新密码">
              {getFieldDecorator('confirmPwd', {
                rules: [{
                  required: true, message: '确认新密码不能为空',
                }, {validator: (rule, value, callback) => this.checkNewPwd(value, callback)}],
                initialValue: name,
              })(
                <Input type="password"/>
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}

Index = Form.create()(Index)

export default Index
