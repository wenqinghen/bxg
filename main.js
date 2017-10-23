/**
 * index首页的js
 * Created by daijing on 2017/10/17.
 */

require.config({
    baseUrl:"js",
    paths:{
        jquery:"lib/jquery-2.1.4",
        bootstrap:"../assets/bootstrap/js/bootstrap.min",
        art:"lib/template-web",
        text:"lib/text",
        tpls:"../tpls",
        cookie:"lib\jquery.cookie.js"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        }
    }
});
//菜单切换  点击菜单项，完成内容的切换

require(["jquery","teacher","sort","course","bootstrap","cookie"],function($,teacher,sort,course){

    //var JsonData = sessionStorage.getItem("data");
    var JsonData = $.cookie("JsonData");
    if(!JsonData) return location.href = "login.html"

    var objData = JSON.parse(JsonData);
    $(".aside img").attr('src',objData.tc_avatar)
    $(".aside .name").text(objData.tc_name);


    //实现退出功能
    $(".logout").on("click",function(e){
        //阻止事件跳转
        e.preventDefault();
        //ajax告知服务器推出了
        $.ajax({
            url:"/api/logout",
            type:"post",
            success:function(res){
                if(res.code != 200) throw new Error(res.msg);
                //告知之后删除cookie
                $.removeCookie("JsonData");
                location.href = "login.html";

            }
        })
    })

    $(".list-group").on('click','a',function(){
        var value = $(this).attr('v');
        //console.log(value)
        switch (value){
            case "teacher":
                teacher();
                break;
            case "course":

                course();
                break;
            case "courseAdd":
                $(".main").html("添加课程");
                break;
            case "sort":
                sort();
                break;
            case "chart":
                $(".main").html("图表统计");
                break;
        }
        //点击换内容

        $(this).addClass("active").siblings().removeClass("active");



    })

    $(".list-group a[v=teacher]").trigger('click');
})