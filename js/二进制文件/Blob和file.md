# Blob和file

>JavaScript 在处理文件、二进制数据和数据转换时，提供了一系列的 API 和对象，比如 File、Blob、FileReader、ArrayBuffer、Base64、Object URL 和 DataURL。每个概念在不同场景中都有重要作用。下面的内容我们将会详细学习每个概念及其在实际应用中的用法。

## blob

Blob（Binary Large Object 二进制大对象）对象用于表示不可变的、原始的二进制数据。它可以用来存储文件、图片、音频、视频、甚至是纯文本等各种类型的数据。Blob 提供了一种高效的方式来操作数据文件，而不需要将数据全部加载到内存中，这在处理大型文件或二进制数据时非常有用。

创建一个 Blob 对象，语法如下：

```js
const blob = new Blob(blobParts, options);
```

1. blobParts: 一个数组，包含将被放入 Blob 对象中的数据，可以是字符串、数组缓冲区（ArrayBuffer）、TypedArray、Blob 对象等。
2. options: 一个可选的对象，可以设置 type（MIME 类型）和 endings（用于表示换行符）。

### Blob 的使用场景

#### 1.下载文件

通过 Blob 创建文件并生成下载链接供用户下载文件。

```javascript
const blob = new Blob(["This is a test file."], { type: "text/plain" });
const url = URL.createObjectURL(blob); // 创建一个 Blob URL
const a = document.createElement("a");
a.href = url;
a.download = "test.txt";
a.click();
URL.revokeObjectURL(url); // 释放 URL 对象
```

#### 2.上传文件

通过 FormData 对象将 Blob 作为文件上传到服务器

```javascript
const formData = new FormData();
formData.append("file", blob, "example.txt");

fetch("/upload", {
  method: "POST",
  body: formData,
}).then((response) => {
  console.log("File uploaded successfully");
});

```

#### 3. 接口获取的二进制数据

```javascript
// 假设通过接口获取到的二进制数据存储在变量 `binaryData` 中
fetch('your-api-endpoint')
  .then(response => response.blob()) // 将二进制数据转换为 Blob 对象
  .then(blob => {
    const imageUrl = URL.createObjectURL(blob); // 创建一个指向该 Blob 的 URL
    document.getElementById('image').src = imageUrl; // 将图片展示在 <img> 标签中
  });
```



## 总结

Blob 是纯粹的二进制数据，它可以存储任何类型的数据，但不具有文件的元数据（如文件名、最后修改时间等）。



**File 是 Blob 的子类**，File 对象除了具有 Blob 的所有属性和方法之外，还包含文件的元数据，如文件名和修改日期。

可以将 File 对象看作是带有文件信息的 Blob。

```js
const file = new File(["Hello, world!"], "hello.txt", { type: "text/plain" });

console.log(file instanceof Blob); // true
```

二者在文件上传和二进制数据处理的场景中被广泛使用。Blob 更加通用，而 File 更专注于与文件系统的交互。























作者：Moment
链接：https://juejin.cn/post/7413921824066551842
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。