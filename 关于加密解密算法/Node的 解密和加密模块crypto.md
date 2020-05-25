---
title: Node的 解密和加密模块crypto
date: 2019-12-05 14:48:39
tags: [Node, 开发笔记]
---

## Node的 解密和加密模块crypto

`crypto`模块的目的是为了提供通用的加密和哈希算法。
`crypto` 模块提供了加密功能，包含对` OpenSSL` 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

-  ####   `MD5` 和`SHA1` 

`MD5`是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：

```
const crypto = require('crypto');  //引入crypto模块

const hash = crypto.createHash('md5');  

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544
```

`update()`方法默认字符串编码为`UTF-8`，也可以传入Buffer。

如果要计算SHA1，只需要把`'md5'`改成`'sha1'`，就可以得到SHA1的结果`1f32b9c9932c02227819a4151feed43e131aca40`。

还可以使用更安全的`sha256`和`sha512`。

 >虽然 MD5 是一个广为流传的 Hash 算法, 但它并不安全且所生成的 Hash 值也是相当的薄弱。它主要的优点在于生成速度快且易于实现。但是，这也意味着它是容易被暴力攻击和字典攻击。例如使用明文和 Hash 生成的彩虹表可以快速地搜索已知 Hash 对应的原数据。
 >
 >此外，MD5 并没有避免 Hash 碰撞：这意味不同的密码会导致生成相同的 Hash 值。
 >
 >不过，如果你仍然需要使用 MD5，可以考虑为其加 salt 来进一步保证它的安全性。
 >使用 salt 让生成的 MD5 更加安全

#### `Hmac`

Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：

```
const crypto = require('crypto');

const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex')); // 80f7e22570...
```

只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。

#### `AES`

AES是一种常用的对称加密算法，加解密都用同一个密钥。

#### `Diffie-Hellman`

DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来。

#### `RSA`

RSA算法是一种非对称加密算法，即由一个私钥和一个公钥构成的密钥对，通过私钥加密，公钥解密，或者通过公钥加密，私钥解密。其中，公钥可以公开，私钥必须保密。

