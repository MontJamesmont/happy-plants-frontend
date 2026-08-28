import { ValidationRuleWithoutParams, ValidationRuleWithParams, ValidationRule } from '@vuelidate/core'
import { Ref } from 'vue-demi'
import i18n from './i18n'
import {
  helpers,
  required as OrginalRequired,
  requiredIf as OrginalRequiredIf,
  requiredUnless as OrginalRequiredUnless,
  minLength as OrginalMinLength,
  maxLength as OrginalMaxLength,
  minValue as OrginalMinValue,
  maxValue as OrginalMaxValue,
  between as OrginalBetween,
  alpha as OrginalAlpha,
  alphaNum as OrginalAlphaNum,
  numeric as OrginalNumeric,
  integer as OrginalInteger,
  decimal as OrginalDecimal,
  email as OrginalEmail,
  ipAddress as OrginalIpAddress,
  macAddress as OrginalMacAddress,
  sameAs as OrginalSameAs,
  url as OrginalUrl,
  or as OrginalOr,
  and as OrginalAnd,
  not as OrginalNot
} from '@vuelidate/validators'

// required
export const required: ValidationRuleWithoutParams = {
  $validator: OrginalRequired.$validator,
  $message: function () { return (i18n.global as any).t('validation.required') }
}

// requiredIf
export function requiredIf (prop: boolean | string | (() => boolean | Promise<boolean>)) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return  (i18n.global as any).t('validation.required') }, OrginalRequiredIf(prop))
}

// requiredUnless
export function requiredUnless (prop: boolean | string | (() => boolean | Promise<boolean>)) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.required') }, OrginalRequiredUnless(prop))
}

// minLength
export function minLength (length: number | Ref<number>) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.min_length', { length: length }) }, OrginalMinLength(length))
}

// maxLength
export function maxLength (length: number | Ref<number>) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.max_length', { length: length }) }, OrginalMaxLength(length))
}

// minValue
export function minValue (min: number | Ref<number> | string | Ref<string>) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.min_value', { min: min }) }, OrginalMinValue(min))
}

// maxValue
export function maxValue (max: number | Ref<number> | string | Ref<string>) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.max_value', { max: max }) }, OrginalMaxValue(max))
}

// between
export function between (min: number | Ref<number>, max: number | Ref<number>) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.between', { min: min, max: max }) }, OrginalBetween(min, max))
}

// alpha
export const alpha: ValidationRuleWithoutParams = {
  $validator: OrginalAlpha.$validator,
  $message: function () { return (i18n.global as any).t('validation.alpha') }
}

// alphaNum
export const alphaNum: ValidationRuleWithoutParams = {
  $validator: OrginalAlphaNum.$validator,
  $message: function () { return (i18n.global as any).t('validation.alph_num') }
}

// numeric
export const numeric: ValidationRuleWithoutParams = {
  $validator: OrginalNumeric.$validator,
  $message: function () { return (i18n.global as any).t('validation.numeric') }
}

// integer
export const integer: ValidationRuleWithoutParams = {
  $validator: OrginalInteger.$validator,
  $message: function () { return (i18n.global as any).t('validation.integer') }
}

// decimal
export const decimal: ValidationRuleWithoutParams = {
  $validator: OrginalDecimal.$validator,
  $message: function () { return (i18n.global as any).t('validation.decimal') }
}

// email
export const email: ValidationRuleWithoutParams = {
  $validator: OrginalEmail.$validator,
  $message: function () { return (i18n.global as any).t('validation.email') }
}

// ipAddress
export const ipAddress: ValidationRuleWithoutParams = {
  $validator: OrginalIpAddress.$validator,
  $message: function () { return (i18n.global as any).t('validation.ip_address') }
}

// macAddress
export function macAddress (separator: string | Ref<string>) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.mac_address') }, OrginalMacAddress(separator))
}

// sameAs
export function sameAs <E = unknown> (equalTo: E, otherName?: string) : ValidationRuleWithParams {
  const other = otherName !== undefined ? otherName : 'other'
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.same_as', { other: other }) }, OrginalSameAs(equalTo, otherName))
}

// url
export const url: ValidationRuleWithoutParams = {
  $validator: OrginalUrl.$validator,
  $message: function () { return (i18n.global as any).t('validation.url') }
}

// or
export function or (...validators: ValidationRule[]) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.or') }, OrginalOr(...validators))
}

// and
export function and (...validators: ValidationRule[]) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.and') }, OrginalAnd(...validators))
}

// not
export function not (validator: ValidationRule) : ValidationRuleWithParams {
  return helpers.withMessage(function () { return (i18n.global as any).t('validation.not') }, OrginalNot(validator))
}

// Phone
export const phone: ValidationRuleWithoutParams = {
  $validator: helpers.regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/),
  $message: function () { return (i18n.global as any).t('validation.phone') }
}
