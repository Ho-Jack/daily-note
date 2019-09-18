#用来设置，在不同代码位置，重复引用时只需一次即可，避免代码冗余。
#实在需要重复引用时加上“！”即可，如 @import "compass/reset"   xxxxxx "@import "compass/reset!"
require 'compass/import-once/activate'


# 在部署时将其设置为项目的根：
http_path = "/"
#保存装换后的css文件
css_dir = "css"
#保存sass文件
sass_dir = "sass"
 #图片文件放在images目录
images_dir = "images"
#js文件放在javascripts目录
javascripts_dir = "javascripts" 
#默认的输出风格:expanded表示编译后保持原格式
#:compressed表示编译后压缩
#output_style = :compressed

#sass编译编码注释报错的解决办法
Encoding.default_external = Encoding.find('utf-8')

#Compass的编译命令是：compass compile
#自动编译命令：　compass watch

#编写自己的样式之前，有必要重置浏览器的默认样式。 ：@import "compass/reset";