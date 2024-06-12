import { app } from '../../../../../app/weapps-api';

export default function (instance) {
  const { params: query } = instance.data
  try {
    let params = query.sourcePageParams || {};
    if (typeof params === 'string') {
      try {
        params = JSON.parse(params)
      } catch (error) { }
    }
    query.sourcePageId ? app.redirectTo({
      pageId: query.sourcePageId,
      packageName: query.sourcePagePackageName || undefined,
      params,
    }) : app.relaunchHome();
  } catch (e) {
    app.relaunchHome();
  }
}
