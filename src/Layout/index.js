/**
 * Created by Winna on 2017/6/16.
 */
import React, {Component} from 'react'
import {Icon, LocaleProvider, Modal, notification, Popover, Tooltip} from 'antd'
import axios from 'axios'
import styles from './index.less'
import Tabs from './Tabs'
import Menu from './Menu'
import {connect} from 'dva'
import {menus, sysMenus} from 'common/menu'
import router from 'umi/router'
import {routerRedux} from 'dva/router'
import NoData from 'components/NoData'
import moment from 'moment'
import deepEqual from 'deep-equal'
import cryptico from 'cryptico'
import $ from 'jquery'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import UpdatePwdModal from './UpdatePwdModal/index'
import withRouter from 'umi/withRouter'
import {localConfigList, menuColors} from 'common/menu'

const {confirm} = Modal
const PassPhrase = "GreatPlatformSieSecret"
const Bits = 1024
const MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits)
const MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey)

class Layout extends Component {
    constructor(props) {
        const {route} = props
        const {pathGroup} = route
        super(props)
        let menuList = menus
        let sysMenusList = sysMenus
        let confDataShow = true, showFlowGroups = []
        let title = '天枢集成开发环境'
        if (pathGroup) {
            const {config} = require(`../extend/${pathGroup}/extend.js`)
            if (config) {
                const {menus: tempMenus, sysMenus: tempSysMenus, title: tempTitle, flowGroup, configureDataShow} = config
                menuList = tempMenus
                sysMenusList = tempSysMenus
                title = tempTitle
                showFlowGroups = flowGroup
                confDataShow = configureDataShow
            }
        }
        let selectedMenuId = menuList.length > 0 ? menuList[0].id : 'monitor'
        this.state = {
            visible: false,
            sysMenuShow: false,
            userId: window.sessionStorage.getItem('userId'),
            isMdmAdmin: window.sessionStorage.getItem('isMdmAdmin'),
            shows: null,
            hasLicense: null,
            expiredTrial: null,
            menus: menuList,
            sysMenusList,
            selectedMenuId,
            title,
            pathGroup,
            showFlowGroups,//展示的集成流分组
            confDataShow
        }
        document.title = title
    }

    componentDidCatch(error, info) {//异常处理
        axios.post('/frontError/insert')
    }

    componentWillMount() {
        const {dispatch} = this.props
        if (localConfigList && localConfigList.length) {
            this.props.dispatch({
                type: 'layout/queryConfig', payload: {groupId: localConfigList[0].id}
            })
        }
        this.getPermission("init")
        window.ee.on('permission', () => {
            this.getPermission()
        })
        dispatch({type: 'layout/queryLocalConfig'})
        dispatch({type: 'dataWarehouse/setState', payload: {pathGroup: this.state.pathGroup}})
        dispatch({type: 'layout/getLicense'}).then(resp => {
            this.getLicense(this.props)
        })
        //监听menuClick
        window.ee.on('menuClick', (id, name) => {
            this.menuClick(null, {id, name})
        })
        window.ee.on("clearJobVar", (jobId) => {
            axios.post('/job/clearJobVar', {jobId: jobId})
        })
    }


