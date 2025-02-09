import { getWedaAPI } from '../../utils/getWedaApi';
import { commonCompBehavior } from '../../utils/common-behavior';
import { WD_PREFIX } from '../../utils/constant';
import eventBus from '../wd-menu-layout/utils/index';
import { getQuery, judgeMenuPathAndCurrentPath } from '../../utils/tool';

const filterMenuData = (menu) => {
  const res = [];
  menu?.forEach((item) => {
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
    multipleSlots: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    menu: {
      type: Object,
      value: {},
    },
    defaultOpened: {
      type: Boolean,
      value: true,
    },
    selectedMenuKey: {
      type: String,
      value: '',
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    selectedKey: '',
    menuData: [],
  },
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      this.init();
      this.properties.selectedMenuKey &&
        this.setData({ selectedKey: this.properties.selectedMenuKey });
    },
  },
  observers: {
    'menu,defaultOpened': function (menu, defaultOpened) {
      const menuData = filterMenuData(
        (menu.isMultiTerminal ? menu.mobileMenuData : menu.menuData) || []
      );
      this.findSelectItem(menuData);
      this.init(menu, defaultOpened);
    },
    selectedMenuKey: function (selectedMenuKey) {
      selectedMenuKey && this.setData({ selectedKey: selectedMenuKey });
    },
  },
  methods: {
    updateWidgetAPI() {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          setSelectedInfo: this.setSelectedInfo,
        });
    },
    /**
     * 设置选中菜单项
     * @param {*} params
     */
    setSelectedInfo({ params, isNavigate = false } = {}) {
      const { key, item } = params || {};
      let selectItem = item;
      if (key || !item) {
        const menuData =
          (this.data.isMultiTerminal
            ? this.data.mobileMenuData
            : this.data.menuData) || [];
        selectItem = this.findSelectItem(menuData, key) || {};
      }
      if (!selectItem) return;
      this.setData({ selectedKey: selectItem?.key });
      isNavigate && this.navigateTo(selectItem);
    },
    /**
     * 根据菜单项链接跳转
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
        app.navigateTo({
          pageId: item.path.replace('/', '')?.split('?')?.[0],
          packageName: item.subPackageName || '',
          mode: 'weDa',
          params: getQuery(item.path),
        });
      }
    },
    /**
     * 初始化菜单列表和选择项
     * @param {*} menu
     */
    init(menu = this.data.menu, defaultOpened = this.properties.defaultOpened) {
      const menuData = filterMenuData(
        (menu.isMultiTerminal ? menu.mobileMenuData : menu.menuData) || []
      );
      const selectItem = this.findSelectItem(menuData) || {};
      this.setSelectedInfo({ params: { item: selectItem } });
      this.setData({
        menuData: this.generateMenuData({
          menuData,
          menuItem: selectItem,
          init: true,
          defaultOpened,
        }),
      });
    },
    /**
     * 判断菜单是否展开
     * @param {*} menu
     * @param {*} selectedkey
     * @returns
     */
    hasSelectedMenu(menu, selectedkey) {
      let opened = false;
      if (menu.key === selectedkey) {
        return true;
      }
      menu?.children?.forEach((i) => {
        if (i.key === selectedkey) {
          opened = true;
        }
        if (i?.children?.length) {
          opened = this.hasSelectedMenu(i, selectedkey);
        }
      });
      return opened;
    },
    /**
     * 处理待显示的菜单列表
     * @param {*} menuData
     * @param {*} menuItem
     * @param {*} init
     * @returns
     */
    generateMenuData({ menuData, menuItem, init = false, defaultOpened } = {}) {
      let menus = JSON.parse(JSON.stringify(menuData));
      return menus?.map((i) => {
        if (init) {
          i.expand = defaultOpened || this.hasSelectedMenu(i, menuItem?.key);
        } else if (i.key === menuItem?.key) {
          i.expand = menuItem?.expand;
        }
        return {
          ...i,
          children: this.generateMenuData({
            menuData: i.children || [],
            menuItem,
            init,
            defaultOpened,
          }),
        };
      });
    },
    /**
     * 点击菜单的某一项
     * @param {*} itemInfo
     * @returns
     */
    menuClick(itemInfo) {
      const menu = itemInfo?.currentTarget?.dataset?.menu;
      const { children, expand, key, disabled } = menu;
      if (disabled) return;

      if (children.length) {
        this.setData({
          menuData: this.generateMenuData({
            menuData: this.data.menuData,
            menuItem: {
              ...menu,
              expand: !expand,
            },
          }),
        });
        return;
      } else {
        this.setData({ selectedKey: key });
        this.triggerEvent('menuClick', { item: menu });
        eventBus.emit('dealMenuShow', false);
        this.navigateTo(menu);
      }
    },
    /**
     * 查找已选中的菜单项
     * @param {*} menu
     * @param {*} selectedKey
     * @returns
     */
    findSelectItem(menu, selectedKey) {
      const len = menu.length;
      // 默认高亮当前路由对应的菜单
      const { app } = getWedaAPI();
      const { $w } = app?.__internal__ || {};
      const currentPath = `/${$w?.page?.uuid || $w?.page?.id}`;

      for (let i = 0; i < len; i++) {
        if (menu[i].children) {
          const selectItem = this.findSelectItem(menu[i].children, selectedKey);

          if (selectItem) return selectItem;
        }

        const menuPath = `${
          menu[i].subPackageName ? `/${menu[i].subPackageName}` : ''
        }${menu[i].path}`;

        if (
          menu[i].key === selectedKey ||
          (currentPath === menuPath.split('?')[0] &&
            judgeMenuPathAndCurrentPath(menuPath))
        )
          return menu[i];
      }

      return null;
    },
  },
});
