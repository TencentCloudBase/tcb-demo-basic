import { autorun, reaction } from 'mobx';
import { getDeep } from './util';
import { getDatasetProfiles, setLocalDatasetState } from '@cloudbase/weda-cloud-sdk';
/**
 *
 * @param {*} param
 * @returns Dipsonsers
 */
export function runWatchers({ watchEffects = {}, watch = {}, watchState = {}, watchWidget = {} }, mpInst) {
    const weappInst = mpInst._getInstance();
    const disposers = [];
    Object.keys(watchEffects).map((name) => {
        const fn = watchEffects[name];
        if (fn instanceof Function) {
            disposers.push(autorun(fn.bind(weappInst)));
        }
        else {
            console.error(`WatchEffect(${name}) of ${mpInst.is} is not a function.`);
        }
    });
    // # watch props
    Object.keys(watch).map((key) => runWatcher(parseWatcher(watch[key]), weappInst.node, key, 'watch'));
    // # watch state
    Object.keys(watchState).map((key) => runWatcher(parseWatcher(watchState[key]), weappInst.state, key, 'watchState'));
    // # watch widgets
    Object.keys(watchWidget).map((key) => runWatcher(parseWatcher(watchWidget[key]), weappInst.widgets, key, 'watchWidgets'));
    return disposers;
    function runWatcher(ctx, target, key, label) {
        const { handler, immediate } = ctx || {};
        if (!handler) {
            console.error(`Invalid ${label}(${key}) of ${mpInst.is}, watch must a function or {handler: function}`);
            return;
        }
        const disposer = reaction(() => getDeep(target, key), handler.bind(weappInst), { fireImmediately: immediate });
        disposers.push(disposer);
    }
}
function parseWatcher(watcher) {
    if (!watcher)
        return;
    if (watcher instanceof Function) {
        return { handler: watcher, immediate: false };
    }
    const { handler, immediate = false } = watcher;
    if (!(handler instanceof Function))
        return;
    return { handler, immediate };
}
export function watchAndSyncDatasetState2Local(appId, datasetProfileKey, dataset) {
    const disposes = [];
    const stateProfile = getDatasetProfiles(datasetProfileKey)?.state || {};
    for (const key in stateProfile) {
        const config = stateProfile[key];
        if (config.enableSyncLocal) {
            const dispose = autorun((r) => {
                try {
                    setLocalDatasetState(appId, datasetProfileKey, key, dataset[key]);
                }
                catch (e) {
                    console.error('setLocalDatasetState error:', e);
                }
            });
            disposes.push(dispose);
        }
    }
    return disposes;
}
