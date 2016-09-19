Mock.mock(/getBookList/,'get', function(options){
    console.info(options);
    var type = getQueryString(options.url,'type');
    var result = Mock.mock({
        'list|100': [{
            'index|+1' : 1,
            'name'     : "类型" + type + '@ctitle',
            'author'     : '@name',
            'pubTime': '@date',
            'price'    : '@integer(1, 300)',
            'bookId'    : '@id'
        }]
    });
    return result;
});
Mock.mock(/getBookDetail/,'get',function(options){
    var bookId = getQueryString(options.url, 'bookId');

    var result = Mock.mock({
        'detail|1': [{
            'bookId' : bookId,
            'name'     : '@ctitle',
            'author'     : '@name',
            'pubTime': '@date',
            'price'    : '@integer(1, 300)',
            'content' : '@cparagraph(100,1000)',
            'thumb' : '//img11.360buyimg.com/n1/jfs/t2491/330/130347277/93583/10ac6d51/55f0e840N6609b12b.jpg'
        }]
    });
    return result;
});

Mock.mock('http://www.baidu.com', {
    'name'	   : '[@name](/user/name)()',
    'age|1-100': 100,
    'color'	   : '[@color](/user/color)'
});

function getQueryString(url,name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.split("?")[1].match(reg);
    if (r != null) return unescape(r[2]); return null;
}