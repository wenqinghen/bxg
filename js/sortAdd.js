/**
 * Created by daijing on 2017/10/21.
 */
define(["jquery",
    "text!tpls/sortAddTpl.html",
    "art"
],function($,sortAddTpl,art){
    return function(){

        //请求顶级分类数据
        $.ajax({
            url:"/api/category/top",
            type:"get",
            success:function(res){
                if(res.code != 200) throw new Error(res.msg);

                //给res.result数组开始追加一个数据。
                res.result.unshift({"cg_name":"顶级分类","cg_id":"0"});
                var tplRender = art.render(sortAddTpl,res)


                //添加分类模态框追加到页面中
                var $sortAddTpl = $(tplRender)
                    .on("hidden.bs.modal",function(){
                        $sortAddTpl.remove();
                    })

                    //提交的时候发送数据
                    .on("submit",function(e){
                        e.preventDefault();
                        //数据    在获取数据之前一定要给表单元素设置属性值和value值
                        var sendData = $("form").serialize();
                        console.log(sendData);

                        //添加分类ajax请求
                        $.ajax({
                            url:"/api/category/add",
                            type:"post",
                            data:sendData,
                            success:function(res){
                                console.log(res.code);
                                if(res.code != 200) throw new Error(res.msg);
                                console.log(res);
                                $sortAddTpl.modal("hide");
                                $(".sort").trigger("click");
                            }
                        })
                    }).appendTo("body").modal();

            }
        })

    }
})