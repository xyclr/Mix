<?php 
	$isSpm = $_GET['spm'];
	$title = 'seajs使用测试之简易弹框实现 &raquo; 张鑫旭-鑫空间-鑫生活';
	$jsurl = './main.js';
	if (isset($isSpm) && $isSpm == 1) {
		$title = 'seajs使用测试之简易弹框实现spm合并压缩版 &raquo; 张鑫旭-鑫空间-鑫生活';
		$jsurl = './__build/main.js';
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="description" content="seajs spm使用测试之简易弹框实现 » 张鑫旭-鑫空间-鑫生活" />
<meta name="description" content="seajs spm使用测试之简易弹框实现之实例页面" />
<meta name="keywords" content="seajs, spm, node.js, nodejs" />
<meta name="author" content="张鑫旭, zhangxixnu" />
<title><?php echo $title; ?></title>
<style>
.box {
	width: 256px;
	height: 193px;
	padding: .5em;
}
a img {
	border: 0;
}
</style>
</head>

<body>
<a href="beLoaded.html" id="test" title="点击查看大图">
	<img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" />
</a>
<script src="http://www.zhangxinxu.com/sp/seajs/dist/sea.js"></script>
<script>
seajs.use("<?php echo $jsurl; ?>", function(test) {
	test.bind(document.getElementById("test"));
});
</script>
</body>
</html>