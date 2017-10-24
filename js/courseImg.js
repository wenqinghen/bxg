/**
 * Created by daijing on 2017/10/23.
 */
define(["jquery",
    "text!tpls/courseImg.html",
    "art",
    ""
],function($,courseImg,art){

    return function(sendData){

        //获取当前点击的这张图片原本的内容，添加到页面中去
        $.ajax({

            url:"/api/course/picture",
            type:"get",
            data:{cs_id:sendData},
            success:function(res){
                if(res.code!=200) throw new Error(res.msg);
                //console.log(res);
                var courseImgTpl = art.render(courseImg,res.result);
                $(".main").html(courseImgTpl);

                //页面加载完成后上传内容
                $("#fileImg").uploadify({
                    formData:{cs_id:sendData},
                    fileObjName:"cs_cover_original",
                    swf:"../assets/uploadify/uploadify.swf",
                    uploader:"/api/uploader/cover",
                    //multi:false,
                    onUploadSuccess:function(file){
                        //$(".course ").trigger("click");
                        console.log(file);
                    }
                })
            }
        })
    }

})