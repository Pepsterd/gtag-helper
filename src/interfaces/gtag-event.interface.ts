import {EventPayloadInterface} from './event-payload.interface';

export interface GtagEventInterface {
    eventName: string;
    payload: EventPayloadInterface | undefined;
}
