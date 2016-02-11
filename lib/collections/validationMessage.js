import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export default function () {
  SimpleSchema.messages({
    required: '请填写[label]',// '[label] is required',
    minString: '[label]不少于[min]个字符', // '[label] must be at least [min] characters',
    maxString: '[label]不超过[max]个字符', // '[label] cannot exceed [max] characters',
    minNumber: '[label]必须大于[min]',// '[label] must be at least [min]',
    maxNumber: '[label]不能超过[max]',// '[label] cannot exceed [max]',
    minDate: '[label]不能早于[min]',// '[label] must be on or before [min]',
    maxDate: '[label]不能晚于[min]',// '[label] cannot be after [max]',
    minCount: '你必须至少指定[minCount]个值',// 'You must specify at least [minCount] values',
    maxCount: '你不能指定超过[maxCount]个值',// 'You cannot specify more than [maxCount] values',
    noDecimal: '[label]必须为整数',// '[label] must be an integer',
    notAllowed: '[value]是无效的值',// '[value] is not an allowed value',
    expectedString: '[label]必须为字符串',// '[label] must be a string',
    expectedNumber: '[label]必须为数字',// '[label] must be a number',
    expectedBoolean: '[label]必须为布尔值',// '[label] must be a boolean',
    expectedArray: '[label]必须为数组',// '[label] must be an array',
    expectedObject: '[label]必须为对象',// '[label] must be an object',
    expectedConstructor: '[label]必须为[type]',// '[label] must be a [type]',
    regEx: [
      {msg: '不是有效的[label]'},
      // '[label] must be a valid e-mail address'},
      {exp: SimpleSchema.RegEx.Email, msg: '[label]必须是一个有效的邮箱地址'},
      // '[label] must be a valid e-mail address'
      {exp: SimpleSchema.RegEx.WeakEmail, msg: '[label]必须是一个有效的邮箱地址'},
      // '[label] must be a valid domain'
      {exp: SimpleSchema.RegEx.Domain, msg: '[label]必须是个有效的域名'},
      // '[label] must be a valid domain'
      {exp: SimpleSchema.RegEx.WeakDomain, msg: '[label]必须是一个有效的域名'},
      // '[label] must be a valid IPv4 or IPv6 address'
      {exp: SimpleSchema.RegEx.IP, msg: '[label]必须是一个有效的IPv4或者IPv6地址'},
      // '[label] must be a valid IPv4 address'
      {exp: SimpleSchema.RegEx.IPv4, msg: '[label]必须是一个有效的IPv4地址'},
      // '[label] must be a valid IPv6 address'
      {exp: SimpleSchema.RegEx.IPv6, msg: '[label]必须是一个有效的IPv6地址'},
      // '[label] must be a valid URL'
      {exp: SimpleSchema.RegEx.Url, msg: '[label]必须是一个有效的网址'},
      // '[label] must be a valid alphanumeric ID'
      {exp: SimpleSchema.RegEx.Id, msg: '[label]必须是一个由字母和数字组成的ID'}
    ],
    keyNotInSchema: '模式中不允许[label]' // '[label] is not allowed by the schema'
  });
}
