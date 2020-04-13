import React, {Component} from 'react'
import {Tabs, Icon} from 'antd'
import styles from './index.less'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'

const {TabPane} = Tabs

/**
 * <p>
 * Title :
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Author :llb 2018/1/16
 * </p>
 * <p>
 * Department :
 * </p>
 * Copyright : ©江苏汇鑫融智软件科技有限公司 </p>
 */

@connect(state => Object.assign({}, state.layout, state.dataSource, {design: state.design}, {loading: state.loading.models.layout}))
export default class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clientHeight: document.body.clientHeight
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({clientHeight: document.body.clientHeight})
        }) //监听窗口大小改变
    }

    onEdit(targetKey, action) {
        this[action](targetKey)
    }

    onChange(activePaneKey) {
        const {activePaneKey: lastActivePaneKey, dispatch, children, design} = this.props
        dispatch(routerRedux.push({
            pathname: `/${activePaneKey}`,
            query: {},
        }))
        dispatch({
            type: 'layout/updatePane',
            payload: {
                lastActivePaneKey,
                lastContent: children,
                activePaneKey
            }
        })

        if (design.selectedIf.type === 'child') {
            dispatch({
                type: 'design/setState',
                payload: {
                    selectedGroup: {},
                    selectedIf: design.selectedIf,
                    selectedIfId: design.selectedIf.id
                }
            })
            // if (design.selectedIf.parentId !== 'manage') {
            //     dispatch({type: 'design/queryIfContent'})
            // }
            // dispatch({type: 'design/queryIfLog'})
            // this.changeBackgroundColor(selectedTab)
        }
    }

    remove(targetKey) {
        let {activePaneKey, dispatch} = this.props
        let lastIndex
        this.props.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1
            }
        })
        const panes = this.props.panes.filter(pane => pane.key !== targetKey)
        if (lastIndex >= 0 && activePaneKey === targetKey) {
            activePaneKey = panes[lastIndex].key
        }
        dispatch(routerRedux.push({
            pathname: `/${activePaneKey}`,
            query: {},
        }))
        dispatch({type: 'layout/setState', payload: {panes, activePaneKey}})
    }

    render() {
        const {clientHeight} = this.state
        const {activePaneKey, isNewPane, panes} = this.props
        return (
            <div className={'tabs'}>
                <style>
                    {`.tabs>.ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane{
            height:${clientHeight - 100}px;
          }`}
                </style>
                {panes && panes.length > 0 ? <Tabs
                    hideAdd
                    onChange={::this.onChange}
                    activeKey={activePaneKey}
                    type="editable-card"
                    onEdit={::this.onEdit}>
                    {panes.map(pane => <TabPane forceRender={pane.key === "design"}
                                                tab={<span><Icon type="appstore-o"/>{pane.title}</span>} key={pane.key}>
                        {activePaneKey === pane.key && isNewPane ? this.props.children : pane.content}
                    </TabPane>)}
                </Tabs> : ''}
            </div>
        )
    }
}
