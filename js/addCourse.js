/**
 * Created by daijing on 2017/10/23.
 */
define(["jquery",
    "text!tpls/addCourse.html"],function($,addCourse){
    return function(){
        var $AddCoursetpl = $(addCourse).on("hidden.bs.modal",function(){
            $AddCoursetpl.remove();//模态框隐藏之后删除模态框
        }).on("submit","form",function(e){
            //阻止默认事件
            e.preventDefault();
            //获取表单中数据(设置name属性)，并通过AJAX提交数据
            var sendData = $("form").serialize();
            $.ajax({
                url:"/api/course/create",
                type:"post",
                data:sendData,
                success:function(res){
                    if(res.code!=200) throw new Error(res.msg);
                    $AddCoursetpl.modal("hide");//提交成功之后隐藏模态框
                    //trigger模拟点击课程分类按钮（可以不用模拟）
                    $(".course ").trigger("click");
                }
            })
        }).appendTo("body").modal();



    }
})