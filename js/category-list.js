$(function(){
    template.helper('getNum', getNum);
    var categoryid = GetQueryString('categoryid');
    var pageid = GetQueryString('pageid');
    var num = 0;
    $.ajax({
        url: "http://139.199.157.195:9090/api/getproductlist?categoryid="+categoryid+"&pageid="+pageid,
        dataType: "json",
        success: function (data) {
            // console.log(data);
            num = parseInt(data.totalCount / data.pagesize);
            var str = '';
            for(var i = 0; i < num; i++){
                str += '<option value='+(i+1)+'>'+(i+1)+'/'+num+'</option>';
            }
            $('#money_sel').html(str);
            var html = template('tem_cat_list', data);
            $('#container').html(html);
        }
    });
    // 改变下拉框
    $('#money_sel').on('change', function func(){
        // console.log($(this).val());
        var val = parseInt($(this).val());
        console.log(val);
        var categoryid = GetQueryString('categoryid');
        // console.log(val);
        $.ajax({
            url: "http://139.199.157.195:9090/api/getproductlist?categoryid="+categoryid+"&pageid="+val,
            dataType: "json",
            success: function (data) {

                var html = template('tem_cat_list', data);
                $('#container').html(html);
            }
        });
    });
    // 点击上一个
    $('main .change .left button').on('click',function(){
        var val = parseInt($('#money_sel').val()) - 1;
        if(val < 1) return;
        var categoryid = GetQueryString('categoryid');
        $('#money_sel option').eq(val-1).prop('selected','selected');
        $.ajax({
            url: "http://139.199.157.195:9090/api/getproductlist?categoryid="+categoryid+"&pageid="+val,
            dataType: "json",
            success: function (data) {
                var html = template('tem_cat_list', data);
                $('#container').html(html);
            }
        });
    })
    // 点击下一个
    $('main .change .right button').on('click',function(){
        // var val = parseInt($('#money_sel').val()) + 1;
        // console.log(this);
        var val = parseInt($('#money_sel').val()) + 1;
        if(val > num) return;
        var categoryid = GetQueryString('categoryid');
        $('#money_sel option').eq(val-1).prop('selected','selected');
        $.ajax({
            url: "http://139.199.157.195:9090/api/getproductlist?categoryid="+categoryid+"&pageid="+val,
            dataType: "json",
            success: function (data) {
                var html = template('tem_cat_list', data);
                $('#container').html(html);
            }
        });
    })
})

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
function getNum(s){
    return s.replace(/[^0-9]/ig,"");
}
