// 组件之间传值专用
//Bus.$emit("zifu", this.a++, "子组件向兄弟组件传值");    //存 Bus.$emit
//Bus.$on("zifu", (val, val1) => {    //取  Bus.$on
//   this.ccc = val;
//   this.ddd = val1;
// });
import Vue from 'vue'
export default new Vue;