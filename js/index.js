/*
 * @Author: lcj
 * @Date:   2017-03-28 19:47:26
 * @Last Modified by:   lcj
 * @Last Modified time: 2017-03-30 15:48:09
 */

'use strict';
$(function() {
    //首页获取菜单栏数据
    $.ajax({
        type: "get",
        url: "http://139.199.157.195:9090/api/getindexmenu",
        dataType: "json",
        success: function(data) {
            // data=data.result;
            // console.log(data);
            var html = template('menuTep', data);
            $('#menu').html(html);

            //首页菜单栏更多点击
            var $menuMore = $('#menu li:nth-last-of-type(-n+4)');
            var $menu_7 = $('#menu li[indexmenuid="7"]');
            $menu_7.on('click', function(e) {
                // 清除默认行为，#跳转网页
                e.preventDefault();
                $menuMore.each(function(i, v) {
                    v.classList.toggle('show');
                });
            })
        }
    });

    $.ajax({
        type: "get",
        url: "http://139.199.157.195:9090/api/getmoneyctrl",
        dataType: "json",
        success: function(data) {
            //   console.log(data)
            var html = template('goodsTep', data);
            $('.goods_list').html(html);
        }
    });
    // 跳转到首页
    $('.back_top').on('click', function(e) {
        e.preventDefault();
        // $(document.body).get(0).scrollTop=0;
        scrollTo(0, 0);
    })


})