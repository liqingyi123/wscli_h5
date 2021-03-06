/**
 * 数组去重合并
 * @arr1 必填，数组1
 * @arr2 必填，数组2
 * @field 依据字段
 * */
export function MergeArray(arr1, arr2, field) {
    if(typeof arr1[0] === 'object' || typeof arr2[0] === 'object'){
        let arr = [...arr1,...arr2]
        let res = []
        for(let item of arr){  //循环json数组对象的内容
        	let flag = true;  //建立标记，判断数据是否重复，true为不重复
        	for(let item2 of res){  //循环新数组的内容
                // console.log(item[field],item2[field])
        		if(item[field] == item2[field]){ //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
        			flag = false;
        		}
        	}
        	if(flag){ //判断是否重复
        		res.push(item); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
        	}
        }
        return res;
    }else{
        return Array.from(new Set([...arr1,...arr2]));
    }
}
/**
 * 冒泡排序
 * @array 必填，待排序数组
 * @field 依据字段
 * @sort 排序依据字段0正序  1倒叙
 * */
export function bubbleSort(array, field, sort) {
  /* 优化后的冒泡排序 */
  //每轮都记录最后一次发生交换的位置。假设本轮的最后一次交换发生在队伍m的位置中，就说明队从(m,n]的位置已经的同学已经归位了，下一轮只要冒泡比较剩下的位置从[1,m]的同学就好了，当最后的冒泡比较不发生交换时也就说明整个队伍所有人都归位了
  let n = array.length - 1,
    temp;
    console.log(sort)
  while (n != 0) {
    let Off = true, //该值用来判断不发生交换时把n置为0;
      len = n; //保存n的值,避免与n冲突。
    for (let i = 0; i < len; i++) {
      //判断是否含有排序依据字段
      let sortRes
      if(!sort || sort == 0){
          if (field) {
            if (IsNaN(Date.parse(array[i][field]))) { //如果可以转成日期时间戳
              sortRes = Date.parse(array[i][field]) > Date.parse(array[i + 1][field]);
            } else if (typeof array[i][field] === 'string') { //汉字的比较
              sortRes = array[i][field].localeCompare(array[i + 1][field]) > 0;
            } else { //数字的比较
              sortRes = array[i][field] > array[i + 1][field];
            }
          } else {
            if (!IsNaN(Date.parse(array[i]))) { //如果可以转成日期时间戳
              sortRes = Date.parse(array[i]) > Date.parse(array[i + 1]);
            } else if (typeof array[i] === 'string') {
              sortRes = array[i].localeCompare(array[i + 1]) > 0;
            } else {
              sortRes = array[i] > array[i + 1];
            }
          }
      }else{
          if (field) {
            if (IsNaN(Date.parse(array[i][field]))) { //如果可以转成日期时间戳
              sortRes = Date.parse(array[i][field]) < Date.parse(array[i + 1][field]);
            } else if (typeof array[i][field] === 'string') { //汉字的比较
              sortRes = array[i][field].localeCompare(array[i + 1][field]) < 0;
            } else { //数字的比较
              sortRes = array[i][field] < array[i + 1][field];
            }
          } else {
            if (!IsNaN(Date.parse(array[i]))) { //如果可以转成日期时间戳
              sortRes = Date.parse(array[i]) < Date.parse(array[i + 1]);
            } else if (typeof array[i] === 'string') {
              sortRes = array[i].localeCompare(array[i + 1]) < 0;
            } else {
              sortRes = array[i] < array[i + 1];
            }
          }
      }
      if (sortRes) {
          temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
          Off = false;
          n = i; //记录最后一次发生交换的值;
      }
    }
    if (Off) n = 0;
  }
  return array;
}
/**
 * 数组搜索
 * @array 必填，待查数组
 * @key 必填，关键字
 * @field 依据字段
 * */
export function searchArray(array,key,field){
    let resArr = [];
    if (field) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][field].indexOf(key) > -1) {
                resArr.push(array[i])
            }
        }
    } else{
        for (let i = 0; i < array.length; i++) {
            if (array[i].indexOf(key) > -1) {
                resArr.push(array[i])
            }
        }
    }
    return resArr;
}
/**
 * 缓存操作
 * @key 必填，键
 * @value 值
 * @type 缓存类型 非值local | 真值session
 * */
