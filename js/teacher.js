/**
 * Created by daijing on 2017/10/18.
 */

define([
    "jquery",
    "art",
    "text!tpls/teacherList.html",
    "teacherShow",
    "teacherAdd"],
    function($,art,teacherList,teacherShow,Add){

    return function(){
        //获取数据
        $.ajax({
            url:"/api/teacher",
            type:"get",
            success:function(res){
                if(res.code != 200) return console.log(res);

                //成功的时候代码
                var teacherData = res.result;
                //console.log(teacherData);
                var listArt = art.render(teacherList,{
                    result:teacherData
                });


                //点击查看按钮，显示查看模态框
                var $panel = $(listArt);
                $panel.on("click",".btn-show",function(){



                    //var teacherShow = art.render(teacherShow,{})
                    //console.log(teacherShow);
                    //$(teacherShow).appendTo("body").modal();
                    var id = $(this).parent().attr("tc_id");
                    teacherShow(id);
                })

                //点击增加讲师按钮，增加讲师
                $panel.on("click",".btn-add",function(){
                    Add();
                })



                $(".main").html($panel);

                //$panel.on("click",".btn-show",function(){
                //    alert("单独")
                //}).appendTo($(".main"));

            }
        })
    }


})