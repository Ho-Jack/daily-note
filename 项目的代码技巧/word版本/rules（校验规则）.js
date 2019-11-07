//规则
var rules = {};

//必填
//trigger：触发校验的事件，blur 或者 change，默认为change
rules.required = function (trigger) {
    return {
        required: true,
        validator: (rule, value, callback) => {
            if (!rule.required) {
                callback();
            }
            if (typeof (value) == "undefined" || value == null) {
                callback(new Error('不能为空'))
            }else{
                if (value instanceof Array) {
                    //数组，判断是否有值
                    if (value.length == 0) {
                        callback(new Error('不能为空'))
                    }
                } else if (typeof (value) == "string") {
                    //字符串，判断是否有值
                    if (value.length == 0) {
                        callback(new Error('不能为空'))
                    }
                }
                callback();
            }
        },
        trigger: trigger
    }
}

//长度显示
//min：最小长度
//max：最大长度
//trigger：触发校验的事件，blur 或者 change，默认为change
rules.limit = function (min, max, trigger) {
    if (typeof (min) == 'undefined' || !min) {
        min = 0;
    }
    if (typeof (max) == 'undefined' || !max) {
        max = 0;
    }
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "change";
    }
    return {
        min: min,
        max: max,
        message: '不能少于' + min + '个字或者大于' + max + '个字',
        trigger: trigger
    }
}

//电子邮箱
//trigger：触发校验的事件，blur 或者 change，默认为change
rules.email = function (trigger) {
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "blur";
    }
    return {
        message: '邮箱格式错误',
        type: 'email',
        trigger: trigger
    }
}


//固定话和手机号码校验
//trigger：触发校验的事件，blur 或者 change，默认为blur
rules.phone = function (trigger) {
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "blur";
    }
    return {
        validator: (rule, value, callback) => {
            if (value) {
                let mobileReg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])[0-9]{8}$/;
                if (!mobileReg.test(value.trim())) {
                    let tel = value.toString()
                    if (tel.substring(0, 1) == "1") {
                        //说明不是手机号码，可能是固话
                        callback(new Error('是手机电话，请输入正确的手机号'))
                    } else if (tel.substring(0, 1) != "0") {
                        //先检查前面3位或4位是否区号
                        callback(new Error('是固话电话，请输入正确的区号'))
                    } else {
                        if (value.indexOf("-") == -1) {
                            callback(new Error('请在区号后加上"-"'))
                        } else {
                            let telephoneReg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
                            if (!telephoneReg.test(value.trim())) {
                                callback(new Error('请输入正确的固定电话'))
                            } else {
                                callback();
                            }
                        }
                    }
                } else {
                    //说明是手机号码
                    if (value) {
                        let mobileReg = /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])[0-9]{8}$/;
                        if (!mobileReg.test(value.trim())) {
                            callback(new Error('请输入正确的手机号'))
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            } else {
                callback();
            }
        },
        trigger: trigger
    }
}
//手机号码校验
//trigger：触发校验的事件，blur 或者 change，默认为blur
rules.mobile = function (trigger) {
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "blur";
    }
    return {
        validator: (rule, value, callback) => {
            if (value) {
                let mobileReg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
                if (!mobileReg.test(value.trim())) {
                    callback(new Error('请输入正确的手机号'))
                } else {
                    callback();
                }
            } else {
                callback();
            }
        },
        trigger: trigger
    }
}

//固定话校验
//trigger：触发校验的事件，blur 或者 change，默认为blur
rules.telephone = function (trigger) {
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "blur";
    }
    return {
        validator: (rule, value, callback) => {
            if (value) {
                //先检查前面3位或4位是否区号
                let tel = value.toString()
                if (tel.substring(0, 1) != "0") {
                    callback(new Error('请输入正确的区号'))
                } else {
                    if (value.indexOf("-") == -1) {
                        callback(new Error('请在区号后加上"-"'))
                    } else {
                        let telephoneReg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
                        if (!telephoneReg.test(value.trim())) {
                            callback(new Error('请输入正确的固定电话'))
                        } else {
                            callback();
                        }
                    }
                }
            } else {
                callback();
            }
        },
        trigger: trigger
    }
}

//邮编校验
//trigger：触发校验的事件，blur 或者 change，默认为blur
rules.postCode = function (trigger) {
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "blur";
    }
    return {
        validator: (rule, value, callback) => {
            if (value) {
                let maxLength = 6;
                let postCodeReg = /^[1-9]\d{5}(?!\d)$/;
                if (maxLength != value.trim().length && !postCodeReg.test(value.trim())) {
                    callback(new Error('请输入正确的邮政编码'))
                } else {
                    callback();
                }
            } else {
                callback();
            }
        },
        trigger: trigger
    }
}

//身份证号校验
//trigger：触发校验的事件，blur 或者 change，默认为blur
rules.idCard = function (trigger) {
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "blur";
    }
    return {
        validator: (rule, value, callback) => {
            if (value) {
                //15位和18位身份证号码的正则表达式
                var idCardReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                //如果通过该验证，说明身份证格式正确，但准确性还需计算
                if (idCardReg.test(value)) {
                    if (value.length == 18) {
                        let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                        let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                        let idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                        for (var i = 0; i < 17; i++) {
                            idCardWiSum += value.substring(i, i + 1) * idCardWi[i];
                        }
                        var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
                        var idCardLast = value.substring(17); //得到最后一位身份证号码
                        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                        if (idCardMod == 2) {
                            if (idCardLast == "X" || idCardLast == "x") {
                                callback();
                            } else {
                                callback("身份证号码不正确");
                            }
                        } else {
                            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                            if (idCardLast == idCardY[idCardMod]) {
                                callback();
                            } else {
                                callback("身份证号码不正确");
                            }
                        }
                    }
                } else {
                    callback("身份证号码不正确");
                }
            } else {
                callback();
            }
        },
        trigger: trigger
    }
}

