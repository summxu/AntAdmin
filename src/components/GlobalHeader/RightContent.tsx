import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import { globalMenuList } from '@/layouts/BasicLayout';
import { DataSourceItemType } from 'antd/es/auto-complete';
export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;
  const [dataScource, setDataScource] = React.useState<DataSourceItemType[]>();

  const menuFliterBox = (list: any[], value: string) => {
    var tempList: any = [];
    const menuFliter = (list: any[], value: string) => {
      let tempData: Array<any> = list
        .filter(item => {
          if (item) {
            if (!item.children.length) {
              return item.name.indexOf(value) !== -1;
            } else {
              menuFliter(item.children, value);
            }
          }
        })
        .map(item => {
          return {
            text: item.name,
            value: item.path,
          };
        });
      tempList = tempList.concat(tempData);
    };
    menuFliter(list, value);
    return tempList;
  };

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        dataSource={dataScource}
        onSearch={(value: any) => {
          /* 搜索算法：判断有无childer */
          if (value === '') return false;
          setDataScource(menuFliterBox(globalMenuList, value));
        }}
        onPressEnter={(value: any) => {
          console.log(`https://www.boomxu.com`);
        }}
      />
      <Avatar />
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
