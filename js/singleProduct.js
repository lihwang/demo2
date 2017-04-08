// 封装一个加载商品内容的函数，这样每次点击的话就调用这个参数，将点击的li标签对应的data-shopid和data-areaid的属性值当做函数的参数传进去
function productLoad(shopid,areaid){
    $.ajax({
    dataType: 'json',
    url: 'http://139.199.157.195:9090/api/getgsproduct',
    // url:'http://mmb.ittun.com/api/getgsproduct',
    type: 'get',
    data: { shopid: shopid, areaid: areaid },//传入data数据，根据shopid=0和areaid=0获得对应的数据
    success: function(data) {
        var html = '';
        var result = data.result;
        $.each(result, function(i, v) {
            html += '<li>' +
                '<a href="https://item.m.jd.com/ware/view.action?wareId=3971793">' +
                '<div class="product-img">' +
                '<img src=' + v.productImg + '>' +
                '</div>' +
                '<p>' + v.productName + '</p>' +
                '<div class="clearfix product-price">' +
                '<span>' + v.productPrice + '</span>' +
                '<div>去凑单</div>' +
                '</div>' +
                '</a>' +
                '</li>';
        })
        $('.single-product>ul').html(html);
    }
})
}
productLoad(0,0);//刚进入页面的时候加载shopid=0和areaid=0

var shopid=0;
var areaid=0;
var flagShop=false;
var flagArea=false;
var that=null;
$('.single-shop').click(function() {
    $('.shop-pull').toggleClass('on').css('zIndex', 1);
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getgsshop',
        // url:'http://mmb.ittun.com/api/getgsshop',
        dataType: 'json',
        type: 'get',
        success: function(data) {
            var html = '<ul>';
            var result = data.result;
            $.each(result, function(i, v) {
                html += '<li data-shopId=' + v.shopId + '>' + v.shopName + '<em></em></li>';
            })
            html += '</ul>';
            $('.shop-pull').html(html);
         
            // console.log($(that).children('em'));
            $('.shop-pull li').on('click',function(){
                $(this).children('em').addClass('correct').end().siblings('li').children('em').removeClass('correct');
                shopid=$(this).attr('data-shopid');
                productLoad(shopid,areaid);
                $('.shop-pull').toggleClass('on');
                var title=$(this).text();
                $('.single-shop a').html((title+'<i></i>'));
                flagShop=true;      
            });
            //    $(that).children('em').addClass('correct');
            $('.shop-pull li').each(function(i,v){
                if($(v).attr('data-shopid')==shopid && flagShop){
                    $(v).children('em').addClass('correct');
                }
            })
        }
    })
});




$('.single-area').click(function() {
    $('.area-pull').toggleClass('on').css('zIndex', 2);
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getgsshoparea',
        // url:'http://mmb.ittun.com/api/getgsshoparea',
        dataType: 'json',
        type: 'get',
        success: function(data) {
            var html = '<ul>';
            var result = data.result;
            $.each(result, function(i, v) {
                html += '<li data-areaId=' + v.areaId + '>' + v.areaName + '<em></em></li>';
            })
            html += '</ul>';
            $('.area-pull').html(html);
            $('.area-pull li').on('click',function(){
                $(this).children('em').addClass('correct').end().siblings('li').children('em').removeClass('correct');
                areaid=$(this).attr('data-areaid');
                console.log(areaid);
                productLoad(shopid,areaid);
                $('.area-pull').toggleClass('on');
                var area=$(this).html().slice(0,2);
                $('.single-area a').html((area+'<i></i>'));
                flagArea=true;
            });
             $('.area-pull li').each(function(i,v){
                if($(v).attr('data-areaid')==areaid && flagArea){
                    $(v).children('em').addClass('correct');
                }
            });
        }
    })
});

$('.single-price').click(function() {
    $('.price-pull').toggleClass('on').css('zIndex', 3);
});

$('.back_top').click(function(){
    document.body.scrollTop=0;
})
