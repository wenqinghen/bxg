/**
 * Created by daijing on 2017/10/23.
 */
define(["jquery",
    "text!tpls/courseTpl.html",
    "art",
    "courseImg"],function($,courseTpl,art,courseImg){//此处panel是字符串形式的
    return function(){
        //ajax请求数据
        $.ajax({
            url:"/api/course",
            type:"get",
            success:function(res){
                if(res.code!=200) throw new Error(res.msg);
                //console.log(res);
                //将返回的数据编译到模板中去
                var courseTplData = art.render(courseTpl,res)
                //将编译好的模板放到页面中去。
                $(".main").html(courseTplData);

                //点击课程图片的a标签出现添加图片页面
                //使用事件委托，给模板添加事件委托给b标签
                $(".panel").on("click",".media-left",function(){
                    //e.preventDefault();

                    var sendData = $(this).attr("cs_id");
                    courseImg(sendData);
                })
            }
        })
    }
})