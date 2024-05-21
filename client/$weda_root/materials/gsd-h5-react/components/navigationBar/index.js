import { getWedaAPI } from '../../utils/getWedaApi';
import destr from '../../utils/destr';
import { isUrl } from '../../utils/platform';
import { getAppCustomNav, resolveStaticResourceUrl } from '../../utils/tcb';

Component({
  options: {
    multipleSlots: true, // 启用多slot支持
  },
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    navigationbar: { type: Object, value: {} },
  },
  data: {
    defaultLogoUrl:
      'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/43d3b2b7-445c-4858-8eb0-50ac5d5cc08e.svg',
    visible: false,
    selectedKey: 'index',
    menuData: [],
    navigationStyle: {
      isHorizontal: false,
      showMenuIcon: true,
      fixedTop: true,
      menuFontSize: 14,
      menuBackgroundColor: '#fff',
      menuColor: '#000',
      menuHoverColor: '#f3f3f3',
      showTitle: true,
      title: '标题',
      showLogo: true,
      logoPath: '',
      logoUrl:
        'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/43d3b2b7-445c-4858-8eb0-50ac5d5cc08e.svg  ',
      titleFontSize: '18',
      titleColor: '#000',
      logoWidth: '32',
      logoHeight: '32',
    },
  },
  observers: {
    navigationbar: function (navigationbar) {
      this.getMenusByapi(navigationbar);
    },
  },
  methods: {
    getMenusByapi(navigationbar) {
      getAppCustomNav()
        .then((res) => {
          const { Content } = res;
          const navigationData = destr(Content);
          if (navigationData?.navigationStyle) {
            const {
              menuData,
              navigationStyle,
              isMultiTerminal,
              mobileMenuData,
            } = navigationData;
            let menus = isMultiTerminal ? mobileMenuData : menuData;
            let selectedKey = this.defaultSelectedMenu(menus);
            // 从cdn中读取图片
            const logoUrl =
              resolveStaticResourceUrl(navigationStyle.logoPath) ||
              navigationStyle.logoUrl;
            navigationStyle.logoUrl = logoUrl;

            this.setData({
              menuData: this.generateMenuData(
                menus,
                { key: selectedKey },
                true
              ),
              navigationStyle,
              selectedKey,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          const { menuData, navigationStyle } = navigationbar;
          let selectedKey = this.defaultSelectedMenu(menuData);

          this.setData({
            menuData: this.generateMenuData(
              menuData,
              { key: selectedKey },
              true
            ),
            navigationStyle,
            selectedKey,
          });
        });
    },
    generateMenuData(menuData, menuItem, init = false) {
      let menus = JSON.parse(JSON.stringify(menuData));
      return menus?.map((i) => {
        let { iconUrl = 'td:view-module', children, iconPath } = i;
        let iconType = 'image';
        let ticon = '';
        if (isUrl(iconUrl)) {
          // 从cdn中读取图片
          iconUrl = resolveStaticResourceUrl(iconPath) || iconUrl;
        } else {
          iconType = 'icon';
          if (iconUrl.includes('td:')) {
            iconType = 't-icon';
            ticon = iconUrl?.replace('td:', '');
          }
        }

        if (init) {
          i.expand = this.hasSelectedMenu(i, menuItem.key);
        } else if (i.key === menuItem.key) {
          i.expand = menuItem.expand;
        }
        return {
          ...i,
          iconType,
          iconUrl,
          ticon,
          children: this.generateMenuData(children || [], menuItem, init),
        };
      });
    },
    showMenu() {
      this.setData({ visible: !this.data.visible });
    },
    menuClick(itemInfo) {
      const menu = itemInfo?.currentTarget?.dataset?.menu;
      const { path, type, children, expand, packageName } = menu;
      if (children.length) {
        this.setData({
          menuData: this.generateMenuData(this.data.menuData, {
            ...menu,
            expand: !expand,
          }),
        });
        return;
      }
      if (type === 'route') {
        let { app } = getWedaAPI();
        app.navigateTo({
          pageId: path?.replace('/', ''),
          packageName: packageName || '',
          mode: 'weDa',
        });
      }
    },
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
    findMenuItemByPath(menus, targetPath) {
      const queue = [];
      let targetNode = null;
      menus.forEach((node) => queue.push(node));

      while (queue.length) {
        const node = queue.shift();
        if (!node) return null;

        if (node.path === targetPath) {
          // 添加节点
          targetNode = node;
          break;
        } else {
          node.children?.forEach((node) => queue.push(node));
        }
      }

      return targetNode;
    },
    defaultSelectedMenu(menu) {
      try {
        const activePage = getWedaAPI()?.app?.__internal__?.activePage;
        let path = activePage.id;
        let selectedKey = '';
        const targetMenu = this.findMenuItemByPath(menu, `/${path}`);
        if (targetMenu) {
          selectedKey = targetMenu.key;
        }
        return selectedKey;
      } catch (error) {
        return '';
      }
    },
  },
});
