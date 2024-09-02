# Liunx [ˈlaɪnʌks]

[ˈlaɪnʌks] 哩呐科斯 

Linux 中的 cURL 命令是一个功能强大的工具，可使用各种协议（包括 HTTP、HTTPS、FTP 等）将数据传入或传出服务器。它通常用于自动执行 Web 请求、测试 API 以及从互联网下载文件。cURL 功能多样，可处理各种任务，从简单的文件下载到复杂的多部分表单提交。

在本指南中，我们将探讨在 Linux 中使用 cURL 命令的 30 个实际示例。这些示例将涵盖常见用例，例如下载文件、向 API 发送数据、处理身份验证等，展示 cURL 在各种任务中的灵活性和强大功能。

## cURL 命令的语法

在我们继续使用 cURL 命令演示 30 个示例之前，最好先了解其语法：

```bash
curl [options] [URL]
```

在此语法中：

- 选项：这些是修改 cURL 行为的参数。
- URL：这是您想要交互的文件或资源的地址。

### cURL 命令选项

cURL 提供了许多选项，可让您自定义其行为。以下是一些最常用的选项：

- -O：从指定的 URL 下载文件。
- -I：从服务器获取 HTTP 标头。
- -u：指定服务器身份验证的用户凭据。
- -d：以POST请求的方式向服务器发送指定的数据。
- -x：指定用于请求的代理地址。

## Linux 中 30 个 cURL 命令示例

现在，让我们深入研究一些使用 cURL 命令的实际示例。每个示例前面都会有说明，后面会演示输出。

### 示例 1：从 URL 获取数据

cURL 的最基本用途是获取网页内容。具体操作如下：

```bash
curl https://www.example.com
```

此命令获取 www.example.com 网页的 HTML 内容。

### 示例 2：下载文件

cURL 还可用于从互联网下载文件。以下是示例：

```bash
curl -O https://www.example.com/file.txt
```

此命令从 www.example.com 下载文件 file.txt 并将其保存在当前目录中。

### 示例 3：发送 POST 请求

您可以使用 cURL 向服务器发送 POST 请求。操作方法如下：

```bash
curl -d "param1=value1&param2=value2" -X POST http://www.example.com
```

此命令向 www.example.com 发送 HTTP POST 请求，数据为 param1=value1¶m2=value2。

### 示例 4：获取 HTTP 标头

如果要从服务器获取 HTTP 标头，可以使用 -I 选项。以下是示例：



```bash
curl -I https://www.example.com
```

此命令从 www.example.com 获取 HTTP 标头。

### 示例 5：使用代理

如果需要使用代理，请使用 -x 选项指定。操作方法如下：

```bash
curl -x http://proxy.example.com:8080 https://www.example.com
```

此命令通过代理 proxy.example.com:8080 将请求发送到 www.example.com。

### 示例 6：发送 Cookies

您可以使用 -b 选项随请求一起发送 cookie。以下是示例：

```bash
curl -b "name=value" https://www.example.com
```

此命令向www.example.com发送一个name=value的cookie。

### 示例 7：发送用户代理

网站通常使用用户代理来提供适合客户端浏览器的内容。要随请求一起发送用户代理，请使用 -A 选项：

```bash
curl -A "Mozilla/5.0" https://www.example.com
```

此命令向 www.example.com 发送请求，并将用户代理设置为 Mozilla/5.0。

### 示例 8：以下重定向

某些 URL 会重定向到其他 URL。要跟踪这些重定向，请使用 -L 选项：

```bash
curl -L https://www.example.com
```

此命令遵循来自 www.example.com 的任何重定向。

### 示例 9：保存输出到文件

要将 cURL 命令的输出保存到文件，请使用 -o 选项：

```bash
curl -o output.html https://www.example.com
```

此命令将 www.example.com 的输出保存到 output.html。

### 示例10：使用FTP上传文件

cURL 可以使用 FTP 将文件上传到服务器。操作方法如下：

```bash
curl -T file.txt ftp://ftp.example.com --user username:password
```

此命令使用提供的用户名和密码将 file.txt 上传到 ftp.example.com。



### 示例 11：恢复下载

如果下载中断，您可以使用 -C – 选项恢复下载：

```bash
curl -C - -O https://www.example.com/file.txt
```

此命令从 www.example.com 恢复下载 file.txt。

### 示例 12：下载多个文件

要下载多个文件，请指定多个 URL：

