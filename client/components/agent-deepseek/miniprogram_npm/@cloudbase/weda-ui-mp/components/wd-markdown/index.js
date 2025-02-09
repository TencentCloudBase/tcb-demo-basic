import MarkdownIt from './utils/markdown-it.min.js';
import highlight from './utils/highlight.min.js';
import hljsJs from './utils/hljs_javascript.min.js';
import hljsCss from './utils/hljs_css.min.js';
Component({
  options: {
    virtualHost: true,
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
    id: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      value: '这是一个markdown',
    },
    options: {
      type: Object,
      value: {},
    },
  },
  data: {
    __html: '',
    mdInstance: null,
  },
  methods: {
    init() {
      const { options } = this.data;

      const hljs = highlight();
      const javascript = hljsJs();
      const css = hljsCss();
      hljs.registerLanguage('javascript', javascript);
      hljs.registerLanguage('css', css);
      const md = new MarkdownIt({
        // 默认开启高亮
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre><code class="hljs">' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true })
                  .value +
                '</code></pre>'
              );
            } catch (__) {}
          }
          return '<pre><code class="hljs">' + str + '</code></pre>';
        },
        ...options,
      });
      this.setData({ mdInstance: md });
      this.triggerEvent('onReady', { markdownInstance: md });
      this.setData({
        __html: md.render(this.data.value),
      });
    },
    updateWidgetAPI() {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          value: this.properties.value,
          markdownInstance: this.data.mdInstance,
          updateMarkdownInstance: ({ markdownInstance }) =>
            this.setData({ mdInstance: markdownInstance }),
        });
    },
  },
  observers: {
    value: function () {
      const { mdInstance } = this.data;
      if (!mdInstance) return;
      console.log(this.data.value);
      this.setData({
        __html: mdInstance.render(this.data.value),
      });
    },
    options: function () {
      this.init();
    },
    'value,mdInstance': function () {
      this.updateWidgetAPI();
    },
  },
  lifetimes: {
    attached() {
      this.init();
      this.updateWidgetAPI();
    },
  },
});
