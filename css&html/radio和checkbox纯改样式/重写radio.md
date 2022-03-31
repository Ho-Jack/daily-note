> 最近在模仿 饿了么 用到 radio  发现没有现成的 就自己写了一个

```html
<view class="pay_radio" 
v-for="(item, index) in payRadio" :key="item.id" @click="check(index)">
<text>{{ item.label }}</text>
<text class="radio icon_select" 
      :class="{ isSelect: item.isChecked }">&#xe605;</text>		
</view>
```

```js

data() {
		return {
			
			payWay:1,
			payRadio: [
				{
					value: 0,
					label: '支付宝',
					isChecked: true
				},
				{
					value:1,
					label:'货到付款',
					isChecked:false
					}
			]
		};
	},
```

```js
	check(index){
			 console.log("这是"+index)
			   // 先取消所有选中项
			     this.payRadio.forEach((item) => {
			       item.isChecked = false;
			     });
			     //再设置当前点击项选中
			     this.payWay = this.payRadio[index].value;
			     // 设置值，以供传递
			     this.payRadio[index].isChecked = true;
			     console.log(this.payWay);
		}
```

```scss
@font-face {
	font-family: 'iconfont';
	src: url('//at.alicdn.com/t/font_1577525_i2kd32bd2bs.ttf') format('truetype');
}
.pay_radio{
				.icon_select{
					font-family: iconfont;
					color: #c3c4c5;
					font-size: 45rpx;
					margin-right: 15rpx;
					line-height: 40rpx;
				}
				.isSelect{
					color: #37de25;
				}
			}
```