```bash
curl -O https://www.example.com/file1.txt -O https://www.example.com/file2.txt
```

此命令从 www.example.com 下载 file1.txt 和 file2.txt。

### 示例 13：发送 DELETE 请求

要发送 DELETE 请求，请使用 -X DELETE 选项：

```bash
curl -X DELETE https://www.example.com/resource
```

此命令向 URL www.example.com/resource 发送 DELETE 请求。

### 示例 14：详细输出

有关请求和响应的详细信息，请使用 -v 选项：

```bash
curl -v https://www.example.com
```

此命令提供对 www.example.com 的请求的详细输出。

### 示例 15：静默模式

要隐藏进度条和错误信息，请使用 -s 选项：

```bash
curl -s https://www.example.com
```

此命令以静默模式获取 www.example.com 的内容。

### 示例16：显示下载进度

要以更易读的格式显示下载进度，请使用#选项：

```bash
curl -# -O https://www.example.com/file.txt
```

此命令从 www.example.com 下载 file.txt 并以进度条形式显示进度。

### 示例 17：发送 JSON 数据

要在 POST 请求中发送 JSON 数据，请使用 -H 选项设置内容类型：



```bash
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST https://www.example.com
```

此命令向 www.example.com 发送包含 JSON 数据的 POST 请求。

### 示例 18：将 cURL 与 API 结合使用

cURL 经常用于与 API 交互。以下是示例：

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com
```

此命令向 https://api.example.com 发送带有授权标头的请求。

### 示例 19：在后台下载文件

要在后台下载文件，请使用末尾带有“与”符号的 -O 选项：

```bash
curl -O https://www.example.com/file.txt &
```

此命令在后台从www.example.com下载file.txt。

### 示例 20：从文件发送数据

要通过 POST 请求从文件发送数据，请使用 @ 符号：

```bash
curl -d @data.txt -X POST https://www.example.com
```

此命令将包含 data.txt 数据的 POST 请求发送到 www.example.com。

### 示例21：从FTP服务器获取内容

cURL 可用于从 FTP 服务器获取内容。操作方法如下：

```bash
curl ftp://ftp.example.com/file.txt --user username:password
```

此命令使用提供的用户名和密码从 ftp.example.com 获取 file.txt。

### 示例 22：从受密码保护的网站获取内容

要从受密码保护的网站获取内容，请使用 -u 选项：

```bash
curl -u username:password https://www.example.com
```

此命令使用提供的用户名和密码从 www.example.com 获取内容。

### 示例 23：使用 SSL 从网站获取内容

要从具有 SSL 的网站获取内容，请使用 -k 选项：

```bash
curl -k https://www.example.com
```

此命令从 www.example.com 获取内容，忽略任何 SSL 证书警告。



### 示例 24：发送 PUT 请求

要发送 PUT 请求，请使用 -X PUT 选项：

```bash
curl -X PUT -d "data" https://www.example.com/resource
```

此命令向 www.example.com/resource 发送包含数据“data”的 PUT 请求。

### 示例 25：获取响应头

要仅获取响应头，请使用 -I 选项：

```bash
curl -I https://www.example.com
```

此命令仅从 www.example.com 获取响应标头。

### 示例 26：使用 Cookies 从网站获取内容

要从带有 cookie 的网站获取内容，请使用 -b 选项：

```bash
curl -b cookies.txt https://www.example.com
```

此命令使用存储在 cookies.txt 中的 cookie 从 www.example.com 获取内容。

### 示例 27：使用自定义标头从网站获取内容

要从具有自定义标题的网站获取内容，请使用 -H 选项：

```bash
curl -H "Custom-Header: Value" https://www.example.com
```

### 示例 28：从网站获取内容并设置超时

要从具有超时的网站获取内容，请使用 -m 选项：

```bash
curl -m 10 https://www.example.com
```

此命令从 www.example.com 获取内容，超时时间为 10 秒。

### 示例 29：以详细模式从网站获取内容

要以详细模式从网站获取内容，请使用 -v 选项：

```bash
curl -v https://www.example.com
```

此命令以详细模式从 www.example.com 获取内容，显示有关请求和响应的详细信息。

### 示例 30：从网站获取内容并显示进度表

要从网站获取内容并显示进度计，请使用 -# 选项：

```bash
curl -# https://www.example.com
```

此命令从 www.example.com 获取内容并显示进度表。