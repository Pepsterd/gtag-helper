import {GTAG_HELPER} from '../enums';
import {AttributeLists} from './attribute-lists.class';
import {EventHandlerAttributeInterface} from '../interfaces/event-handler-attribute.interface';
import {AttributeEventHandler} from './attribute-event-handler.class';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

export class GtagHelper {
    private readonly _prefix: string;
    private _customPrefix: string | undefined;
    private _dataLayer: any[];
    private _attributeEventHandler?: AttributeEventHandler;

    constructor(dataLayer: any[], prefix?: string) {
        this._prefix = GTAG_HELPER.prefix;
        this._customPrefix = prefix;
        this._dataLayer = dataLayer;
    }

    public init(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                GtagHelper._checkDataLayer();
            } catch (e: any) {
                reject(e);
            }

            this._bindEvents();
            resolve();
        });
    }

    private static _checkDataLayer(): void {
        if (!window.dataLayer || !window.dataLayer.find((element) => element['gtm.start'])) {
            throw new Error('Init failed, no datalayer present');
        }
    }

    private _bindEvents(): void {
        this._attributeEventHandler = new AttributeEventHandler(this.prefix, this._dataLayer);
        AttributeLists.onAttribute.forEach((eventHandlerAttributeInterface: EventHandlerAttributeInterface) => {
            if (!this._attributeEventHandler) {
                throw new Error('No attribute event handler found');
            }
            this._attributeEventHandler.bindDataAttribute(eventHandlerAttributeInterface);
        });
    }

    private get prefix(): string {
        if (this._customPrefix) {
            return this._customPrefix;
        }
        return this._prefix;
    }
}
