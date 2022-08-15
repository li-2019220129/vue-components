import {RuleItem} from './rule'
import {CSSProperties} from 'vue'
import { ValidateFieldsError } from 'async-validator'
interface Callback {
  (isValid?: boolean, invalidFields?: ValidateFieldsError): void,
}
export interface FormOptions {
  type:
    | 'cascader'
    | 'checkbox'
    | 'color-picker'
    | 'checkbox-group'
    | 'checkbox-button'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'radio'
    | 'radio-group'
    | 'radio-button'
    | 'select'
    | 'option'
    | 'rate'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
    | 'editor'
  value?: any,
  label?: string,
  prop?:string,
  rules?:RuleItem[],
  placeholder?:string,
  // 表单项的子元素
  children?: FormOptions[],
  attrs?:{
    style?:CSSProperties
    clearable?:boolean,
    showPassword?:boolean,
    disabled?:boolean,
  },
  uploadAttrs?:{
    action:string,
    headers?:Object,
    methods?:'post'|'put'|'patch',
    multiple?:boolean,
    data?:any,
    name?:string,
    withCredentials?:boolean,
    showFileList?:boolean,
    drag?:boolean,
    accept?:string,
    thumbnailMode?: boolean,
    fileList?: any[],
    listType?: 'text' | 'picture' | 'picture-card',
    autoUpload?: boolean,
    disabled?: boolean,
    limit?: number,
  }
}
export interface ValidateFieldCallback {
  (message?: string, invalidFields?: ValidateFieldsError): void,
}

export interface FormInstance {
  registerLabelWidth(width: number, oldWidth: number): void,
  deregisterLabelWidth(width: number): void,
  autoLabelWidth: string | undefined,
  emit: (evt: string, ...args: any[]) => void,
  labelSuffix: string,
  inline?: boolean,
  model?: Record<string, unknown>,
  size?: string,
  showMessage?: boolean,
  labelPosition?: string,
  labelWidth?: string,
  rules?: Record<string, unknown>,
  statusIcon?: boolean,
  hideRequiredAsterisk?: boolean,
  disabled?: boolean,
  validate: (callback?: Callback) => Promise<boolean>,
  resetFields: () => void,
  clearValidate: (props?: string | string[]) => void,
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void,
}
