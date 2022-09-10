import {EventPayloadInterface} from '../interfaces/event-payload.interface';
import {GETTER_HELPER} from '../enums';

export class AttributeGetter {
    public static createPayload(element: HTMLElement, prefix: string): EventPayloadInterface | undefined {
        const dataSet: DOMStringMap = element.dataset;
        if (!dataSet) {
            return;
        }

        const payload: EventPayloadInterface = {};
        for (const dataSetKey in dataSet) {
            let value;
            let key = dataSetKey.replace(prefix, '');
            switch (key) {
                case GETTER_HELPER.innerText:
                    value = element.innerText;
                    break;
                case GETTER_HELPER.innerHtml:
                    value = element.innerHTML;
                    break;
                case GETTER_HELPER.classes:
                    value = element.classList.value;
                    break;
                case GETTER_HELPER.customPayload:
                    const dataSetValue = dataSet[dataSetKey];
                    if (dataSetValue) {
                        payload['custom_payload'] = dataSetValue;
                    }
                    break;
            }

            if (value) {
                payload[`${prefix}_${key.toLowerCase()}`] = value;
            }
        }

        return payload;
    }
}
