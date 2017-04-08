/*
* @Author: lcj
* @Date:   2017-03-30 13:28:21
* @Last Modified by:   lcj
* @Last Modified time: 2017-04-02 19:22:20
*/


$(function () {
  // 动态加载数据
  //从URL中获取上一张页面穿过来的数据
  var couponid = GetQueryString('couponid') || 0;

  //获取点击对应图片的下标
  var imgIndex = 0;
  //照片总数
  var imgNum = 0;
  $.ajax({
    url: 'http://139.199.157.195:9090/api/getcouponproduct',
    type: 'get',
    dataType: 'json',
    data: { couponid: couponid },
    success: function (data) {
      //优惠券信息
      var html = template('couponproductTep', data);
      $('#couponproduct').html(html);
      //遮罩层优惠券照片
      var coverHtml = template('cover', data);
      $('.cover ul').html(coverHtml);


      //   给动态添加的数据绑定点击事件
      $('#couponproduct a').on('click', function (event) {
        // 获取当前对象在原对象集的下标
        imgIndex = $('#couponproduct a').index($(this));
        console.log(imgIndex)
        imgNum = $('#couponproduct a').length;
        event.preventDefault();
        //获取对应选项的照片且添加遮罩层里
        $('.cover li').eq(imgIndex).css('transform', 'translateX(0px)');

        $('.cover').fadeIn(500);
        $('.cover').on('click', function (e) {
          // console.log(e.target.className==='pic');
          // 判断点击事件对照片的点击判断
          if (e.target.className === 'pic') {
            $('.cover').css('display', 'none');
          }
        })
      });

      //左箭头点击轮播调用
      $('.left').on('click', function () {
        event.preventDefault();
        rigthCarousel();
      });
      //右箭头点击轮播调用
      $('.right').on('click', function (event) {
        event.preventDefault();
        leftCarousel();
      });
    }
  })



  function leftCarousel() {
    $('.cover li').css('transiton', 'none');
    imgIndex++;
    if (imgIndex > imgNum - 1) {
      imgIndex = imgNum - 1;
      return;
    }
    $('.cover li').eq(imgIndex).css('transform', 'translateX(100%)');
    $('.cover li').css('transiton', 'transform 1s');
    $('.cover li').eq(imgIndex - 1).css('transform', 'translateX(-100%)');
    $('.cover li').eq(imgIndex).css('transform', 'translateX(0px)');
  }



  function rigthCarousel() {
    $('.cover li').css('transition', 'none');  
    imgIndex--;
    if (imgIndex < 0) {
      imgIndex = 0;
      return;
    }
     $('.cover li').eq(imgIndex).css('transform', 'translateX(-100%)');
    $('.cover li').css('transition', 'transform 1s');
    $('.cover li').eq(imgIndex + 1).css('transform', 'translateX(100%)');
    $('.cover li').eq(imgIndex).css('transform', 'translateX(0px)');
  }








})