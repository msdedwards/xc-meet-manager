import { modifier } from 'ember-modifier';
import JsBarcode from 'jsbarcode';

/**
 * Creates JsBarcode Object
 * @param {element} element
 * @param {array} params
 */
export default modifier((element, [eventName, handler]) => {
  JsBarcode('#' + element.id, eventName, {
    height: 25,
    displayValue: false,
  });
});
