import $ from 'jquery';
var UploadManager = {
    upload: function(file, arg,proj_name) {
        // console.log(arg);
        // console.log(file);
        var form_data = new FormData();
        form_data.append('resource', arg.target.result);
        form_data.append('proj_name', proj_name);
        form_data.append('file_name', file.name);
        form_data.append('data', 'hello world');
        // console.log(form_data);
        $.ajax({
            type: 'post',
            url: 'http://x.addev.com/instantad/upload.php',
            dataType: 'json',
            crossdomain: true,
            processData: false,
            contentType: false,
            data: form_data,
            success: function(msg) {
                console.log('上传成功', msg);
            },
            fail: function(msg) {
                console.log('上传失败', msg);
            },
            xhr: function() {
               var xhr = new window.XMLHttpRequest();
               //Upload progress
               xhr.upload.addEventListener("progress", function(evt){
                 if (evt.lengthComputable) {
                   var percentComplete = evt.loaded / evt.total;
                   //Do something with upload progress
                    console.log(percentComplete);
                    // if(inst_property.$refs.property_video) {
                    //   inst_property.$refs.property_video.$data.process = percentComplete*100;
                    // }
                 }
               }, false);

                return xhr;
            }
        });
    }
};

module.exports = UploadManager;
