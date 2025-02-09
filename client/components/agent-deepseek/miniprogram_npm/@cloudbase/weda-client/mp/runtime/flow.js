import { createEventHandlers, getMpEventHandlerName } from './util';
import { Event } from './event-emitter';
export class EventFlow {
    id;
    description;
    #eventHandlerMap = {};
    #context = {};
    constructor({ schema, context, options }) {
        this.#eventHandlerMap = {};
        this.#context = context;
        const { id, description, eventHandlers = {} } = schema || {};
        this.id = id || '';
        this.description = description || '';
        this.#eventHandlerMap = Object.entries(createEventHandlers(eventHandlers, {
            looseError: true,
            isComposite: options?.isComposite || false,
            syncCall: true,
        })).reduce((map, [key, fn]) => {
            map[key] = fn;
            return map;
        }, {
            _getInstance: () => this.#context.$page || this.#context.$app,
        });
        return this;
    }
    trigger(additionalScope, options = {}) {
        const mergedContext = {
            ...this.#context,
            ...options,
        };
        const { target } = mergedContext;
        const eventName = `${this.id}.start`;
        return this.#eventHandlerMap[getMpEventHandlerName(this.id, eventName)](new Event({
            type: eventName,
            detail: additionalScope,
            target,
            currentTarget: target,
        }));
    }
}
export function generateEventFlows(flows = [], context, options) {
    const result = {};
    for (let flow of flows) {
        result[flow.id] = new EventFlow({ schema: flow, context, options });
    }
    return result;
}
