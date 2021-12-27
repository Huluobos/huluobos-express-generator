# Chrome浏览器的跨域设置

> 做前后分离的webapp开发的时候，出于一些原因往往需要将浏览器设置成支持跨域的模式

## 方法一、
> 1.安装好Chrome浏览器，选中快捷方式点击右键属性

> 2.在属性页面的 **目标** 输入框中填入 
   
```
--disable-web-security
```

> 输入框中显示如下：
```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir=C:\MyChromeDevUserData
```

 
> 3.点击应用和确定后关闭属性页面，并打开chrome浏览器。如果浏览器出现提示“你使用的是不受支持的命令标记 --disable-web-security”，那么说明配置成功。

## 方法2：
新版本的的Chrome浏览器设置比之前严格，打开命令上加 *--disable-web-security* 之后还需要给出新的用户个人信息的目录。具体做法如下：

> 1.在电脑上新建一个目录，例如：

```
C:\MyChromeDevUserData
```

> 2.在属性页面中的目标输入框里加上    （--user-data-dir= 的值就是刚才新建的目录路径）

```
--disable-web-security --user-data-dir=C:\MyChromeDevUserData
```

> 3.点击应用和确定后关闭属性页面，并打开chrome浏览器。
再次打开chrome，发现有“*--disable-web-security*”相关的提示，说明chrome又能正常跨域工作了。