export let storage = {
    get: function(key,type){
        if(type){
            let value = sessionStorage.getItem(key);
            try{
                value = JSON.parse(value)
            }catch(e){
                value = value
            }
            return value;
        } 
        else{
            let value = localStorage.getItem(key);
            try{
                value = JSON.parse(value)
            }catch(e){
                value = value
            }
            return value;
        }
    },
    set: function(key,value,type){
        if(typeof value === 'object') value = JSON.stringify(value);
        if (type) sessionStorage.setItem(key,value);
        else localStorage.setItem(key,value);
    },
    remove: function(key,type){
        if(type) sessionStorage.removeItem(key);
        else localStorage.removeItem(key);
    },
    clear: function(type){
        if(type) sessionStorage.clear();
        else localStorage.clear();
    }
}
/**
 * 对象深拷贝
 * @obj 对象
 * */
export function deepCopy(obj){
    return JSON.parse(JSON.stringify(obj));
}
/**
 * 判断是否是数字
 * @value 对象
 * */
export function IsNaN(value) {
  return typeof value === 'number' && !isNaN(value);
}
/**
 * unicode编码转汉字
 * @str 对象
 * */
export function unicodeToCh(str){
	if(!str){
		return;
	}
	// 控制循环跃迁
	var len = 1;
	var result = '';
        // 注意，这里循环变量的变化是i=i+len 了
	for (var i = 0; i < str.length; i=i+len) {
		len = 1;
		var temp = str.charAt(i);
		if(temp == '\\'){
			// 找到形如 \u 的字符序列
			if(str.charAt(i+1) == 'u'){
				// 提取从i+2开始(包括)的 四个字符
				var unicode = str.substr((i+2),4); 
                                // 以16进制为基数解析unicode字符串，得到一个10进制的数字
				result += String.fromCharCode(parseInt(unicode,16).toString(10));
				// 提取这个unicode经过了5个字符， 去掉这5次循环
				len = 6;
			}
			else{
				result += temp;
			}
		}
		else{
			result += temp;
		}
	}
	return result;
}
/*
** 时间戳转换成指定格式日期
** eg. 
** dateFormat(11111111111111, 'Y年m月d日 H时i分')
** → "2322年02月06日 03时45分"
*/
export function dateFormat(timestamp, formats) {
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分
    formats = formats || 'Y-m-d';

    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    var myDate = timestamp? new Date(timestamp): new Date();

    var year = myDate.getFullYear();
    var month = zero(myDate.getMonth() + 1);
    var day = zero(myDate.getDate());

    var hour = zero(myDate.getHours());
    var minite = zero(myDate.getMinutes());
    var second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
};
/*
** 设备信息
*/
export function browserInfo(){
    let u = navigator.userAgent;
    let app = navigator.appVersion;
    let language = (navigator.browserLanguage || navigator.language).toLowerCase()
    let kernel = {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1 || u.indexOf('miniProgram') > -1 || u.indexOf('WeChat') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq", //是否QQ
        miniProgram: u.indexOf('miniProgram') > -1//是否是微信小程序
    }
    return {
        appVersion: app,//版本
        language: language,//语言
        kernel: kernel//内核
    }
}
//监听页面滚动
export function onPageScroll(callBack){
    window.onscroll = function() {
      //为了保证兼容性，这里取两个值，哪个有值取哪一个
      //scrollTop就是触发滚轮事件时滚轮的高度
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      callBack && callBack(scrollTop)
    }
}
// 复制功能工具函数
export function copyText(text) {
    let textarea = document.createElement("input"); //创建input对象
    let currentFocus = document.activeElement; //当前获得焦点的元素
    document.body.appendChild(textarea); //添加元素
    textarea.value = text;
    textarea.focus();
    let flag;
    if (textarea.setSelectionRange)
        textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
    else
        textarea.select();
    try {
        flag = document.execCommand("copy"); //执行复制
    } catch (eo) {
        flag = false;
    }
    document.body.removeChild(textarea); //删除元素
    currentFocus.focus();
    return flag;
}
// 将参数处理为key=value&key2=value2
export function setOptionToA(data) {
    let arr = [];
    for (let param in data) arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]))
    return arr.join('&');
}
// 获取地址栏中的参数并转为json格式
export function getUrlParme() {
    let url = decodeURI(location.search); //获取url中"?"符后的字串
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
        let strs = url.substr(1).split("&");
        for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//数字转为汉字数字
export function numberToChar(number){
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
}
/**
 * 无需打开图片页面就能下载图片
 * 李青逸 2021/3/31
 * 需要服务端配合修改Access-Control-Allow-Origin: *
 *  downPic({
        url: `${this.ossUrl}/robot/pic/active/gzh.png`,
        name: '物色官方公众号'
    },()=>{
        // TO DO
    })
  * */
export function downPic(sets,callBack){
    //下载图片地址和图片名
    let image = new Image();
    image.src = sets.url;
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        let ext = image.src.substring(image.src.lastIndexOf('.')+1).toLowerCase();//获取文件的后缀名
        let _dataURL = canvas.toDataURL('image/'+ext); //得到图片的base64编码数据
        let blob_ = dataURLtoBlob(_dataURL); // 用到Blob是因为图片文件过大时，在一部分浏览器上会下载失败，而Blob就不会
        let url = {
            name: sets.name || "图片下载工具函数by李青逸", // 图片名称不需要加.png后缀名
            src: blob_
        };
        if (window.navigator.msSaveOrOpenBlob) {// if IE
            navigator.msSaveBlob(url.src, url.name);//filename文件名包括扩展名，下载路径为浏览器默认路径
        } else {
            let link = document.createElement("a");
            link.setAttribute("href", window.URL.createObjectURL(url.src));
            link.setAttribute("download", url.name + '.png');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        callBack && callBack();
    };
    function dataURLtoBlob(dataurl) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }
}
/**
 * 复制多个图片和文字到剪贴板
 * 李青逸 2021/4/7
 *  copyInfo({
        txts: '请复制我',
        imgs: ['https://img.shop.wusehaowu.com/20210407/da46894987254688af008a95ad121da9.png','https://t00img.yangkeduo.com/goods/images/2021-02-27/1e5bc93f957fefabc13d994a9f379dda.jpeg']
    })
  * */
