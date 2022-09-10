import {EVENT_HANDLER_ATTRIBUTE_EVENT_TYPE, EVENT_HANDLER_ATTRIBUTE_NAME} from '../enums';
import {EventHandlerAttributeInterface} from '../interfaces/event-handler-attribute.interface';

export class AttributeLists {
    static readonly onAttribute: EventHandlerAttributeInterface[] = [
        {
            name: EVENT_HANDLER_ATTRIBUTE_NAME.click,
            eventType: EVENT_HANDLER_ATTRIBUTE_EVENT_TYPE.click,
        },
    ];
}
