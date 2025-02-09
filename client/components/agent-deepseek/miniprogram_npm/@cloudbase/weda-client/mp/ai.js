import { normalizeNumber, generateMethodsFrom$w } from '../common/utils';
const DEFAULT_PATH = 'choices.0.message.content';
const contentPathMap = {
    hunyuan: 'Response.Choices.0.Message.Content',
};
export function createMpAiAPI(ctx) {
    return { ai: createAiMethods(ctx) };
}
export function createAiMethods(ctx) {
    const extractContentFromLLMChatResponse = (props) => {
        return ctx.utils.get(props.response, contentPathMap[props.provider] ?? DEFAULT_PATH, '');
    };
    const LLM = {
        chat: async (params, $w) => {
            const { callEventFlow, getVarValue, setVarValue } = generateMethodsFrom$w($w);
            const { provider, model, messages, stream, varPath, setStateType, callbackEventFlowId, temperature: _temperature, top_p: _top_p, } = params;
            const ai = wx.cloud.extend.AI;
            const llmModel = ai.createModel(provider);
            const data = { model, messages };
            const [top_p, temperature] = [_top_p, _temperature].map(normalizeNumber);
            if (top_p !== null)
                Object.assign(data, { top_p });
            if (temperature !== null)
                Object.assign(data, { temperature });
            if (stream) {
                const { textStream: _textStream, eventStream: _eventStream } = (await llmModel.streamText({ data }));
                const streamRes = {
                    textStream: _textStream,
                    eventStream: handleEventStream(_eventStream),
                };
                const ret = {
                    textStream: streamRes.textStream,
                    eventStream: streamRes.eventStream,
                };
                const setResultToVar = async () => {
                    if (varPath) {
                        let beginningStr = setStateType === 'append' ? getVarValue(varPath) ?? '' : '';
                        const [retTextStream, readTextStream] = asyncTee(streamRes.textStream, 2);
                        ret.textStream = retTextStream;
                        for await (let text of readTextStream) {
                            beginningStr += text;
                            setVarValue(varPath, beginningStr);
                        }
                    }
                };
                const callCallbackEventFlow = async () => {
                    if (callbackEventFlowId) {
                        const [retEventStream, readEventStream] = asyncTee(streamRes.eventStream, 2);
                        ret.eventStream = retEventStream;
                        for await (let event of readEventStream) {
                            callEventFlow(callbackEventFlowId, event);
                        }
                    }
                };
                await Promise.all([setResultToVar(), callCallbackEventFlow()]);
                return ret;
            }
            else {
                const generateRes = await llmModel.generateText(data);
                if (varPath) {
                    let beginningStr = setStateType === 'append' ? getVarValue(varPath) ?? '' : '';
                    beginningStr += extractContentFromLLMChatResponse({ provider, response: generateRes });
                    setVarValue(varPath, beginningStr);
                }
                return generateRes;
            }
        },
    };
    const bot = {
        getFeedback: (params) => wx.cloud.extend.AI.bot.getFeedBack(params),
        getRecommendQuestions: async (params, $w) => {
            const { callEventFlow, getVarValue, setVarValue } = generateMethodsFrom$w($w);
            const { varPath, setStateType, callbackEventFlowId, ...restParams } = params;
            const ai = wx.cloud.extend.AI;
            const { textStream: _textStream, eventStream: _eventStream } = (await ai.bot.getRecommendQuestions({
                data: restParams,
            }));
            const streamRes = {
                textStream: _textStream,
                eventStream: handleEventStream(_eventStream),
            };
            const ret = {
                textStream: streamRes.textStream,
                eventStream: streamRes.eventStream,
            };
            const setResultToVar = async () => {
                if (varPath) {
                    let beginningStr = setStateType === 'append' ? getVarValue(varPath) ?? '' : '';
                    const [retTextStream, readTextStream] = asyncTee(streamRes.textStream, 2);
                    ret.textStream = retTextStream;
                    for await (let text of readTextStream) {
                        beginningStr += text;
                        setVarValue(varPath, beginningStr);
                    }
                }
            };
            const callCallbackEventFlow = async () => {
                if (callbackEventFlowId) {
                    const [retEventStream, readEventStream] = asyncTee(streamRes.eventStream, 2);
                    ret.eventStream = retEventStream;
                    for await (let event of readEventStream) {
                        callEventFlow(callbackEventFlowId, event);
                    }
                }
            };
            await Promise.all([setResultToVar(), callCallbackEventFlow()]);
            return ret;
        },
        sendMessage: async (params, $w) => {
            const { callEventFlow, getVarValue, setVarValue } = generateMethodsFrom$w($w);
            const { varPath, setStateType, callbackEventFlowId, ...restParams } = params;
            const ai = wx.cloud.extend.AI;
            const { textStream: _textStream, eventStream: _eventStream } = (await ai.bot.sendMessage({
                data: restParams,
            }));
            const streamRes = {
                textStream: _textStream,
                eventStream: handleEventStream(_eventStream),
            };
            const ret = {
                textStream: streamRes.textStream,
                eventStream: streamRes.eventStream,
            };
            const setResultToVar = async () => {
                if (varPath) {
                    let beginningStr = setStateType === 'append' ? getVarValue(varPath) ?? '' : '';
                    const [retTextStream, readTextStream] = asyncTee(streamRes.textStream, 2);
                    ret.textStream = retTextStream;
                    for await (let text of readTextStream) {
                        beginningStr += text;
                        setVarValue(varPath, beginningStr);
                    }
                }
            };
            const callCallbackEventFlow = async () => {
                if (callbackEventFlowId) {
                    const [retEventStream, readEventStream] = asyncTee(streamRes.eventStream, 2);
                    ret.eventStream = retEventStream;
                    for await (let event of readEventStream) {
                        callEventFlow(callbackEventFlowId, event);
                    }
                }
            };
            await Promise.all([setResultToVar(), callCallbackEventFlow()]);
            return ret;
        },
    };
    ['list', 'get', 'getChatRecords', 'sendFeedback'].forEach((methodName) => {
        bot[methodName] = async (params) => {
            return wx.cloud.extend.AI.bot[methodName](params);
        };
    });
    const ai = {
        LLM,
        bot,
    };
    return ai;
}
function handleEventStream(stream) {
    return asyncFilterMap(stream, (val) => {
        if (!val)
            return { keep: false };
        const eventDataStr = val.data;
        if (typeof eventDataStr !== 'string')
            return { keep: false };
        try {
            const parsedEventData = JSON.parse(eventDataStr);
            return {
                value: parsedEventData,
            };
        }
        catch (e) {
            if (eventDataStr !== '[DONE]')
                console.warn(e);
            return {
                keep: false,
            };
        }
    });
}
function asyncFilterMap(asyncIterable, filterMapFn) {
    const iterator = asyncIterable[Symbol.asyncIterator](); // The original async iterator
    return {
        [Symbol.asyncIterator]() {
            return this;
        },
        async next() {
            while (true) {
                const originalIteratorResult = await iterator.next();
                if (originalIteratorResult.done) {
                    return { done: true }; // done 为 true 时就不会消费 value 了
                }
                const newIteratorResult = filterMapFn(originalIteratorResult.value);
                if (newIteratorResult.keep === false) {
                    continue;
                }
                else {
                    return {
                        done: false,
                        value: newIteratorResult.value,
                    };
                }
            }
        },
    };
}
function asyncTee(asyncIterable, branches = 2) {
    const iterator = asyncIterable[Symbol.asyncIterator](); // The original async iterator
    const buffers = Array.from({ length: branches }, () => []); // Buffers for each branch
    let pumpPromise = null;
    async function pump() {
        if (pumpPromise !== null)
            return pumpPromise; // Avoid concurrent pumps
        pumpPromise = new Promise((res, rej) => {
            iterator
                .next()
                .then((nextRes) => {
                buffers.forEach((buffer) => buffer.push(nextRes)); // Push the result to all buffers
                if (nextRes.done) {
                    buffers.forEach((buffer) => buffer.push(null)); // Indicate completion in all buffers
                }
                res(null);
                pumpPromise = null;
            })
                .catch((e) => rej(e));
        });
    }
    // Creates an async iterator for each branch
    function makeBranch(i) {
        return {
            [Symbol.asyncIterator]() {
                return this;
            },
            async next() {
                while (buffers[i].length === 0) {
                    await pump(); // Fetch more data if the buffer is empty
                }
                const result = buffers[i].shift();
                if (result === null) {
                    return { done: true }; // Iteration is complete
                }
                return result;
            },
        };
    }
    // Return an array of async iterators for each branch
    return buffers.map((_, i) => makeBranch(i));
}
