---
title: RSA加密
date: 2019-12-05  14:21:18
tags: [Node, 开发笔记]
---

## RSA加密

**RSA加密算法**是一种**非对称加密算法**，RSA加密使用了"一对"密钥.分别是公钥和私钥,这个公钥和私钥其实就是一组数字!其二进制位长度可以是1024位或者2048位.长度越长其加密强度越大,目前为止公之于众的能破解的最大长度为768位密钥,只要高于768位,相对就比较安全.所以目前为止,这种加密算法一直被广泛使用.

### RSA加密与解密

- 使用**公钥**加密的数据,利用**私钥**进行解密
- 使用**私钥**加密的数据,利用**公钥**进行解密

### RSA秘钥生成方式   ( 公钥和私钥是成对存在的):

#### Windows系统可以使用git命令行工具

- 单击鼠标右键——git bash here 调出git bash
- 生成私钥，密钥长度为1024bit

```git
    $ openssl genrsa -out private.pem 1024
    Generating RSA private key, 1024 bit long modulus (2 primes)
    ...+++++
    .............................+++++
    e is 65537 (0x010001)
```

- 从私钥中提取公钥

```git
  $ openssl rsa -in private.pem -pubout -out public.pem
  writing RSA key
```

> 会在运行git bash 的地方生产2个文件：①public.pem  （公钥）②private.pem（私钥）

####   还有一个方法：利用[工具网站](https://links.jianshu.com/go?to=http%3A%2F%2Ftools.jb51.net%2Fpassword%2Frsa_encode)在线生成秘钥



### jsencrypt介绍

jsencrypt就是一个基于rsa加解密的js库

### 使用方法

- 安装

```js
  npm install jsencrypt 
```

- 引入

```js
  import JSEncrypt from 'jsencrypt'
```

- rsa加密          encrypt [ɪnˈkrɪpt]   （ 加密，将…译成密码）

```javascript
  var encryptor = new JSEncrypt()  // 创建加密对象实例
  //之前ssl生成的公钥，复制的时候要小心不要有空格
  var pubKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1QQRl0HlrVv6kGqhgonD6A9SU6ZJpnEN+Q0blT/ue6Ndt97WRfxtSAs0QoquTreaDtfC4RRX4o+CU6BTuHLUm+eSvxZS9TzbwoYZq7ObbQAZAY+SYDgAA5PHf1wNN20dGMFFgVS/y0ZWvv1UNa2laEz0I8Vmr5ZlzIn88GkmSiQIDAQAB-----END PUBLIC KEY-----'
  encryptor.setPublicKey(pubKey)//设置公钥
  var rsaPassWord = encryptor.encrypt('要加密的内容')  // 对内容进行加密
```

- rsa解密      decrypt  [di'krɪpt]   解密

```javascript
  var decrypt = new JSEncrypt()//创建解密对象实例
  //之前ssl生成的秘钥
  var priKey  = '-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgQC1QQRl0HlrVv6kGqhgonD6A9SU6ZJpnEN+Q0blT/ue6Ndt97WRfxtSAs0QoquTreaDtfC4RRX4o+CU6BTuHLUm+eSvxZS9TzbwoYZq7ObbQAZAY+SYDgAA5PHf1wNN20dGMFFgVS/y0ZWvv1UNa2laEz0I8Vmr5ZlzIn88GkmSiQIDAQABAoGBAKYDKP4AFlXkVlMEP5hS8FtuSrUhwgKNJ5xsDnFV8sc3yKlmKp1a6DETc7N66t/Wdb3JVPPSAy+7GaYJc7IsBRZgVqhrjiYiTO3ZvJv3nwAT5snCoZrDqlFzNhR8zvUiyAfGD1pExBKLZKNH826dpfoKD2fYlBVOjz6i6dTKBvCJAkEA/GtL6q1JgGhGLOUenFveqOHJKUydBAk/3jLZksQqIaVxoB+jRQNOZjeSO9er0fxgI2kh0NnfXEvH+v326WxjBwJBALfTRar040v71GJq1m8eFxADIiPDNh5JD2yb71FtYzH9J5/d8SUHI/CUFoROOhxr3DpagmrnTn28H0088vubKe8CQDKMOhOwx/tS5lqvN0YQj7I6JNKEaR0ZzRRuEmv1pIpAW1S5gTScyOJnVn1tXxcZ9xagQwlT2ArfkhiNKxjrf5kCQAwBSDN5+r4jnCMxRv/Kv0bUbY5YWVhw/QjixiZTNn81QTk3jWAVr0su4KmTUkg44xEMiCfjI0Ui3Ah3SocUAxECQAmHCjy8WPjhJN8y0MXSX05OyPTtysrdFzm1pwZNm/tWnhW7GvYQpvE/iAcNrNNb5k17fCImJLH5gbdvJJmCWRk=-----END RSA PRIVATE KEY----'
  decrypt.setPrivateKey(priKey)//设置秘钥
  var uncrypted = decrypt.decrypt(encrypted)//解密之前拿公钥加密的内容
```

### 目前的应用场景是：

在用户注册或登录的时候，用**公钥对密码进行加密**，

再去传给后台，后台用**私钥对加密的内容进行解密**，然后进行密码校验或者保存到数据库。



###  注意：

前端加密的意义有限，能防止密码明文在传输过程中被窃听和泄漏，但是无法阻止用户资料被盗取或被登录，意思是前端加密的密码只能保证明文密码不泄漏，但是**无法保证前端加密后的密码不泄漏**。（周期性更换密钥十分重要）