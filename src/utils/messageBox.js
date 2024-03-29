//封装弹出框
import { MessageBox } from 'element-ui'

//confirm框
export function handleCofirm(text = '确定执行此操作吗？', type = 'warning') {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  })
}

//alert框
export function handleAlert(text = '确定执行此操作吗？', type = 'warning', callback) {
  return MessageBox.alert(text, '提示', {
    confirmButtonText: '确定',
    type: type,
    callback
  })
}
