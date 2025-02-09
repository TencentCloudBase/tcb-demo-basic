import { getConfig } from '@cloudbase/weda-cloud-sdk';
import { ENV_TYPE } from '../../common/constants';
/**
 * @description 环境信息
 */
export const env = {
    get envId() {
        return getConfig('envID');
    },
    get type() {
        return getConfig('isProd') ? ENV_TYPE.production : ENV_TYPE.preview;
    },
};
