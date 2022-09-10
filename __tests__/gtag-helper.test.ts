/**
 * @jest-environment jsdom
 */
import {GtagHelper} from "../src";


test('it_should_not_initialize_without_datalayer', () => {
    return expect(new GtagHelper(window.dataLayer).init()).rejects.toEqual(Error('Init failed, no datalayer present'));
});

describe('Successful GTM implementation', () => {
    const gtagHelper = new GtagHelper(window.dataLayer);

    beforeEach(() => {
        window.dataLayer = [{'gtm.start': 1}];
    });

    test('it_initializes_with_datalayer_present', () => {
        jest.spyOn(GtagHelper.prototype as any, '_bindEvents').mockImplementation(() => true);
        return expect(gtagHelper.init()).resolves.toEqual(undefined);
    });

    test('it_binds_data_on_successful_initialization', async () => {
        await gtagHelper.init();
        const bindEventsFunction = jest.spyOn(GtagHelper.prototype as any, '_bindEvents');
        expect(bindEventsFunction).toHaveBeenCalled();
    });
})
