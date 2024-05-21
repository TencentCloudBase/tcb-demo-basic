// 查找父表单容器
export function getParentForm(widget, id) {
  const getWidget = (widget.getWeAppInst || widget._getInstance).bind(widget);
  const widgets = getWidget().widgets;
  let cur = getDeep(widgets, id, '-');
  while (!ensureForm(cur)) {
    if (!cur) return null;
    cur = cur.parent;
  }
  return cur;
}
function ensureForm(comp) {
  if (!comp) {
    return true;
  }
  return comp.getConfig && comp.getConfig().componentType === 'form';
}

function getDeep(target, key, keySeparator = '.') {
  if (key == null) {
    return target;
  }
  const keys = (key + '').split(keySeparator);
  while (keys.length > 0 && target != null) {
    target = target[keys.shift()];
  }
  return keys.length === 0 ? target : undefined;
}
