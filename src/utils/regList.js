// 判断日期类型是否为YYYY-MM-DD格式的类型
export function isDate(str) {
  const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/
  return reg.test(str)
}

// 判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型
export function isDateTime(str) {
  const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
  return reg.test(str)
}

// 判断时间类型是否为hh:mm:ss格式的类型
export function isTime(str) {
  const reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/
  return reg.test(str)
}

// 是否为IP
export function isIP(str) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/
  return reg.test(str)
}

// 是否为合法uri
export function validateURL(str) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(str)
}

// 密码验证,至少包含数字,英文,字符中的两种以上,长度8-20
export function validatePassword(str) {
  // 至少包含数字,英文,字符中的两种以上,长度8-20
  const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/
  return reg.test(str)
}
// 密码验证,最少6位,至少包含1个大写字母,1个小写字母,1个数字,1个特殊字符
export function validateIsPassword(str) {
  const reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
  return reg.test(str)
}

// 验证用户名是否符合标准,不能以数字开头的6-18位用户名
export function validateUserName(str) {
  const reg = /^[a-zA-Z][0-9a-zA-Z]{5,18}$/
  return reg.test(str)
}

// 验证是否都为小写字母
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

// 验证是否都为大写字母
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

// 验证是否都为大小写字母
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// 判断输入的EMAIL格式是否正确
export function validateIsEmail(str) {
  const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  return reg.test(str)
}

// 判断输入的手机号格式是否正确
export function validateIsPhone(str) {
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
  return reg.test(str)
}

// 验证价格
export function validatePrice(str) {
  const reg = /(^[1-9]([0-9]{1,4})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  return reg.test(str)
}

// 验证正整数
export function validateNum(str) {
  const reg = /^[1-9][0-9]*$/
  return reg.test(str)
}

// 验证4位正整数
export function validateNum4(str) {
  const reg = /^0|[1-9][0-9]{0,3}$/
  return reg.test(str)
}

// 验证1-18位数字加6位小数
export function validateNum18(str) {
  const reg = /^(0|[1-9][0-9]{0,17})(\.[0-9]{1,6})?$/
  return reg.test(str)
}

// 验证9位正整数
export function validateNum9(str) {
  const reg = /^0|[1-9][0-9]{0,9}$/
  return reg.test(str)
}

// 校验输入非中文  true 是中文
export function noChinese(str) {
  const reg = /[\u4e00-\u9fa5]/
  return reg.test(str)
}
// 校验输入是否是数组或点
export function inputNumberOrSpot(str) {
  const reg = /^\d+(?=\.{0,1}\d+$|$)/
  return reg.test(str)
}

// 校验输入是否是数字（包括正负、小数点）
export function inputOrNumber(str) {
  const reg = /[-+]*[0-9][.][0-9]+|[-+]*[1-9][0-9]*|^[0]$/
  return reg.test(str)
}

// 校验输入字符是否大于6位(包含数字字母)
export function validateByte6_18(str) {
  const reg = /^.{6,18}$/
  return reg.test(str)
}

// 校验输入字符是否是路径格式
export function validateUrl(str) {
  const reg = /^[a-zA-Z]:(((\\(?! )[^/:*?<>\''|\\]+)+\\?)|(\\)?)\s*$/
  return reg.test(str)
}

// 邮箱是否符合标准
export function validateEMail(rule, value, callback) {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('邮箱地址不能为空'))
    return false
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮箱地址'))
      return false
    }
    return true
  }
}

// 身份证号码是否符合要求
export function validateIdNo(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('身份证不能为空'))
  } else {
    if (!reg.test(value) && value !== '') {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
}

// 是否手机号码或者固话
export function validatePhoneTwo(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('不是手机号码或者固话'))
  } else {
    if (!reg.test(value) && value !== '') {
      callback(new Error('请输入正确的电话号码或者固话号码'))
    } else {
      callback()
    }
  }
}

// 是否固话
export function validateTelphone(rule, value, callback) {
  const reg = /0\d{2}-\d{7,8}/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('固定电话不能为空'))
  } else {
    if (!reg.test(value) && value !== '') {
      callback(new Error('请输入正确的固话（格式：区号+号码,如010-1234567）'))
    } else {
      callback()
    }
  }
}
