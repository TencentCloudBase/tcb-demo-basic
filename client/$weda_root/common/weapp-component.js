import { observable } from 'mobx'
import { createEventHandlers, createComputed, patchWdigetPropsWithEvtListeners } from './util'
import { createWidgets, getWidget, disposeWidget } from './widget'
import mergeRenderer from './merge-renderer'
import { runWatchers } from './watch'
import lodashGet from 'lodash.get';
import { createInitData, createWidget } from './widget';
import { commonCompBehavior, getWedaAPI } from '@cloudbase/weda-client';

/**
 * Lowcodes of all components
 */
export const compLowcodes = {}

export function createComponent(key, behaviors, properties={}, events, handler, dataBinds, evtListeners, widgetProps, index, lifeCycle, stateFn, computedFuncs, config, libCommonRes, libCode) {
  widgetProps = patchWdigetPropsWithEvtListeners(widgetProps, evtListeners)

  compLowcodes[key] = {
    index,
    stateFn,
    computedFuncs,
    handler,
    // events,
    lib: libCommonRes,
    config,
  }

  return Component({
    options: {
      virtualHost: true,
      multipleSlots: true,
      styleIsolation: 'shared',
    },
    /**
     * commonCompBehavior 生命周期最先执行
     */
    behaviors: [commonCompBehavior, ...behaviors,],
    // externalClasses: ['class'],
    properties: {
      style: {
        type: String
      },
      className: {
        type: String,
      },
      ...properties,
    },

    data: createInitData(widgetProps, dataBinds, ''),

    lifetimes: {
      created() {
        this._pageActive = true
        this._disposers = []
        this._nativeObserver = false
        this._nativeMode = false
      },
      attached() {
        const $comp = this._getInstance()
        if(!$comp) return
        $comp.__internal__.active = this._pageActive

        $comp.props.events = createPropEvents(events, this)
        const { widgets, rootWidget: virtualRootWidget } = createWidgets(widgetProps, dataBinds, this, $comp.widgets)
        $comp.widgets = widgets
        this._virtualRootWidget = virtualRootWidget

        try {
          lifeCycle.onAttached && lifeCycle.onAttached.call($comp)
          this.__mnt__ = (e) => {
            const widget = getWidget($comp.widgets, e.target.id)
            widget._methods = e.detail.methods;
          }
          this.__unmnt__ = (e) => {
            const widget = lodashGet($comp.widgets, e.target.id);
            widget._methods = {}
          }
          if ($comp.methods) {
            this.triggerEvent('attached', {
              'methods': $comp.methods
            })
          }
        } catch (e) {
          console.error('Component lifecycle(attached) error', this.is, e)
        }

        this._disposers = this.initMergeRenderer($comp.widgets)
      },
      ready() {
        const $comp = this._getInstance()
        if(!$comp) return
        this._disposers.push(...runWatchers(index, this))
        lifeCycle.onReady && lifeCycle.onReady.call($comp)
      },
      detached() {
        const $comp = this._getInstance()
        if(!$comp) return
        this._pageActive = false
        $comp.__internal__.active = this._pageActive

        $comp.widgets = null
        $comp.node._eventListeners?.clear?.();
        disposeWidget(this._virtualRootWidget)
        this._disposers.forEach(dispose => dispose())
        lifeCycle.onDetached && lifeCycle.onDetached.call($comp)
        if ($comp?.methods) {
          this.triggerEvent('detached');
        }
      }
    },

    pageLifetimes: {
      show() {
        const $comp = this._getInstance()
        if(!$comp) return
        lifeCycle.onPageShow && lifeCycle.onPageShow.call($comp)
      },
      hide() {
        const $comp = this._getInstance()
        if(!$comp) return
        lifeCycle.onPageHide && lifeCycle.onPageHide.call($comp)
      },
      resize(size) {
        const $comp = this._getInstance()
        if(!$comp) return
        lifeCycle.onPageResize && lifeCycle.onPageResize.call($comp, size)
      }
    },

    methods: {
      ...createEventHandlers(evtListeners, { looseError: true, isComposite: true }),
      ...mergeRenderer,
      _getInstance() {
        if (!this.$WEAPPS_COMP) {
          let widget = this.$node
          if (!widget) {
            if ((this.selectOwnerComponent && !this.selectOwnerComponent?.()) || this._nativeMode) {
              const widgetValue = {}
              for (const key in properties) {
                if (properties[key]?.value !== undefined) {
                  widgetValue[key] = properties[key]?.value
                }
                if (this.data[key] !== undefined) {
                  widgetValue[key] = this.data[key]
                }
              }
              this.$node = createWidget({ widgetType: key, ...widgetValue }, this.id || `id${Date.now()}`, '', undefined, {})
              widget = this.$node
              this._nativeObserver = true;
            } else {
              console.error('Fatal error: weapps component instance not created', this.is, this.id);
              return
            }
          }
          widget.getDom = (fields) => this._virtualRootWidget.children[0].getDom(fields)
          this.$WEAPPS_COMP = create$comp(widget)
        }
        return this.$WEAPPS_COMP
      },
    },
    observers: createObservers(Object.keys(properties))
  })
}

