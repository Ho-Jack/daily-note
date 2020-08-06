 window.onload必须等到页面内包括图片的所有元素和资源加载完毕后才能执行

$(document).ready()是DOM加载完毕后就执行，不必等到整个网页资源加载完毕      

所以，使用document.ready()方法的执行速度比window.onload的方法要快。