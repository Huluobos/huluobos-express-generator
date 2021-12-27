# 富文本专题课

对于经常接触后台的同学而言。富文本是最常见不过的需求了。那么，我们在项目中应该如何使用富文本呢？以及都有哪些富文本编辑器值得去采用的呢？下面，将介绍一些市面上经常用到的富文本编辑器。

富文本编辑器的选择：

**ckeditor**：一家老牌的富文本公司做的产品。功能很丰富，ui也很美观。号称是插件最丰富的富文本编辑器。
![image](http://pbl.yaojunrong.com/TIM%E6%88%AA%E5%9B%BE20180411005645.png)

**quill**：一家老牌的富文本公司的产品。很简约，功能也相对齐全，旧版的党建E家项目用的就是这个编辑器。
![image](http://pbl.yaojunrong.com/TIM%E6%88%AA%E5%9B%BE20180411010021.png)

**wangEditor**：提起富文本，不得不说起这个国人自己制作的富文本编辑器，靠一个人开发了这个富文本，也是很强。当然，因为文档是中文的缘故，所以，也是最容易入门的富文本编辑器。

**tinyMce**: 一个功能非常齐全，界面也很美观的编辑器，不过因为文档是全英文，且相关api藏得比较深。入门比较难。但因为功能较丰富，所以，受到广大开发者喜爱。

![image](http://pbl.yaojunrong.com/TIM%E6%88%AA%E5%9B%BE20180411010605.png)

**百度UEditor**:百度推出的一款富文本，因为很久不更新了，所以，目前采用需要谨慎。当然，因为是百度公司推出的，之前的很多项目采用过这个富文本编辑器。

当然，富文本相关的配置这节课不深究。我们用富文本，无非就是文字加上格式。以及相应的图片上传。

图片上传向来是难点。那么，我们就主要讲讲wangeditor、tinyMce、以及quill进行图片上传的一些配置。

## wangeditor

1、初始化编辑器,本文将采用Vue演示。

```javascript
import E from 'wangeditor'

this.$nextTick(() => {
    this.editor = new E(this.$refs.wang);
    this.editor.create();
})

```
2、集成七牛上传。

因为我们在业务当中的上传图片，可能需求比较多。所以，我们不采取官方的上传到七牛云存储的方案。采用自定义上传图片事件的方案。更加容易定制我们的业务逻辑。翻阅文档，可以看到以下内容。
![image](http://pbl.yaojunrong.com/TIM%E5%9B%BE%E7%89%8720180411011558.png)

翻阅文档可以看到，在customConfig.customUploadImg这个钩子当中，可以对点击图片的上传按钮进行操作。files是我们选择的文件，insert参数是上传成功后，将图片链接填入的函数。

so，代码如下：

```javascript
var form = new FormData();
    form.append("file", files[0]);
    form.append("token", that.token);

    axios.post("https://upload-z1.qiniup.com", form, {headers: {"Content-Type": "multipart/form-data"}}).then(res => {
    insert(res.data.url)
})


```

其中，token是从后端获取到的上传凭证。当我们上传完成之后。将图片链接填入到insert即可。该代码依赖axios，需要使用原生ajax的请自行实现。

**注意**：该钩子必须在create()之前调用，不然不会出现图片上传按钮。

## tinyMce
1、初始化编辑器

由于该富文本不支持npm安装，所以，采用直接引入的方案引入。

![image](http://pbl.yaojunrong.com/TIM%E6%88%AA%E5%9B%BE20180411013203.png)

引入成功后，该编辑器将在Window对象上绑定一个tynyMCE的对象。我们可以使用这个对象去初始化我们的项目。

```javascript
this.$nextTick(() => {
    window.tinyMCE.init({
    selector: "#tiny",
    language: "zh_CN",
    menubar: "file edit insert view format table",
    toolbar: ['bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap	 preview anchor pagebreak fullscreen insertdatetime media table emoticons forecolor backcolor'],
    plugins: ['advlist anchor autolink autoresize autosave bbcode code codesample colorpicker colorpicker contextmenu directionality emoticons fullpage fullscreen hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
    images_upload_handler: function(blobInfo, success, failure) {
            var form = new FormData();
            form.append("file",blobInfo.blob());
            form.append("token", that.token);
            axios.post("https://upload-z1.qiniup.com", form, {headers: {"Content-Type": "multipart/form-data"}}).then(res => {
              success(res.data.url)
        })
    }
    })
})

```

**代码说明**：

selector当中盛放我们初始化的容器id。

language需要提前下载语言包

语言包链接如下：

[https://www.tinymce.com/download/language-packages/](https://www.tinymce.com/download/language-packages/)

其他说明可以去看官网的文档。英文功底好的同学可以尝试。

相关API：

取得内容：
```javascript
window.tinyMCE.get("tiny").getContent()
```

设置内容：
```javascript
window.tinyMCE.get("tiny").setContent(`<h1>我是内容</h1>`)

```

内容改变监听钩子：

```javascript
    window.tinyMCE.get("tiny").on('NodeChange Change KeyUp SetContent', () => {
      console.log(
        window.tinyMCE.get("tiny").getContent()
      )
})

```

取得纯文本：

```javascript
window.tinyMCE.get("tiny").getContent({format: "text"})

```
