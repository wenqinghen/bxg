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
        text:"lib/text"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        }
    }
});
//菜单切换  点击菜单项，完成内容的切换

require(["jquery","teacher"],function($,teacher){


    $(".list-group").on('click','a',function(){
        var value = $(this).attr('v');
        console.log(value)
        switch (value){
            case "teacher":
                teacher();
                break;
            case "course":
                $(".main").html("课程管理");
                break;
            case "courseAdd":
                $(".main").html("添加课程");
                break;
            case "sort":
                $(".main").html("课程分类");
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