// The component instance for lowcode
function create$comp(w) {
  const lowcode = compLowcodes[w.widgetType]
  if (!lowcode) {
    return
  }
  const { stateFn, computedFuncs, handler, lib } = lowcode

  const $comp = {
    __internal__: {
    },
    state: {},
    computed: {},
    widgets: {},
    node: w || {},
    props: {
      data: w || {},
      events: {},
      get style() { return w.style },
      get classList() { return w.classList },
    },
    handler: {},
    lib
  }
  $comp.$WEAPPS_COMP = $comp  // TODO $comp will replaced to this.$WEAPPS_COMP
  $comp.computed = createComputed(computedFuncs, $comp)
  $comp.handler = Object.keys(handler).reduce((result, key) => {
    result[key] = handler[key].bind($comp)
    return result
  }, {})
  $comp.state = observable(stateFn.call($comp))  // May depend on this.props.data.xxx


  $comp.__internal__.$w = new Proxy(
    getWedaAPI()?.$w || {},
    {
      get(target, prop) {
        if (prop === '$comp') {
          return $comp
        }
        // 尝试代理组件级别组件实例
        const childWidget = $comp.widgets?.[prop];
        if (childWidget) {
          return childWidget._userWidget;
        }
        return target[prop]
      },
    },
  );

  return $comp
}

function createObservers(props) {
  const MAP = {
    className: {
      alias: 'classList',
      format: function(value='') {
        return Array.from(new Set(value.split(' ').filter(item=>!!item)))
      }
    },
  }
  return props.reduce((observers, prop) => {
    observers[prop] = function (value) {
      if (!this._nativeObserver) {
        return;
      }
      const $comp = this._getInstance()
      if ($comp) {
        const data = $comp.props.data || {}
        const dataKey = MAP[prop]?.alias || prop;
        const formatValue = MAP[prop]?.format ? MAP[prop].format(value) : value;
        // if (!deepEqual(data[prop], formatValue)) {
          data[dataKey] = formatValue
        // } else {
        //   // console.log(`Same comp prop will not trigger observer. ${prop}->${dataKey}`, formatValue)
        // }
      }
    }
    return observers
  }, {})
}

function dataBindsBindContext(dataBinds, self) {
  return Object.keys(dataBinds).reduce((result, widgetId) => {
    result[widgetId] = Object.keys(dataBinds[widgetId]).reduce((result, prop) => {
      result[prop] = dataBinds[widgetId][prop].bind(self)
      return result
    }, {})
    return result
  }, {})
}

function createPropEvents(events, mpInst) {
  const protectEventKeys = [
    'touchstart', //	手指触摸动作开始
    'touchmove', //		手指触摸后移动
    'touchcancel', //		手指触摸动作被打断，如来电提醒，弹窗
    'touchend', //		手指触摸动作结束
    'tap', //		手指触摸后马上离开
    'longpress', //		手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发	1.5.0
    'longtap', //		手指触摸后，超过350ms再离开（推荐使用longpress事件代替）
    'transitionend', //		会在 WXSS transition 或 wx.createAnimation 动画结束后触发
    'animationstart', //		会在一个 WXSS animation 动画开始时触发
    'animationiteration', //		会在一个 WXSS animation 一次迭代结束时触发
    'animationend', //		会在一个 WXSS animation 动画完成时触发
    'touchforcechange', // 在支持 3D Touch 的 iPhone 设备，重按时会触发
  ]
  const result = {}
  events.forEach(evt => {
    const isProtectKey = protectEventKeys.some(key => key === evt.name)
    if (isProtectKey) {
      result[evt.name] = function () { }
    } else {
      result[evt.name] = function (evtDetail) {
        if (evt.getValueFromEvent) {
          mpInst.setData({ value: evt.getValueFromEvent({ detail: evtDetail }) })
        }
        mpInst.triggerEvent(evt.name, evtDetail)
        mpInst._getInstance().node?._eventListeners?.emit?.(evt.name, evtDetail)
      }
    }
  })
  return result
}
