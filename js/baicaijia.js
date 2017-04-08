 $(function() {
     var html = "";
     var width = 0;
     var maxSwipe = 0;
     var distX = 0;
     //关闭广告
     $(".cuo").click(function() {
         // this.parentNode.style.display="none";
         $(this.parentNode).animate({
             height: 0
         }, 300);
     });
     //利用ajax获取标题数据
     $.ajax({
         type: "get",
         url: "http://139.199.157.195:9090/api/getbaicaijiatitle",
         dataType: 'json',
         success: function(data) {
             console.log(data);
             //循环遍历data结果，利用字符串拼接HTML
             for (var i = 0; i < data.result.length; i++) {
                 if (html == "") {
                     //动态生成第一个li时，给a标签设置默认样式，即添加对应的类名
                     html += '<li><a href="#" class="active"  data-id=' + data.result[i].titleId + ' >' + data.result[i].title + '</a></li>';
                     continue;
                 }

                 html += '<li><a href="#" data-id=' + data.result[i].titleId + ' >' + data.result[i].title + '</a></li>';

             }
             $(".title").html(html);
             //在ajax动态生成a标签后，获取a标签，点击对应标题，可以局部刷新页面
             $(".title li a").click(
                     function() {
                         //利用排他，清除ul中所有a的默认样式，当前的标签添加相应的样式
                         $(this.parentNode.parentNode).find("a").removeClass('active');
                         $(this).addClass('active');
                         //通过url传参id可以获得不同的数据并刷新页面
                         var id = parseInt(this.dataset.id);
                         $.ajax({
                             type: "get",
                             url: "http://139.199.157.195:9090/api/getbaicaijiaproduct",
                             //传入id获得不同的数据
                             data: { titleid: id },
                             dataType: 'json',
                             success: function(data) {
                                 // 利用模板生成html
                                 var html = template("prolist", data);
                                 //局部渲染页面
                                 $(".pro-list ul").html(html);
                             }
                         });
                     }
                 )
                 //获取每个li的宽度，并求出li的总宽度
             for (var i = 0; i < $(".title li").length; i++) {
                 width += $(".title li")[i].offsetWidth;
             }
             console.log("width:" + width);
             $(".title").width(width);

             //标题栏可以滑动的最大距离
             max = width - $(".titleBox")[0].offsetWidth;
             if (max > 0) //当屏幕的宽度小于ul的宽度时可以滑动，否则禁止滑动
             {
                 itcast.iScroll({
                     swipeDom: $(".titleBox")[0],
                     /*父容器对象*/
                     swipeType: 'x',
                     /*滑动的方向*/
                     swipeDistance: 250 /*缓冲的距离*/
                 });
             }
         }
     });
     /*    //让标题可以左右滑动
         //定义currx变量。保存当前位置
         var currX = 0;
         //标题栏可以滑动的最小距离
         var minSwipe = -100;
         //定义一个setTranslateX函数
         var setTranslateX = function(x) {
                 $(".title")[0].style.webkitTransform = "translateX(" + x + "px)";
                 $(".title")[0].style.transform = "translateX(" + x + "px)";
             }
             //获取touchstart的 startX值
         $(".title")[0].addEventListener("touchstart", function(e) {
                 startX = e.touches[0].clientX;
             })
             //移动的时候得到移动是的x值
         $(".title")[0].addEventListener("touchmove", function(e) {
                 moveX = e.touches[0].clientX;
                 distX = moveX - startX;
                 //获取移动的当前位置与开始的位置之差，判断当前位置是否在移动的范围内，若是，让其移动
                 if (Math.abs(currX + distX) < maxSwipe && 　(currX + distX) < -minSwipe&&max) {
                     setTranslateX(currX + distX);
                 }
             })
             //在触摸结束后，需要判断是否在定位区间内  否则吸附回去  定位回去
         $(".title")[0].addEventListener("touchend", function(e) {
                 //当往右滑的时候 大于 最大定位
                 if(max<=0)
                 {
                   return;
                 }
                 if (Math.abs(currX + distX) > maxSwipe-150 && (currX + distX) < 0) {
                     currX = -(maxSwipe-150);
                     setTranslateX(currX-40);
                 } else if ((currX + distX) > 0) {
                     //当往左滑的时候 小于 最小定位
                     currX = 0;
                     setTranslateX(0);
                 } else {
                     setTranslateX(currX + distX);
                     //记录当前的定位   上一次当前的定位 + 这一次改变的定位
                     currX = currX + distX;
                 }
             })
     */

     // 利用ajax获取商品列表，默认获取所有
     $.ajax({
         type: "get",
         url: "http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=0",
         dataType: 'json',
         success: function(data) {
             //利用模板生成html
             var html = template("prolist", data);
             //渲染页面
             $(".pro-list ul").html(html);
         }
     });
     //点击搜索时，搜索框显示，取消时隐藏
     $('.ic-search').click(function() {
         $('.ic-search').toggleClass('icon-cuo1');
         $(".search").show();
         if (!$(".ic-search").hasClass('icon-cuo1')) {
             $(".search").hide();

         }
     });

     //搜索商品是样式发生变化，利用input可以实时变化
     $("#search")[0].oninput = function() {
             if ($("#search").val()) { //判断搜素框内容是否为空
                 $(".second").show();
                 $(".second").click( //点击删除图片时清空搜素框内容
                     function() {
                         $("#search").val("");
                         $(".second").hide();
                     })
             } else {
                 $(".second").hide();
             }
         }
         //点击返回顶部时返回顶部
     $(".top").click(function() {
         // document.body.scrollTop=0+"px";
         $("body").animate({
             scrollTop: 0
         }, 200);
     });
 })
