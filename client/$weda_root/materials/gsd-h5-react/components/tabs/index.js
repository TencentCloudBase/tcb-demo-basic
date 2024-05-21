Component({
  externalClasses: ['ext-class'],

  options: {
    multipleSlots: true,
    addGlobalClass: true,
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
    isMultipleSlot: {
      type: Boolean,
      value: true,
    },
    tabs: { type: Array, value: [] },
    scrollCellId: {
      type: String,
      value: '',
    },
    selectedIndex: {
      type: Number,
      value: 0,
    },
  },

  data: {
    currentIndex: 0,
    stickyStyle: null,
  },
  methods: {
    toggle(e) {
      const { tabs } = this.data;
      const { index } = e.target.dataset;
      this.setData({
        currentIndex: index,
      });
      if (tabs.length > 5) {
        this.setData({
          scrollCellId: `cell-${Math.max(index - 2, 0)}`,
        });
      }
    },
  },
  observers: {
    selectedIndex: function (selectedIndex) {
      if (selectedIndex !== this.data.currentIndex) {
        this.setData({
          currentIndex: selectedIndex,
        });
      }
    },
    'currentIndex, tabs': function (currentIndex, tabs) {
      this.triggerEvent('change', {
        id: currentIndex,
        label: tabs[currentIndex].title,
        value: tabs[currentIndex].value,
      });
    },
  },
});
