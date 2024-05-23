

const _weapps_app_common = {}

/**
 * 合并逻辑主要担心之前存在引用
 * 实际上可以遵照web实现互斥，有 default 则使用 default 否则 module
 */
function getDefaultModule(targetModule) {
  if (!targetModule) {
    return
  }
  const keys = Object.keys(targetModule)
  if (keys.length === 1 && keys[0] === 'default') {
    return targetModule.default
  }

  try {
    if (keys.includes('default')) {
      let module = targetModule.default || {};
      for (const key in targetModule) {
        try {
          if (module[key] !== undefined) {
            // reportEvent(`${tag}.mergeconflict`);
          } else if (key !== 'default') {
            /**
             * 兼容之前写法进行数据合并
             */
            module[key] = targetModule[key];
          }
        } catch (e) {
          // reportEvent(`${tag}.unmergeable`);
        }
      }
      return module;
    }
  } catch (e) {}

  return targetModule;
}

Object.defineProperties(_weapps_app_common, {
  
})

export default _weapps_app_common
