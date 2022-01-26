```
let time1='2021-8-10'
let time2='2021-08-10'
new Date(time1)    //Tue Aug 10 2021 00:00:00 GMT+0800 (中国标准时间)
new Date(time2)    //Tue Aug 10 2021 08:00:00 GMT+0800 (中国标准时间)
```





```
let time3='2021/8/10'
let time4='2021/08/10'
new Date(time3)    //Tue Aug 10 2021 00:00:00 GMT+0800 (中国标准时间)
new Date(time4)    //Tue Aug 10 2021 00:00:00 GMT+0800 (中国标准时间)
```





总结： 时间格式必须统一成 yyyy/mm/dd而不能用  ~~yyyy-mm-dd~~