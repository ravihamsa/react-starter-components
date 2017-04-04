'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by ravi.hamsa on 3/25/17.
 */
exports.default = {
    'req': function req(rule, value) {
        return !_.isEmpty(value);
    },
    'selReq': function selReq(rule, value) {
        return value !== '-1';
    },
    'digits': function digits(rule, value) {
        return (/^\d{5}$/.test(value)
        );
    },
    'alphanumeric': function alphanumeric(rule, value) {
        var ck_alphaNumeric = /^\w+$/;
        return ck_alphaNumeric.test(value);
    },
    'number': function number(rule, value) {
        if (value === undefined) {
            return true;
        }
        var numberVal = +value;
        return numberVal === numberVal;
    },
    'email': function email(rule, value) {
        var ck_email = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\\+]+)*@[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\+]+)*(\.[A-Za-z]{2,})$/i;
        return ck_email.test(value.trim());
    },
    'minlen': function minlen(rule, value) {
        var min = rule.length;
        return ('' + value).trim().length >= min;
    },
    'maxlen': function maxlen(rule, value) {
        var max = rule.length;
        return ('' + value).trim().length <= max;
    },
    'lt': function lt(rule, value) {
        var target = parseFloat(rule.value);
        var curvalue = parseFloat(value);
        return curvalue < target;
    },
    'gt': function gt(rule, value) {
        var target = parseFloat(rule.value);
        var curvalue = parseFloat(value);
        return curvalue > target;
    },
    'eq': function eq(rule, value) {
        return rule.value === value;
    },
    'neq': function neq(rule, value) {
        return rule.value !== value;
    },
    'url': function url(rule, value) {
        if (value === '') {
            return true;
        }
        var ck_url = /(http|https|market):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
        return ck_url.test(value.trim());
    },
    'emaillist': function emaillist(rule, value) {
        var emails = value.split(',');
        var ck_email = /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        for (var i = 0; i < emails.length; i++) {
            var email = emails[i];
            email = email.trim();
            if (email !== '' && !ck_email.test(email)) {
                return false;
            }
        }
        return true;
    },
    'function': function _function(rule, value) {
        var func = rule.func;
        return func.call(this, value, rule);
    }
};