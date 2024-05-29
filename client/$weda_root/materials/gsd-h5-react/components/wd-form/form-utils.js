import lodashSet from 'lodash.set';

function getFormDetailValueIsNull({ formData, formItemMap }) {
  const formDetailList = [];
  Object.keys(formItemMap)?.forEach((item) => {
    const widgetArray = Array.isArray(formItemMap[item])
      ? formItemMap[item]
      : [formItemMap[item]];
    widgetArray.forEach((w) => {
      if (w.getConfig?.()?.componentType === 'formdetail') {
        formDetailList.push(item);
      }
    });
  });
  const arr = formDetailList.filter(
    (i) => !Object.keys(formData).find((j) => i === j)
  );
  return arr;
}

export function getFormDataFromItemMap(formItemMap, formType) {
  const formData = Object.keys(formItemMap).reduce((acc, k) => {
    const widgetArray = Array.isArray(formItemMap[k])
      ? formItemMap[k]
      : [formItemMap[k]];
    widgetArray.forEach((w) => {
      if (w.getConfig?.()?.componentType === 'formdetail') {
        return acc;
      }
      // 如果位于嵌套表单内，则跳过赋值，交给嵌套表单处理
      if (w.closest((ww) => ww.getConfig?.().componentType === 'formObj')) {
        return acc;
      }
      lodashSet(acc, k, w?.getValue?.());
    });

    return acc;
  }, {});

  const result = getFormDetailValueIsNull({ formData, formItemMap });
  // 编辑或查看场景，提交表单时，若子表单内容为空，则赋值为空
  if (result.length && ['read', 'edit'].includes(formType)) {
    result.forEach((name) => {
      lodashSet(formData, name, null);
    });
  }

  return formData;
}

export function getErrorObjectFromValidateResult(errObj) {
  return Object.keys(errObj ?? {}).reduce((acc, cur) => {
    const errors = errObj[cur];
    if (errors.length > 0) {
      acc[cur] = { message: errors[0].message, label: errors[0].label };
    }
    return acc;
  }, {});
}
