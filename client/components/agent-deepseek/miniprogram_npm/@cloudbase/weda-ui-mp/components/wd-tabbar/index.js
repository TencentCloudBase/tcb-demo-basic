/* eslint-disable @typescript-eslint/no-magic-numbers */
import { getWedaAPI } from '../../utils/getWedaApi';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';
import handleEvents from '../../utils/handleEvents';
import { judgeMenuPathAndCurrentPath } from '../../utils/tool';

const filterMenuData = (tabs) => {
  const res = [];
  tabs?.forEach((item) => {
    if (item.children?.length) {
      item.children = filterMenuData(item.children);
    }

    if (item.visible !== false) {
      res.push(item);
    }
  });

  return res;
};

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    id: {
      type: String,
      value: '',
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    tabs: {
      type: Object,
      value: {},
    },
    routeType: {
      type: String,
      value: 'redirectTo',
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    selectedKey: '',
    tabsData: [],
  },
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      this.init();
    },
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示，$w?.page?.id更新会慢一拍，所以加一个延迟
      // eslint-disable-next-line rulesdir/no-timer
      setTimeout(() => {
        this.init();
      }, 100);
    },
  },
  observers: {
    tabs: function (tabs) {
      const tabsData = filterMenuData(
        (tabs.isMultiTerminal ? tabs.mobileMenuData : tabs.menuData) || []
      );
      this.findSelectItem(tabsData);
      this.init(tabs);
    },
  },
  methods: {
    ...handleEvents([{ title: '点击', name: 'tap' }]),
    updateWidgetAPI() {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          tabs: this.data.tabsData,
          selectedTab: this.data.tabsData?.find?.(
            (item) => item.key === this.data.selectedKey
          ),
          setSelectTab: this.setSelectTab.bind(this),
        });
    },
    /**
     * 设置选中项
     * @param {string} key
     */
    setSelectTab(
      { key, isNavigate = true } = {},
      tabsData = this.data.tabsData,
      isInit = false
    ) {
      const selectItem = this.findSelectItem(tabsData, key);

      if (!selectItem) return;

      if (key && this.data.selectedKey !== key && !isInit) {
        this.triggerEvent('change', { tab: selectItem });
      }

      this.setData({ selectedKey: key || selectItem.key });
      this.updateWidgetAPI();

      isNavigate && this.navigateTo(selectItem);
    },
    /**
     * 根据tab项链接跳转
     * @param {*} item
     */
    navigateTo(item) {
      const { app } = getWedaAPI();
      const { $w } = app?.__internal__ || {};

      const currentPath = `/${$w?.page?.uuid || $w?.page?.id}`;
      const menuPath = `${
        item.subPackageName ? `/${item.subPackageName}` : ''
      }${item.path || ''}`;
      if (
        item?.type === 'route' &&
        item?.path &&
        (currentPath !== menuPath.split('?')[0] ||
          !judgeMenuPathAndCurrentPath(menuPath))
      ) {
        (app?.[this.properties.routeType] || app.navigateTo)?.({
          pageId: item.path.replace('/', ''),
          packageName: item.subPackageName || '',
          mode: 'weDa',
        });
      }
    },
    /**
     * 初始化tab列表和选择项
     * @param {*} tabs
     */
    init(tabs = this.properties.tabs) {
      const tabsData = filterMenuData(
        (tabs.isMultiTerminal ? tabs.mobileMenuData : tabs.menuData) || []
      );
      const selectItem = this.findSelectItem(tabsData) || {};
      this.setSelectTab({ key: selectItem.key }, tabsData, true);
      this.setData({ tabsData });
    },
    /**
     * 点击tab的某一项
     * @param {*} itemInfo
     * @returns
     */
    tabClick(itemInfo) {
      const tab = itemInfo?.currentTarget?.dataset?.tab;

      const { key, disabled } = tab;
      if (disabled || this.data.selectedKey === key) return;

      this.setData({ selectedKey: key });
      this.updateWidgetAPI();
      this.triggerEvent('change', { item: tab });
      this.navigateTo(tab);
    },
    /**
     * 查找已选中的tab项
     * @param {*} tabs
     * @param {*} selectedKey
     * @returns
     */
    findSelectItem(tabs, selectedKey) {
      const len = tabs.length;
      // 默认高亮当前路由对应的菜单
      const { app } = getWedaAPI();
      const { $w } = app?.__internal__ || {};
      const currentPath = `/${$w?.page?.uuid || $w?.page?.id}`;

      for (let i = 0; i < len; i++) {
        const menuPath = `${
          tabs[i].subPackageName ? `/${tabs[i].subPackageName}` : ''
        }${tabs[i].path}`;

        if (
          tabs[i].isSelect ||
          tabs[i].key === selectedKey ||
          (currentPath === menuPath.split('?')[0] &&
            judgeMenuPathAndCurrentPath(menuPath))
        )
          return tabs[i];
      }

      return null;
    },
  },
});