    componentDidMount() {
        const {dispatch, location} = this.props
        const {pathname} = location
        const {confDataShow, showFlowGroups} = this.state
        document.onclick = () => {
            this.setState({sysMenuShow: false})
        }
        dispatch({type: 'layout/setState', payload: {confDataShow, showFlowGroups}})
        if (pathname.indexOf('mdm') != -1) {
            dispatch({type: "debug/queryModel"})
        } else {
            dispatch({type: 'debug/loadData'})
        }
        dispatch({type: 'design/loadData'})
        dispatch({type: 'layout/queryNode'})
    }


    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch({
            type: 'layout/setState',
            payload: {panes: []}
        })
    }

    async componentWillReceiveProps(nextProps) {
        if (!deepEqual(nextProps.licenseInfo, this.props.licenseInfo)) {
            this.getLicense(nextProps)
        }
    }

    getLicense(props) {
        const {licenseInfo, dispatch} = props
        //许可认证
        let DecryptionResult = cryptico.decrypt(licenseInfo, MattsRSAkey)
        let secretInfo = DecryptionResult.plaintext

        //判断加密信息是否解密成功
        if (DecryptionResult.status === "success" && secretInfo) {
            //是否激活过 激活过验证数据库是否有激活标记 没有激活激活同时加入激活标记\
            let licenseList = JSON.parse(secretInfo)
            let license = licenseList.findById('sie-ide', 'projectId')
            if (license) {
                this.validate(license)
                // license.extend ? dispatch({
                //     type: 'layout/setState',
                //     payload: {extendAppList: license.extend}
                // }) : void (0)
            } else {
                this.setState({hasLicense: 'none'})
            }
        } else {
            this.setState({hasLicense: 'none'})
        }
    }

    getPermission(init) {
        const {dispatch, route} = this.props
        const {userId, menus, sysMenusList, isMdmAdmin} = this.state
        const {pathGroup} = route
        const permission = menus.concat(sysMenusList)
        const menuList = menus
        dispatch({
            type: 'permissionUser/queryPerplePermissions', payload: {id: userId}, callback: (eachPermission) => {
                let showMenu = []
                let shows = []
                eachPermission && eachPermission.length > 0 ? eachPermission.map(item => {
                    permission.map(record => {
                        if (item === record.id) {
                            showMenu.push(record)
                        }
                    })
                }) : void (0)
                //pathGroup没有值即为ide，有值表示其他功能暂不做菜单权限控制
                if (!pathGroup && userId !== 'sa') {
                    shows = menuList.filter(menu => showMenu.some(record => menu.name === record.name))
                } else if (pathGroup && pathGroup === 'mdm' && isMdmAdmin !== '1') {
                    shows = menuList.filter(items =>
                        items.name === "编辑"
                    )
                } else {
                    shows = menuList
                }
                if (shows.length > 0 && init) {
                    let first = shows[0]
                    router.push({pathname: `/${first.id}`})
                    dispatch({
                        type: 'layout/addPane',
                        payload: {
                            pane: {key: first.id, title: first.name},
                            activePaneKey: first.id
                        }
                    })
                }
                //___
                let showMenus = []
                eachPermission && eachPermission.length > 0 ? eachPermission.map(item => {
                    permission.map(pp => {
                        if (item === pp.id) {
                            showMenus.push(pp)
                        }
                    })
                }) : void (0)
                let childShows = [], b
                showMenus && userId !== 'sa' ? sysMenus.map(oneMenu => {
                    b = 0
                    showMenus.map(one => {
                        oneMenu.name === one.name ? b++ : void (0)
                    })
                    b !== 0 ? childShows.push(oneMenu) : void (0)
                }) : void (0)
                //sa 默认显示单点登录
                if (userId === 'sa') {
                    childShows = sysMenusList
                } else {
                    if (childShows.length && shows.findIndexById('system') < 0) {
                        shows.push(...menus.filter(item => item.id === 'system'))
                    }
                }
                this.setState({shows: shows, childShows})
            }
        })
    }

    menuClick(e, item) {
        const {dispatch, activePaneKey, children} = this.props
        if (item.id === 'system') {
            e.nativeEvent.stopImmediatePropagation()
            e.stopPropagation()
            this.setState({sysMenuShow: !this.state.sysMenuShow})
        } else {
            dispatch(routerRedux.push({
                pathname: `/${item.id}`,
                query: {},
            }))
            // router.push({
            //     pathname: `/${item.id}`,
            //     query: {},
            // })
            dispatch({
                type: 'layout/addPane',
                payload: {
                    pane: {key: item.id, title: item.name},
                    activePaneKey: item.id,
                    lastActivePaneKey: activePaneKey,
                    lastContent: children
                }
            })
        }
        this.setState({selectedMenuId: item.id})

        //禁用浏览器回退功能
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });

    }

    validate(license) {
        let hasLicense = false
        let expiredTrial = false
        let leftDays = 0
        let trialDays = license.trialDays
        //判断是否为试用版本
        if (trialDays === -1) {
            hasLicense = true
        } else {
            //判断是否过了试用时间
            let installDate = license.installDate
            let installMoment = moment(installDate, "YYYYMMDD")
            let expireDate = installMoment.add(trialDays, 'days')
            leftDays = expireDate.diff(moment(), 'days')
            if (leftDays < 0) {
                expiredTrial = true
            }
        }
        this.setState({hasLicense, expiredTrial, leftDays})
    }

    cancel() {
        confirm({
            title: '退出',
            content: '是否退出登录',
            maskClosable: true,
            onOk() {
                axios.post('/logout').then(res => {
                    window.sessionStorage.clear()
                    window.location.reload()
                }).catch(err =>
                    notification.error({
                        message: '注销失败!'
                    })
                )
            },
            onCancel() {
            },
            okText: '确认',
            cancelText: '取消'
        })
    }

    openHelp() {
        const {pathGroup} = this.state
        // pathGroup === 'mpi' ? window.open("/helper/extend/mpi/doc/help.html#README") :
            window.open("/helper/ide/doc/help.html#README")
    }

    clickAnyWhere() {
        $("#menuRight").hide()
    }

    updatePwd(visible) {
        this.setState({visible})
    }

    changeSelectedMenuId(selectedMenuId) {
        this.setState({selectedMenuId: selectedMenuId})
    }

    render() {
        const {personPermissions, dispatch, configDetail, configDetail1} = this.props
        const {homeImg} = configDetail1
        const {selectedMenuId, sysMenusList, sysMenuShow, shows, hasLicense, expiredTrial, userId, leftDays, visible, title, pathGroup, childShows} = this.state
        if (hasLicense === 'none') {
            return (
                <NoData>
                    <p>产品未获许可，暂不能使用，请购买此产品的正式许可。</p>
                    <p>销售咨询请联系:025-52336921</p>
                </NoData>
            )
        } else {
            return (
                <LocaleProvider locale={zhCN}>
                    <section className={styles.core} onClick={() => this.clickAnyWhere()}>
                        <div className={styles.coreLeft}>
                            <div className={styles.imgDiv}>
                                <img src={homeImg && homeImg != ' ' ? homeImg : "/framework/img/smallIcon.png"}/>
                            </div>
                            {shows ? shows.map((item, index) => {
                                return (
                                    <div key={item.id}
                                         className={`${styles.menuList} ${styles.icon} ${selectedMenuId === item.id ? styles.clicks : ''}`}
                                         onClick={(e) => {
                                             this.menuClick(e, item)
                                         }}>
                                        <img src={`/framework/img/${item.icon}.png`}/>
                                        <span>{item.name}</span>
                                    </div>
                                )
                            }) : void (0)}
                        </div>
                        <div style={{display: sysMenuShow ? 'block' : 'none'}}>
                            <Menu
                                childShows={childShows}
                                menuClick={(e, item) => {
                                    this.menuClick(e, item)
                                }}/>
                        </div>
                        {hasLicense !== null && expiredTrial !== null ? (
                            <div className={styles.coreRight}>
                                <div className={styles.coreRightTop}>
                                    <span
                                        className={styles.coreTitle}>{configDetail1.title ? configDetail1.title : `欢迎使用${title}`}</span>
                                    <div className={styles.alignCenter}>
                                        <Popover placement="bottom" title={null}
                                                 overlayClassName={styles.menu}
                                                 content={
                                                     <div className='drop-down-popover'>
                                                         <div className={styles.logout}
                                                              onClick={() => this.updatePwd(true)}>
                                                             <Icon className={styles.key} type="key"/>
                                                             <span>修改密码</span>
                                                         </div>
                                                         <div className={styles.logout} onClick={() => this.cancel()}>
                                                             <img src="/framework/img/logout.png"/>
                                                             <span>退出登录</span>
                                                         </div>
                                                     </div>
                                                 }>
                                            <div className={`${styles.alignCenter} ${styles.user}`}>
                                                <Popover placement="left"
                                                         title=""
                                                         visible={!hasLicense && !expiredTrial}
                                                         overlayClassName={styles.tips}
                                                         content={[<div>{`此产品许可将在${leftDays}天后失效，请购买此产品的正式许可。`}</div>,
                                                             <div>销售咨询请联系:025-52336921</div>]}>
                                                    <img src="/framework/img/portrait.png"/>
                                                </Popover>
                                                {window.user}
                                            </div>
                                        </Popover>
                                        <Tooltip title="帮助文档" placement="bottom">
                                            <Icon type="question-circle-o" onClick={() => this.openHelp()}
                                                  style={{cursor: 'pointer'}}/>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className={styles.coreRightBottom}>
                                    {hasLicense || !expiredTrial ? <Tabs
                                        changeSelectedMenuId={(selectedMenuId) => this.changeSelectedMenuId(selectedMenuId)}>
                                        {this.props.children}
                                    </Tabs> : (
                                        <NoData>
                                            <p>产品许可已到期，暂不能使用，请购买此产品的正式许可。</p>
                                            <p>销售咨询请联系:025-52336921</p>
                                        </NoData>
                                    )}
                                </div>
                            </div>
                        ) : ''}
                        {
                            visible ? <UpdatePwdModal visible={visible}
                                                      changeVisible={() => this.updatePwd(false)}
                                                      updatePwd={(values) =>
                                                          dispatch({
                                                              type: 'layout/updatePwd',
                                                              payload: {...values, userId}
                                                          })}/> : void (0)
                        }
                    </section>
                </LocaleProvider>
            )
        }
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.layout, state.permissionUser, {loading: state.loading.models.layout})
}


export default withRouter(connect(mapStateToProps)(Layout))
