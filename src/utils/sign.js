import sort from './sort'

const signature = {
  signature: function () {
    let api_priv_key = 'xxxx'
    let num = new Date().getTime()
    let str = String(num - 1539328140705)
    let mp = 'aRHAbMQYiO'
    let ranNum = ''
    for (let i = 0; i < str.length; i++) {
      let n = str.charAt(i)
      ranNum += mp.charAt(n)
    }
    let sign = sort.sort(api_priv_key + num)
    return {
      ranNum: ranNum,
      sign: sign
    }
  },
}
export default signature
