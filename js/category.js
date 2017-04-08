$(function () {
    $("#fixed_close").on('click', function () {
        // console.log($(this).parent().parent())
        $(this).parent().parent().fadeOut(500);
    })
    var arr = [];
    $.ajax({
        url: 'http://mmb.ittun.com/api/getcategorytitle',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            var html = template('tmp_category', data);
            $('#main').html(html);
            for (var i = 0; i < data.result.length; i++) {
                arr.push('#' + data.result[i]._id);
            }
            console.log(arr);
            $('.panel-heading').on('click', function () {
                var titleId = $(this).attr('aa');
                var that = $(this);
                $.ajax({
                    url: "http://139.199.157.195:9090/api/getcategory?titleid="+titleId,
                    dataType: "json",
                    success: function (data) {
                        console.log(that.next('div').find('.table'));
                        var str = '';
                        for(var i = 0; i < data.result.length; i++){
                            str += '<li><a href="category-list.html?categoryid='+data.result[i].categoryId+'&pageid=1">'+data.result[i].category+'</a></li>';
                        }
                        if(data.result.length % 3 === 1){
                            str += '<li></li><li></li>';
                        }else if(data.result.length % 3 === 2){
                            str += '<li></li>';
                        }
                        that.next('div').find('.table').html(str);
                    }
                });
            }).trigger('click');
        }
    })
})