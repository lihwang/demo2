/*
* @Author: lcj
* @Date:   2017-03-30 19:07:02
* @Last Modified by:   lcj
* @Last Modified time: 2017-03-30 21:53:49
*/

$(function () {
  //从URL获取参数
  var brandtitleid=GetQueryString('brandTitleId')||0;
  // 从localStorage中获取比较品牌
  var brandType= window.localStorage.brandType;
  //销量数据显示数目
  var pagesize=4;
  $('.model:eq(0) h3').html(brandType+'哪个牌子好');
  $('.model:eq(1) h3').html(brandType+'产品销量排行');
  $('.model:eq(2) h3').html(brandType+'最新评论');
  // 动态添加面包屑导航
  $('.nav').append('<a href="#">> '+brandType+'哪个牌子好</a>');
  
  // 牌子排名参数
  $.ajax({
    // url: 'http://mmb.ittun.com/api/getbrand',
    url:'http://139.199.157.195:9090/api/getbrand',
    type: 'get',
    dataType: 'json',
    data: {"brandtitleid":brandtitleid },
    success:function (data) {
      // console.log(data);
      var html=template('goodbrandTep',data);
      $('.goodbrand ul').html(html);
    }
  })  
  // 销量数据加载
   $.ajax({
    // url: 'http://mmb.ittun.com/api/getbrandproductlist',
    url:'http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid='+brandtitleid,
    type: 'get',
    dataType: 'json',
    success:function (data) {
      console.log(data);
      var html=template('salenumTep',data);
      $('.salenum ul').html(html);
    }
  }) 
})