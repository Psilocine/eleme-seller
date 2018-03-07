export default {
  save (id, key, val) {
    let seller = window.localStorage.__seller__
    if (!seller) {
      seller = {}
      seller[id] = {}
    } else {
      seller = JSON.parse(seller)
      if (!seller[id]) {
        seller[id] = {}
      }
    }
    seller[id][key] = val
    window.localStorage.__seller__ = JSON.stringify(seller)
  },
  load (id, key) {
    let seller = window.localStorage.__seller__
    if (!seller) {
      return false
    }
    seller = JSON.parse(seller)[id]
    if (!seller) {
      return false
    }
    let ret = seller[key]
    return ret || false
  }
}
