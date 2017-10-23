/**
 * Created by daijing on 2017/10/18.
 */

define([
    "jquery",
    "art",
    "text!tpls/teacherList.html",
    "teacherShow",
    "teacherAdd",
    "teacherEdit",
    "teacherStatus"],
    function($,art,teacherList,teacherShow,Add,teacherEdit,teacherStatus){

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


                //点击编辑讲师按钮，进入讲师编辑模块
                $panel.on("click",".btn-edit",function(){
                    var id = $(this).parent().attr("tc_id");
                    teacherEdit(id);
                })

                //点击注销或者启用改变状态      采用事件委托的方式注册事件   给整个页面中的启用或者注销按钮祖册事件
                $panel.on("click",".btn-status",function(){
                    //声明一个变量保存按钮
                    var $btn = $(this);
                    //获取需要发送的数据 ,   将数据储存在按钮的 父元素中  ，然后通过属性和属性值获取。
                    var data = {
                        tc_id:$(this).parent().attr("tc_id"),
                        tc_status:$(this).parent().attr("tc_status")
                    }
                    //console.log(data);


                    //注销或者启用的事件写在teacherStatus的返回函数中，使用依赖注入的方法将返回的函数作为参参数调用
                    teacherStatus(data,function(status){
                        //将渲染出本行界面的函数作为一个参数传递给teacherStatus，在ajax发送成功之后调用，渲染页面结构
                        //这个函数再页面中作为函数调用，所有在此处this指向window，故在前面声明一个变量$btn保存这个按钮
                        $btn.parent().siblings(".tc_status").html(status==0?"启用":"注销");
                        $btn.html(status==0?"注销":"启用");
                        $btn.parent().attr("tc_status",status);
                    });
                })


                //将页面内容添加到页面中去
                $(".main").html($panel);
            }
        })
    }


})