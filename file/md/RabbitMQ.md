# 手动部署RabbitMQ：

> 地址：http://11.168.5.143:15672/#/

> 用户名：test

> 密码：test1

> 环境：

> 操作系统：公共镜像CentOS

> RabbitMQ版本：rabbitmq-server -3.6.9

> erlang版本：erlang19.3

> JDK版本：JDK1.8.0_121

**前提条件：**  请确保已添加安全组规则，放行端口15672和5672入方向规则。

**安装依赖包。**
```
yum -y install make gcc gcc-c++ m4 ncurses-devel openssl-devel unixODBC-devel
```

**安装erlang**。
下载erlang安装包。
```
wget http://erlang.org/download/otp_src_19.3.tar.gz
```

解压缩erlang安装包。
```
tar xzf otp_src_19.3.tar.gz
```

创建一个文件夹。

```
mkdir /usr/local/erlang
```

编译并安装erlang。

```
cd otp_src_19.3
./configure --prefix=/usr/local/erlang --without-javac
make && make install
```

修改profile配置文件。
输入命令vi /etc/profile打开profile配置文件。
在文件末尾处添加如下内容：

```
export PATH=$PATH:/usr/local/erlang/bin
```

运行命令source /etc/profile使环境变量生效。
运行命令erl -version检查安装结果。
下载RabbitMQ安装包。

```
wget -P /root "https://www.rabbitmq.com/releases/rabbitmq-server/v3.6.9/rabbitmq-server-3.6.9-1.el7.noarch.rpm"
```

导入签名密钥。

```
sudo rpm --import https://www.rabbitmq.com/rabbitmq-release-signing-key.asc
```

安装RabbitMQ Server。

```
cd /root
sudo yum install rabbitmq-server-3.6.9-1.el7.noarch.rpm
```


  开启远程登录用户的权限
> rabbitmq安装成功了，但是如果需要对外访问使用，开启远程登录用户的权限，默认只允 localhost。

> web管理应用访问端口是 15672

> 程序（生产者，消费者客户端程序）访问端口5672

> 配置远程连接权限，配置用户登录权限，需要一个rabbitmq.config的配置文件，放到/etc/rabbitmq目录中，将其拷贝到/etc/rabbitmq下，改名rabbitmq.config


```
cp /usr/share/doc/rabbitmq-server-3.7.7/rabbitmq.config.example /etc/rabbitmq/rabbitmq.config
```


打开文件修改

```
cd /etc/rabbitmq/
vim rabbitmq.config
```


修改在60行左右

```
%% {loopback_users, [{xxxx：xxxx }]},
```
> 修改1：去掉前面的两个%%，

> 修改2：去掉最后面的逗号，保存。

修改结果如下：

```
{loopback_users, []}
```


启动相关：
	rabbitmq启动命令文件在 	/usr/lib/rabbitmq/bin下面
 
先执行启动mq 命令

```
./rabbitmq-server start
```

/bin下面的文件可以执行操作，
 

创建管理员用户(按照上面/bin目录下的形式执行以下命令)
创建一个新用户。

```
./rabbitmqctl add_user 用户名 密码
```

将创建的新用户设置为管理员。

```
./rabbitmqctl set_user_tags 用户名 administrator
```

赋予新创建的用户所有权限。

```
./rabbitmqctl set_permissions -p / 用户名 ".*" ".*" ".*"
```

启用RabbitMQ的web管理界面。

```
./rabbitmq-plugins enable rabbitmq_management
```

使用浏览器访问http://服务器 IP:15672
显示如下页面，说明RabbitMQ安装成功。
 