//数字校验
//trigger：触发校验的事件，blur 或者 change，默认为blur
rules.number = function (min, max, trigger) {
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "blur";
    }
    return {
        validator: (rule, value, callback) => {
            if (value + "") {
                let min2 = null;
                let max2 = null;
                if (typeof(min) =="undefined") {
                    min2 = null
                }else if(typeof(min) =="function"){
                    min2 = min();
                }else if(min < 0 || isNaN(min)){
                    min2 = null
                }else {
                    min2 = min
                }
                if (typeof(max) =="undefined") {
                    max2 = null
                }else if(typeof(max) =="function"){
                    max2 = max();
                }else if(max < 0 || isNaN(max)){
                    max2 = null
                }else {
                    max2 = max
                }
                if (isNaN(value * 1)) {
                    callback(new Error('必须为数字'));
                } else {
                    if (min2!=null && value * 1 < min2 * 1) {
                        callback(new Error('必须大于等于'+min2));
                    }else if (max2!=null && value * 1 > max2 * 1) {
                        callback(new Error('必须小于等于'+ max2));
                    }else{
                        callback()
                    }
                }
            } else {
                callback();
            }
        },
        trigger: trigger
    }
}

//数字精度长度校验
//maxLength：最大长度
//precision：是精度,可以是数字，或者函数
//trigger：触发校验的事件，blur 或者 change，默认为blur
rules.precision = function (precision, maxLength, trigger) {
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "blur";
    }
    return {
        validator: (rule, value, callback) => {
            if (value) {
                if (isNaN(value)) {
                    callback(new Error('必须为数字'));
                } else {
                    //若是数字，则进行进度校验
                    let precision2 = 2;
                    if (typeof(precision) =="undefined") {
                        precision2 = 2//默认是2位小数
                    }else if(typeof(precision) =="function"){
                        precision2 = precision();
                    }else if(precision < 0 || isNaN(precision)){
                        precision2 = 2//默认是2位小数
                    }else {
                        precision2 = precision
                    }
                    let val = value.toString();
                    if (val.indexOf(".") != -1) {
                        if (precision2 == 0) {
                            callback(new Error('只能为整数'));
                        } else {
                            let length = (val.substring(val.indexOf(".") + 1, val.length)).length * 1//获取小数点后面的精度
                            if (length > precision2) {
                                callback(new Error('小数位后只能保留' + precision2 + '位'));
                            } else {
                                callback();
                            }
                        }
                    } else {
                        if(val.length > maxLength){
                            callback(new Error('只能'+maxLength+'位数'));
                        }else{
                            callback();
                        }
                    }
                }
            } else {
                callback();
            }
        },
        trigger: trigger
    }
}

//对比
//rulesObject 规则对象
//type 类型(moreThan:大于, lessThan:小于)
//propName 属性名
//otherPropName 属性名
//message：错误信息
//trigger：触发校验的事件，blur 或者 change，默认为change
rules.compare = (rulesObject, propName, otherPropName, message, trigger) => {
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "change";
    }
    return {
        validator: (rule, value, callback, source, options) => {
            //校验的字段必须要和propName名字一样，否则无法校验
            if (rulesObject.vueThis) {
                let propValue = eval("rulesObject.vueThis." + propName)//把字符变为一条有效的js语法
                let otherPropValue = eval("rulesObject.vueThis." + otherPropName)//把字符变为一条有效的js语法
                //日期比较
                if (typeof propValue === "object") {
                    if (propValue && otherPropValue) {
                        if (propValue instanceof Date) {
                            if (new Date(propValue).getTime() > new Date(otherPropValue).getTime()) {
                                callback(new Error(message))
                            } else {
                                callback();
                            }
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                } else if (typeof propValue === "number") {//数字比较
                    if (!isNaN(propValue) && !isNaN(otherPropValue)) {
                        if ((propValue * 1) > (otherPropValue * 1)) {
                            callback(new Error(message))
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            } else {
                console.log("必须定义vueThis属性")
                callback(new Error("代码错误，请检查"))
            }
        },
        trigger: trigger
    }
}

//限制不输入中文校验，且长度大于3位
//trigger：触发校验的事件，blur 或者 change，默认为blur
rules.ischinese = function (trigger) {
    if (typeof (trigger) == 'undefined' || !trigger) {
        trigger = "blur";
    }
    return {
        validator: (rule, value, callback) => {
            if (value) {
                var chineseReg =/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
                if (chineseReg.test(value)) {
                   callback("字符不能为中文");
                } else {
                  if (value.length > 3 && value.length < 20) {
                    callback();
                  }else{
                    callback("长度在 4 到 20个字符");
                  }
                }
            } else {
                callback();
            }

        },
        trigger: trigger
    }
}

export default rules
