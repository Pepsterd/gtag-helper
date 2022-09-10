import {EventHandlerAttributeInterface} from '../interfaces/event-handler-attribute.interface';
import {EventPayloadInterface} from '../interfaces/event-payload.interface';
import {GtagEventInterface} from '../interfaces/gtag-event.interface';
import {GtagEvent} from './gtag-event.class';
import {AttributeGetter} from './attribute-getter.class';

export class AttributeEventHandler {
    private _prefix: string;
    private _camelCasePrefix: string;
    private _dataLayer: any[];

    constructor(prefix: string, dataLayer: any[]) {
        this._prefix = prefix;
        this._camelCasePrefix = this._createCamelCase(prefix);
        this._dataLayer = dataLayer;
    }

    private _sendEvent(gtagEvent: GtagEventInterface): void {
        this._dataLayer.push({'event': gtagEvent.eventName, ...gtagEvent.payload})
    }

    public bindDataAttribute(data: EventHandlerAttributeInterface): void {
        const attributeName = `${this._prefix}-${data.name}`;
        document.querySelectorAll(`[${attributeName}]`).forEach((element: Element) => {
            element.addEventListener(data.eventType, (event: Event) => {
                const eventElement = event.target;
                if (eventElement instanceof HTMLElement) {
                    const eventName = eventElement.getAttribute(attributeName);
                    if (!eventName) {
                        throw new Error(`No event name specified for: ${element}`);
                    }

                    const payload: EventPayloadInterface | undefined = AttributeGetter.createPayload(eventElement, this._camelCasePrefix);
                    this._sendEvent(new GtagEvent({eventName, payload}));
                }
            });
        });
    }

    private _createCamelCase(prefix: string): string {
        return prefix.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace('-', '');
    }
}
