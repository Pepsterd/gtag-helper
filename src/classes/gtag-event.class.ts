import {EventPayloadInterface} from '../interfaces/event-payload.interface';
import {GtagEventInterface} from '../interfaces/gtag-event.interface';

export class GtagEvent {
    eventName: string;
    payload: EventPayloadInterface;

    constructor(data: GtagEventInterface) {
        this.eventName = data.eventName;
        this.payload = data.payload ?? {};
    }
}
