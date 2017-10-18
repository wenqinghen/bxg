/**
 * Created by daijing on 2017/10/18.
 */

define(["jquery","art","text!../tpls/teacherList.html"],function($,art,teacherList){
    return function(){
        //获取数据
        $.ajax({
            url:"/api/teacher",
            type:"get",
            success:function(res){
                if(res.code != 200) return console.log(res);

                //成功的时候代码
                var teacherData = res.result;
                console.log(teacherData);
                var listArt = art.render(teacherList,{
                    result:teacherData
                });


                var $panel = $(listArt);
                $panel.on("click",".btn-show",function(){
                    alert("单独绑定");
                })
                $(".main").html($panel);

                //$panel.on("click",".btn-show",function(){
                //    alert("单独")
                //}).appendTo($(".main"));


            }
        })
    }
})