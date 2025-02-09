import { CLOUD_SDK } from '@cloudbase/weda-cloud-sdk';
const { callWedaApi } = CLOUD_SDK;
export async function callWedaApiFn(action, data = {}) {
    return (await callWedaApi({ action, data })) || {};
}
