export function savaToLocal(id, key, value) {
  //存到localstroage,可以在浏览器中使用localStorage查看
  let seller = window.localStorage.__seller__
  if(!seller){
    seller = {}
    seller[id] = {}
  }else{
    seller = JSON.parse(seller)
    if(!seller[id]){
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFromLocal(id,key,def) {
  let seller = window.localStorage.__seller__
  if(!seller){
    return def
  }
  seller = JSON.parse(seller)[id]
  if(!seller){
    return def
  }
  let ret = seller[key]
  return ret || def
}
