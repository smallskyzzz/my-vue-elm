//解析url参数
export function urlParse() {
  let url = window.location.search
  let object = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr =url.match(reg)
  //['?id=12345', '&a=b']
  let obj = {}
  if(arr){
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let value = decodeURIComponent(tempArr[1])
      obj[key] = value
    })
    return obj
  }
}
