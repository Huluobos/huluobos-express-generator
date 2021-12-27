#### 1、 MongoDB数据库备份、

    mongodump -h dbhost -d dbname -o dbdirectory
- dbhost： MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017

- dbname ： 需要备份的数据库实例，例如：didi

- dbdirectory： 备份的数据存放位置绝对路径、
	当然该目录需要提前建立，例 C:\Users\Huluobos\Desktop\server  这个目录里面存放该数据库实例的备份数据。
	指令运行后会出现 didi 的文件夹 这个 idi 文件夹才是我们要用的
---

#### 2、git代码到github


---


#### 3、登录服务器：

	ssh huashan@mng.yaojunrong.com
	密码    Huashan

- ll      //查看当前目录下所有文件，以列表的形式展示
- ls      //查看当前目录下所有文件
- mkdir name //新建文件夹
- exit    //退出
- cd name //打开指定文件夹

---


#### 4、从云端同步代码到服务器

- 在服务器建立相应的文件夹 例如 huluobos 用来存放git下面的代码和数据库文件，git下来的代码会自己建立文件夹，

- 在cd 到huluobos文件夹后  git clone git 代码的地址


---


#### 5、上传备份数据库到服务器

- 把数据库备份的didi文件夹放到huluobos文件夹下，直接拖动就好，

---


####  6、数据库恢复
    
    mongorestore -h dbhost -d dbname --dir dbdirectory
    
    最重要的是在这里输入（别先启动mongo后再mongo服务的命令行中输入）
    C:\Users\zhang>mongorestore -h dbhost -d dbname --dir dbdirectory
参数或名：

- dbhost ： MongoDB所在服务器地址127.0.0.1

- dbname ： 需要恢复的数据库实例，例如：didi，当然这个名称也可以和备份时候的不一样，比如didi2（这里最好别改，否则还要更改一次代码并 Git一次，用法git pull）
- dbdirectory备份数据所在位置，例如：/home/huashan/students/huluobos/didi/
- --dir也可以换成--drop： 恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用！

注意点：服务器端的操作，路径写绝对路径

---


#### 7、查看服务器数据库
    
    momgo
    show dbs
    exit 
    
最后退出

---

#### 8、在服务器中运行

    npm run start
    
查看，现在可以访问了

---


#### 9、 用pm2托管

cd 到git代码文件夹下，

	pm2 start bin/www --name yaojunrong
	

---


	
# 姚君荣版本	
	
	
	# 服务器部署博客项目

**注意点：**

因为服务器只有一个数据库，所以，每个人部署的服务器数据库名字要求不同。另外，node监听的端口，必须是按照编号来。不然nginx将不予解析。

端口一律设置为自己的编号+1000 

例：邢世泽编号为01  则监听端口10001 

另外数据库方面，统一将数据库以自己的名字小写字母命名

例：张博一数据库为    huluobos

## 一、数据库部署

我们需要将本地的数据库结构，以及一些数据库内容给部署到服务器当中去。

1、MongoDB数据库备份

1、语法：

    mongodump -h dbhost -d dbname -o dbdirectory
    //实际输入的是 mongodump -h 127.0.0.1 -d myblog -o 绝对路径
        
参数说明：

-h： MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017
            
-d： 需要备份的数据库实例，例如：test
            
-o： 备份的数据存放位置，例如：/home/mongodump/，当然该目录需要提前建立，这个目录里面存放该数据库实例的备份数据。



2、MongoDB数据库恢复

1、语法：

    mongorestore -h dbhost -d dbname --dir dbdirectory

参数或名：

-h： MongoDB所在服务器地址

-d： 需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2

--dir： 备份数据所在位置，例如：/home/mongodump/itcast/

--drop： 恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用！

*注意点：服务器端的操作，路径写绝对路径*

# 二、连接服务器

利用git bash  或者是其他shell命令行工具。进行连接

以下截图均采用**Mobaxterm**进行展示

连接服务器

    ssh root@mng.yaojunrong.com

@前面的代表用户名，后边代表主机地址。可以填入IP地址

![截图](http://image.yaojunrong.com/QQ%E5%9B%BE%E7%89%8720180319141236.png)

然后输入用户名密码：

Huashan2018

注意第一个字母为答谢，且Linux系统输入密码统一是看不到输入的内容的。

连接成功后

![截图](http://image.yaojunrong.com/1111116.png)

**linux常用命令**

    ll      //查看当前目录下所有文件，以列表的形式展示
    ls      //查看当前目录下所有文件
    mkdir name //新建文件夹
    exit    //退出
    cd name //打开指定文件夹


下面让我们在登录的用户下新建一个为00的文件夹

![image](http://image.yaojunrong.com/333333.png)

利用git将代码从云端同步到服务器当中

![image](http://image.yaojunrong.com/444444.png)

利用npm 安装项目依赖

    npm install
    
然后，执行

    npm run start
    
项目跑了起来，打开浏览器，地址栏输入

    http://00.yaojunrong.com

发现可以访问，但是，一旦当我们关闭了这个shell窗口就不能访问了。这不合理。

所以，我们需要使用pm2这个进程守护工具，来维护我们的node进程。

一旦我们的node进程出现错误，或者是服务器停止，pm2将会重启相应的node进程。


**pm2常用指令**
    
    //实际输入的是 
        pm2 start bin/www --name huluobos
    
    pm2 start node命令          //利用pm2启动node命令
    pm2 list                    //查看pm2维护的所有进程
    pm2 stop id                 //停止pm2的指定进程
    pm2 start node命令 --name   //启动node并给进程命名为name
    pm2 restart id              //重启指定进程
一旦我们使用了pm2 维护命令后，我们就可以放心大胆的关闭shell窗口了。

![image](http://image.yaojunrong.com/5555555.png)

当我们有新的代码更改时，必须要重新git pull。然后利用pm2 restart id重启进程。





删除   rm -rf boss/