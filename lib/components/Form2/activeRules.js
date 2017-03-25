'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by ravi.hamsa on 3/25/17.
 */
exports.default = {
    'eq': function eq(value, rule) {
        return value.value === rule.value;
    },
    'neq': function neq(value, rule) {
        return value.value !== rule.value;
    },
    'falsey': function falsey(value, rule) {
        return !value.value;
    },
    'truthy': function truthy(value, rule) {
        return value.value;
    },
    'function': function _function(value, rule) {
        var func = rule.func;
        return func.apply(this, arguments);
    }
};