export function copyInfo(sets){
    let imgDiv = document.createElement('div')
    imgDiv.id = '__imgDiv';
    imgDiv.setAttribute('style','z-index: -1;position: fixed;')
    let child = '';
    if(sets.txts){
        if(typeof sets.txts === 'string'){
            child += `<span>${sets.txts}</span>`
        }else{
            sets.txts.forEach(item=>{
                child += `<span>${item}</span>`
            });
        }
    }
    if(sets.imgs){
        if(typeof sets.imgs === 'string'){
            sets.imgs = sets.imgs.indexOf('https')>-1?sets.imgs.replace('https','http'):sets.imgs;
            child += `<img src="${sets.imgs}" />`
        }else{
            sets.imgs.forEach(item=>{
                item = item.indexOf('https')>-1?item.replace('https','http'):item;
                child += `<img src="${item}" />`
            });
        }
    }
    imgDiv.innerHTML = child;
    document.body.insertBefore(imgDiv,document.body.lastChild)
    let dom = document.getElementById('__imgDiv')
    console.log(dom)
    if (window.getSelection) {//chrome等主流浏览器
        let selection = window.getSelection();
        let range = document.createRange();
        range.selectNodeContents(dom);
        selection.removeAllRanges();
        selection.addRange(range);
    } else if (document.body.createTextRange) {//ie
        let range = document.body.createTextRange();
        range.moveToElementText(dom);
        range.select();
    }
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    imgDiv.parentNode.removeChild(imgDiv);
}
export function fullScreen(fn1,fn2){
    document.addEventListener("fullscreenchange", function(e) {
      // console.log("fullscreenchange", e);
        if (document.fullscreenElement) {
            fn1 && fn1();
        } else {
            fn2 && fn2();
        }
    });
    document.addEventListener("mozfullscreenchange", function(e) {
      // console.log("mozfullscreenchange ", e);
        if (document.fullscreenElement) {
            fn1 && fn1();
        } else {
            fn2 && fn2();
        }
    });
    document.addEventListener("webkitfullscreenchange", function(e) {
      // console.log("webkitfullscreenchange", e);
        if (document.fullscreenElement) {
            fn1 && fn1();
        } else {
            fn2 && fn2();
        }
    });
    document.addEventListener("msfullscreenchange", function(e) {
      // console.log("msfullscreenchange", e);
        if (document.fullscreenElement) {
            fn1 && fn1();
        } else {
            fn2 && fn2();
        }
    });
}