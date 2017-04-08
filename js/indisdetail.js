$(function() {
    var productId = GetQueryString('productid'); //利用GetQueryString获取地址栏参数productid

    //利用对应的productid渲染出相应的数据
    $.ajax({
            url: 'http://139.199.157.195:9090/api/getdiscountproduct',
            type: 'get',
            dataType: 'json',
            data: { 'productid': productId },
            success: function(data) {
                //利用模板渲染数据
                var html = template('shopTem', data);
                $('.container').html(html);
                var commentHtml = ""; //拼接要渲染的li标签
                if(!$("textarea").val()){
                     $(".tjdp")[0].disabled="true";
                     $(".tjdp")[0].style.background="#ddd";
                }
                     
                // 文本框最多输入140字，输入时计算还可输入多少字，输入内容大于140以后不能输入
                $("textarea")[0].oninput = function() {
                    var length = 140 - ($("textarea").val().length);
                    if (length <= 0) {
                        var string = $("textarea").val().substring(0, 140);
                        $("textarea").val(string);
                        length=0;
                    }
                     $(".word i").html(length);
                      $(".tjdp").removeAttr('disabled');
                     $(".tjdp")[0].style.background="#ff841d";
                     if(!$("textarea").val()){
                     $(".tjdp")[0].disabled="true";
                     $(".tjdp")[0].style.background="#ddd";
                }
                  
                };
                // 面包屑导航自动生成
                $(".detail").html(data.result[0].productName);
                    // console.dir($(".tjdp")[0])
                    
                $(".tjdp").click(function() {
                    var time = new Date();
                    //拼接时间字符串
                    var clock = time.getFullYear() + '/' + time.getUTCMonth() + '/' + time.getDate();
                    var hsm = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
                    if ($("textarea").val().length < 6) {
                        alert("评论不能少于六个字符");
                        return;
                    }
                    // 评论列表为空或commentHtml为空时，即插入第一条评论
                    if (!commentHtml || !$(".list ul li")[0]) {
                        commentHtml =
                            '<li class="ui-border-b">' +
                            '<div class="userimg"><img src="images/none.gif"></div>' +
                            ' <div class="con">' +
                            ' <div class="name clearfix">' +
                            ' <div class="username">手机端网友101***23</div>' +
                            '<div class="time"> ' + clock + '&nbsp;' + hsm + ' </div>' +
                            '</div>' +
                            '<div class="content">' + $("textarea").val() + '</div>' +
                            ' <input type="button" value="删除" class="delete">' +
                            '</div>' +
                            ' </li>';
                        $(".list ul").append(commentHtml);
                    } else {
                        // 后面的每条评论都得插入第一天评论之前
                        commentHtml =
                            '<li class="ui-border-b">' +
                            '<div class="userimg"><img src="images/none.gif"></div>' +
                            ' <div class="con">' +
                            ' <div class="name clearfix">' +
                            ' <div class="username">手机端网友101***23</div>' +
                            '<div class="time"> ' + clock + '&nbsp;' + hsm + ' </div>' +
                            '</div>' +
                            '<div class="content">' + $("textarea").val() + '</div>' +
                            ' <input type="button" value="删除" class="delete">' +
                            '</div>' +
                            ' </li>';
                        var first = $(".list ul li")[0];
                        /* var newnode = $(commentHtml);*/
                        //把新评论插入到旧评论之前
                        $(commentHtml).insertBefore(first);
                    }

                    for (var i = 0; i < $(".delete").length; i++) {
                        //点击删除按钮删除对应的评论
                        $(".delete")[i].onclick = function() {
                            $(".list ul")[0].removeChild(this.parentNode.parentNode);
                        };
                    }
                    //发表评论后，文本框请空，字数重置成140
                    $("textarea").val("");
                    $(".word i").html(140);
                    $(".tjdp")[0].disabled="true";
                     $(".tjdp")[0].style.background="#ddd";

                })
            }
        })
        // 采用正则表达式获取地址栏参数
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
      $(".back_top").click(function() {
         document.body.scrollTop=0+"px";
       /*  $("body").animate({
             scrollTop: 0
         }, 200);*/
     });
})



