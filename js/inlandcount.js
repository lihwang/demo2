$(function() {
    var Data = {};
    // 渲染数据
    function rander() {
        var newData = { result: [] };
        var leng = 8;
        if (Data.result.length <= 8) {
            leng = Data.result.length;
        }
        for (var i = 0; i < leng; i++) {
            newData.result.push(Data.result.shift());
        }
        var html = template("prolist", newData);
        $(".prolist").append(html);
        flag = false;
    }
    // 加一个控制数据多次加载的开关，这是因为我们的ajax是异步的原因
    var flag = false;
    $(window).scroll(function() {
        if (Data.result.length == 0 || flag) {
            return;
        }
        var height = $(".prolist").height() + $("header").height() + $("footer").height() - $(window).height();
        var disHeight = height - $(window).scrollTop();
        if (disHeight < 50) {
            flag = true;
            rander();
        }

    });
    //利用ajax获取后台数据
    $.ajax({
        type: "get",
        url: "http://139.199.157.195:9090/api/getinlanddiscount",
        dataType: "json",
        success: function(data) {
            console.log(data);
            //利用模板渲染数据
            /*      var html=template("prolist",data);
                  $(".prolist").html(html);*/
            Data = data;
            rander();

        }
    });
    $(".top").click(function() {
        document.body.scrollTop = 0 + "px";
    });


})
