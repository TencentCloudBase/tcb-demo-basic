import { getCloudInstance } from '../../utils/tcb';

Component({
  options: {
    virtualHost: true,
  },
  data: {
    __html: '',
    originValue: '',
  },
  properties: {
    value: {
      type: String,
      value: '这是一个富文本',
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
  },
  methods: {
    async getSrc(img, regex) {
      const url = img.replace(regex, '$1');
      if (img.includes('cloud://')) {
        const tcb = await getCloudInstance();
        const { fileList } = await tcb.getTempFileURL({
          fileList: [url],
        });
        if (fileList && fileList[0] && fileList[0].tempFileURL) {
          this.setData({
            originValue: this.data.originValue.replace(
              new RegExp(url, 'g'),
              fileList[0].tempFileURL
            ),
          });
        }
      }
    },
    updateValue() {
      const regex = new RegExp(/<img [^>]*src=\\*"([^"]*?)\\*"/g);
      let initValue = (this.properties.value || '')
        .toString()
        .replace(/<img /g, `<img style="max-width:100%;height:auto" `)
        .replace(/<pre>/g, `<pre class="pre">`)
        .replace(/<blockquote>/g, `<blockquote class="blockquote">`)
        .replace(/<table/g, `<table class="table" `)
        .replace(/<th/g, `<th class="th" `)
        .replace(/<td/g, `<td class="td" `)
        .replace(/<p/g, `<p class="p" `);
      this.setData({ originValue: initValue });

      try {
        const imgs = initValue.match(regex);
        if (imgs && imgs.length > 0) {
          imgs.map((img) => {
            const url = img.replace(regex, '$1');
            if (img.includes('cloud://')) {
              initValue = initValue.replace(new RegExp(url, 'g'), '');
            }
          });
        }
        this.setData({ __html: initValue });

        if (imgs && imgs.length > 0) {
          (async () => {
            await Promise.all(
              imgs.map(async (img) => {
                await this.getSrc(img, regex);
              })
            );
            if (initValue !== this.data.originValue) {
              this.setData({ __html: this.data.originValue });
            }
          })();
        }
      } catch (e) {
        this.setData({ __html: initValue });
      }
    },
  },
  observers: {
    value() {
      this.updateValue();
    },
  },
});
