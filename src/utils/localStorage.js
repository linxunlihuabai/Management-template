export function saveLocalStorage(name, data) { // localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

export function getLocalStorage(name) { // localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name))
}

export function delLocalStorage(name) { // localStorage 删除数组对象的方法
  if (name) {
    localStorage.removeItem(name)
  } else {
    localStorage.clear()
  }
}
