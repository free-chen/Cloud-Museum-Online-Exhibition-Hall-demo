export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const rules = {
  validPassword: (rule, value, callback) => {
    if (!value) {
      callback(new Error('密码不能为空'))
    } else if (!(/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value))) {
      callback(new Error('密码格式必须是字母和数字组合'))
    } else {
      callback()
    }
  },
  validateUserName: (rule, value, callback) => {
    const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9.·]+$/
    if (!reg.test(value)) {
      callback(new Error('登录名只能包含字母数字下划线'))
    } else {
      callback()
    }
  },
  validateLoginUserName: (rule, value, callback) => {
    const reg = /^[_a-zA-Z0-9.·]+$/
    if (!reg.test(value)) {
      callback(new Error('登录名只能包含字母数字下划线'))
    } else {
      callback()
    }
  },
  validateNumber: (rule, value, callback) => {
    const reg = /^[0-9]*$/
    if (!reg.test(value)) {
      callback(new Error('请填数字'))
    } else {
      callback()
    }
  },
  validDep: (rule, value, callback) => {
    if (!value) {
      callback(new Error('必填'))
    } else {
      callback()
    }
  },
  email: (rule, value, callback) => {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!reg.test(value)) {
      callback(new Error('非法的邮箱格式'))
    } else {
      callback()
    }
  },
  moblie: (rule, value, callback) => {
    if (!(/^1[34578]\d{9}$/.test(value))) {
      callback(new Error('不合格的手机号码'))
    } else {
      callback()
    }
  },
  phone: (rule, value, callback) => {
    if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
      callback(new Error('固定电话有误，请重填'))
    } else {
      callback()
    }
  },
  checkTel(rule, value, callback) {
    if ((/^1[34578]\d{9}$/.test(value)) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
      callback()
    } else {
      callback(new Error('请填写合法的手机号码或者固话号码'))
    }
  },
  fax: (rule, value, callback) => {
    const reg = /^(\d{3,4}-)?\d{7,8}$/
    if (!reg.test(value)) {
      callback(new Error('不合格的传真格式'))
    } else {
      callback()
    }
  },
  qq: (rule, value, callback) => {
    const reg = /^\d{5,10}$/
    if (!reg.test(value)) {
      callback(new Error('不合要求的qq号'))
    } else {
      callback()
    }
  },
  mark: (rule, value, callback) => {
    const reg = /^[-\+]?\d+(\.\d+)\,[-\+]?\d+(\.\d+)$/
    if (!value) {
      callback(new Error('不能为空'))
    } else if (!reg.test(value)) {
      callback(new Error('坐标不合法'))
    } else {
      callback()
    }
  },
  time: (rule, value, callback) => {
    const nowTime = new Date().getTime()
    const currentTime = new Date(value).getTime()
    if (!value) {
      callback(new Error('时间不能为空'))
    }
    if (currentTime < nowTime) {
      callback(new Error('不能选择过去时间'))
    } else {
      callback()
    }
  },
  timerange: (rule, value, callback) => {
    const nowTime = new Date().getTime()
    const startTime = new Date(value[0]).getTime()
    const endTime = new Date(value[1]).getTime()
    if (!value) {
      callback(new Error('时间不能为空'))
    }
    if (startTime < nowTime || endTime < nowTime) {
      callback(new Error('不能选择过去时间'))
    } else {
      callback()
    }
  },
  combotree: (rule, value, callback) => {
    if (!value['name']) {
      callback(new Error('不能为空'))
    } else {
      callback()
    }
  },
  year: (rule, value, callback) => {
    const nowTime = new Date().getFullYear()
    if (!value) {
      callback(new Error('时间不能为空'))
    }
    if (value < nowTime) {
      callback(new Error('不能选择过去年份'))
    } else {
      callback()
    }
  },
  name: (rule, value, callback) => {
    const reg = /^[\w\u4E00-\u9FA5\uF900-\uFA2D]*$/
    if (!reg.test(value)) {
      callback(new Error('含有非法字符'))
    } else {
      callback()
    }
  },
  isIP(rule, value, callback) {
    const reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
    if (reSpaceCheck.test(value)) {
      value.match(reSpaceCheck)
      if (RegExp.$1 <= 255 && RegExp.$1 >= 0 &&
        RegExp.$2 <= 255 && RegExp.$2 >= 0 &&
        RegExp.$3 <= 255 && RegExp.$3 >= 0 &&
        RegExp.$4 <= 255 && RegExp.$4 >= 0) {
        callback()
      } else {
        callback(new Error('非法IP地址'))
      }
    } else {
      callback(new Error('非法IP地址'))
    }
  },
  checkChar(rule, value, callback) {
    const reg = new RegExp('[` ~!#$^&*()=|{}\':;\',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？]')
    if (reg.test(value)) {
      callback(new Error('含有非法字符'))
    } else {
      callback()
    }
  },
  letterNum(rule, value, callback) {
    const reg = new RegExp(/^[A-Za-z0-9]+$/)
    if (!reg.test(value)) {
      callback('只允许输入英文与数字')
    } else {
      callback()
    }
  },
  idCard(rule, value, callback) {
    const reg = new RegExp(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/)
    if (!reg.test(value)) {
      callback(new Error('请输入正确身份证'))
    } else {
      callback()
    }
  },
  kmName(rule, value, callback) {
    const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9.·+\(\)-]+$/
    if (!reg.test(value)) {
      callback(new Error('请填写合法名称'))
    } else {
      callback()
    }
  }
}
