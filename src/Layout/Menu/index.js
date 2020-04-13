import React, {Component} from 'react'
import styles from './index.less'
import {connect} from 'dva'
import {menus, menuColors} from 'common/menu'
import {getRandomColor} from 'jssdk/utils/colorUtil'
import SearchInput from 'jssdk/components/SearchInput'
import makePy from 'jssdk/utils/pinYinUtil'

//'dm':'数据脱敏管理'
const extendApp = {'mdm': '主数据管理', 'hl7': '医疗互联互通服务', 'dm': '数据脱敏管理', 'mpi': '主索引管理'}  //存放扩展应用名称

@connect(state => Object.assign({}, {layout: state.layout}))
export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterWords: '',
            userId: window.sessionStorage.getItem('userId')
        }
    }

    getFilterMenus(filterWords, sysMenus) {
        let filterList = []
        filterWords = filterWords ? filterWords.toUpperCase().trim() : ''
        sysMenus.map(item => {
            let py = makePy(item.name)
            let flag = false
            py.map(item => {
                if (item.indexOf(filterWords) > -1) {
                    flag = true
                }
            })
            if (!flag && item.name && item.name.toUpperCase().indexOf(filterWords) > -1) {
                flag = true
            }
            flag ? filterList.push(item) : void(0)
        })
        return filterList
    }

    renderMenu(list, isApp) {
        const {menuClick, dispatch} = this.props
        return list.map((menu, index) => {
            return (
                <div style={{background: getRandomColor(index, menuColors)}}
                     key={index}
                     className={`${styles[`menu${menu.type ? menu.type : 'Short'}`]} ${styles.menu}`}
                     onClick={(e) => {
                         dispatch({
                             type: 'layout/setState',
                             payload: {isFirstRoute: '1'}
                         })
                         menuClick(e, menu)
                     }}>
                    <img src={`/framework/img/${menu.icon}.png`}/>
                    <div>{menu.name}</div>
                </div>
            )
        })
    }

    render() {
        const {num, eachPermission, layout, sysMenus,pathGroup,childShows} = this.props
        const {filterWords, userId} = this.state

        //组织扩展应用
        let appMenus = []
        let tempMenus = layout ? layout.extendAppList : []
        if (!pathGroup) {
            tempMenus.map(item => {
                let projectId = item.projectId
                if (extendApp[projectId]) {
                    appMenus.push({
                        appType: 'extend',
                        name: extendApp[projectId],
                        id: `${projectId}`,
                        icon: projectId
                    })
                }
            })
        }
        let topMenu = num ? num - 1 : num
        let topValue = topMenu * 50 + 50
        let menuList = filterWords ? this.getFilterMenus(filterWords, childShows) : childShows
        let appList = filterWords ? this.getFilterMenus(filterWords, appMenus) : appMenus
        return (
            <div className={styles.menus}
                 style={{height: document.body.clientHeight - topValue, top: topValue}}>
                <div onClick={(e) => {
                    e.nativeEvent.stopImmediatePropagation()
                    e.stopPropagation()
                }}>
                    <SearchInput onSearch={(value) => {
                        this.setState({filterWords: value})
                    }}
                                 search
                                 wrapClassName={styles.search}/>
                </div>
                <div className={styles.menuWrap}>
                    <div className={styles.leftMenuWrap}>
                        {menuList && menuList.length ? this.renderMenu(menuList) : void(0)}
                    </div>
                    {appList && appList.length ?
                        <div className={styles.rightMenuWrap}>
                            {this.renderMenu(appList, true)}
                        </div> : void(0)}
                </div>
            </div>
        )

    }
}
