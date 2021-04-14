// 全局过滤器集群
var filters = {
    //生成min到max的随机数，最少传入1个参数,用法↓↓↓
    //@min 传入1个参数时取1 - 参数值以内的随机数
    //@max 传入2个参数时取min - max之间的随机数
    randomNum: function(value,min,max){ 
        //Math.floor(Math.random() * (max - min)) + min;
        return max?parseInt(Math.random()*(max-min+1)+min,10):parseInt(Math.random()*min+1,10);
    },
    //将number千万换成整型数字加文字
    //@type 转换类型 0或不传则是字母 否则就是汉字
    format_int: function (number,type) {
        let num = n = Number(number);
        if (num >= 1000 && num < 10000) {
          num = Math.floor(num / 1000); //取出整除一千后的值
          if (n == 1000) num += (!type?'K':'千');
          else num += (!type?'K+':'千多');
        } else if (num >= 10000) {
          num = Math.floor(num / 10000); //取出整除一千后的值
          if (n == 10000) num += (!type?'W':'万');
          else num += (!type?'W+':'万多');
        }
        return num;
    },
    substring: function (value,index) {
        return value.substring(0,index);
    },
    // 保留value后num个小数位
    cutOutNum: function (value, num) {
        return Number(value).toFixed(num)
    },
    //从start到end截取数组arr
    sliceArray: function (arr, start, end) {
        if(arr.length > 2){
            if (end) return arr.slice(start, end)
            else return arr.slice(start, arr.length);
        }else{
            return arr
        }
    },
    // 以field分隔str为数组
    splitArray: function(str,field){
        return str.split(field)
    },
    number: function(num){
        return Number(num)
    },
    //用户名加密-取文段首尾,中间的内容使用星号代替
    // @name 待处理字符串 
    // @n *号的个数(默认为中间替换掉的文字数量)
    starName: function(name,n){
        //不知道为什么,wxs中使用[...name]会报错
        // strArr = [...name]
        let strArr = name.split('')
        num = n ? strArr.length < n ? strArr.length - 2 : n : strArr.length - 2
        star = ''
        //不知道为什么,wxs中使用``会报错
        // return `${strArr[0]}${star}${strArr[strArr.length - 1]}`
        if(strArr.length == 1){//如果用户名只有1个字
            return '*'
        }else if(strArr.length == 2){//如果用户名只有2个字
            return strArr[0]+'*'
        }
        for (var index=0;index<num;index++) star += '*'
        return strArr[0]+star+strArr[strArr.length - 1]
    },
    // 号码加密过滤器
    // @str 待处理字符串 
    // @before 开头保留的位数(默认为1个)
    // @after 末尾保留的位数
    // @stars *号的个数(默认为中间替换掉的文字数量)
    toStarNumber: function(str,before,after,stars){
        var strL = [...str].length;
        before = before ? (after ? (strL > before + after ? before : (strL > before ? before : 1)) : (strL > before * 2 ? before : (strL > before ? before : 1))) : 1;
        after = after ? (strL > before + after ? before : (strL > before ? before : 1)) : (before == 1 ? 0 : before);
        stars = stars || strL - before - after;
        var star = ''
        if(strL == 1){//如果只有1个字
            return '*'
        }else if(strL == 2){//如果只有2个字
            return str.substring(0,1)+'*'
        }else if(strL == 3){
            return str.substring(0,1)+'*'+str.substring(2,3)
        }
        for (let index=0;index<stars;index++) star += '*'
        return `${str.substring(0,before)}${star}${str.substring(strL - after,strL)}`
    },
    //数组元素换位置
    //@i,@j需要相互替换的元素下标
    arrChange: function(arr,i,j){
        if(arr.length > 1){
            bus = arr[i]
            arr[i] = arr[j]
            arr[j] = bus
        }
        return arr
    },
    //获取26个英文字母的某一个
    //@index 26个的第几个的下标
    //@isMin 大写还是小写，默认大写
    getCharCode: function(index,isMin){
        return isMin ? String.fromCharCode(97+index) : String.fromCharCode(65+index)
    },
    //拼接字符串
    spliceString: function(str1,str2,sort){
        return sort ? (str2 + str1) : (str1 + str2);
    },
	//数字转为汉字数字
    numberToChar: function(number){
        let _arrayCHNNum = ['〇','一','二','三','四','五','六','七','八','九'];
        let _arrayCHNBit = ['','十','百','千','万','亿','兆'];
        let _numArray = number.toString().split('');
        if(_numArray.length === 2 && _numArray[0] === '1'){
            _numArray[0] = 'y';
        }
        for(let i = _numArray.length - 1; i >= 0; i--){
            if(_numArray[i] === '0') {
                _numArray[i] = 'x';
            }  else{
                break;
            }
        }
        let _s = '';
        let _bLast0 = false;
        for(let i = 0;i < _numArray.length;i++){
            if(_numArray[i] === 'x'){
                continue;
            }
            if(_numArray[i] === '0' && _bLast0){
                _bLast0 = true;
                continue;
            }
            if(_numArray[i] !== 'y'){//delete 1 in ten
                _s += _arrayCHNNum[parseInt(_numArray[i])];
            }
            if(_numArray[i] === '0'){
                _bLast0 = true;
                continue;
            }
            _bLast0 = false;
            _s += _arrayCHNBit[_numArray.length-i-1];
        }
        return _s;
    },
    warpTxt: function(val){
        let value = JSON.stringify(val);
        value = value.substring(1,value.length-1)
        return value.replace(/\\\\n/g,'<br/>');
    }
}
module.exports = filters;