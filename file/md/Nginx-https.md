## Nginx安装+配置+https
1、安装依赖：

```
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```


2、下载解压

```
cd /usr/local 
mkdir nginx 
cd nginx
wget http://nginx.org/download/nginx-1.13.7.tar.gz
tar -xvf nginx-1.13.7.tar.gz
```


3、安装nginx：

```
cd /usr/local/nginx/nginx-1.13.7
./configure
make
make install
```


4、启动nginx

```
cd /usr/local/nginx/sbin
./nginx
```

//查看进程时能看见：
```
ps -ef | grep nginx
```


5、环境变量：
在根目录下
```
vim /etc/profile
```

最后加入

```
export NGINX_HOME=/usr/local/nginx
export PATH=$PATH:$NGINX_HOME/sbin
```

然后运行：
	
```
source /etc/profile
```

验证：

```
nginx -v
```


6、配置：
	文件路径：
```
/usr/local/nginx/conf/nginx.conf
```

最外面添加： nginxNewConfig是自己建的文件夹，下面放 .conf文件即可
	
```
include /usr/local/nginx/nginxNewConfig/*.conf;
```

> 

7、测试访问nginx
	外部配置写好后，重载nginx	即可访问网页检查是否配置成功
	
```
nginx -s reload
```

8、安装ssl模块（csdn链接）
	进入安装nginx/sbin,使用命令：./nginx -V 查看已配置的参数，例如
 
```
configure arguments: --prefix=/usr/local/nginx  --add-module=/root/soft/ngx_devel_kit-0.3.0 --add-module=/root/soft/lua-nginx-module-0.10.9rc7
```

> 进入到nginx-1.13.7目录下，配置nginx，需要把步骤1中的配置参数加上（若不加会影响原有的功能）

```
./configure  --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module  --with-openssl=/root/openssl-1.0.0  --add-module=/root/soft/ngx_devel_kit-0.3.0 --add-module=/root/soft/lua-nginx-module-0.10.9rc7
```

> 或者执行：（本人安装实际执行的是下面的）
```
./configure  --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module  --with-openssl=/root/openssl-1.0.0
```

> 然后执行

```
make
```

> 再执行 重新安装下

```
make install
```

> 进入到objs下：cd objs，拷贝nginx到安装目录下

```
cp nginx /usr/local/nginx/sbin
```

> 启动nginx，查看nginx模块

```
/usr/local/nginx/sbin/nginx -V
```
　
> 成功的效果就是configure arguments: 会跟一大堆东西

9、生成ssl证书：nginx支持https协议需要服务器证书，此证书使用openssl命令生成（确保openssl命令可用）。证书生成步骤如下： 

> 进入到/usr/local/nginx/conf/下，新建目录crt（mkdir crt）

> 进入到crt（cd crt）

> 开始生成证书，使用命令：

```
openssl genrsa -des3 -out server.key 1024
```

> 生成key，会出现以下提示         
                
```
Generating RSA private key, 1024 bit long modulus
                  ......................................................++++++
                  .................++++++
                  e is 65537 (0x10001)
                  Enter pass phrase for server.key:（此处输入证书密码）
                  Verifying - Enter pass phrase for server.key: （重复输入一次）
```

> 使用命令

```
openssl req -new -key server.key -out server.csr
```
>  生成csr，(注：此步骤生成证书，需要输入国家/地区/公司/个人相关信息，不需要真实，内容差不多就行，可参考下面的加粗部分) 提示：
               
```
                Enter pass phrase for server.key:（和上面密码一样）
                You are about to be asked to enter information that will be incorporated
                into your certificate request.
                What you are about to enter is what is called a Distinguished Name or a DN.

                There are quite a few fields but you can leave some blank
                For some fields there will be a default value,
                If you enter '.', the field will be left blank.
                -----
                Country Name (2 letter code) [GB]:CN
                State or Province Name (full name) [Berkshire]:Shandong
                Locality Name (eg, city) [Newbury]:liangshang
                Organization Name (eg, company) [My Company Ltd]:hahah
                Organizational Unit Name (eg, section) []:biubiu
                Common Name (eg, your name or your server's hostname) []:nanxiaoliu
                Email Address []:nanxiaoliu@channelsoft.com
                Please enter the following 'extra' attributes
                to be sent with your certificate request
                A challenge password []:123456
                An optional company name []: （敲回车）
```

> 然后执行：
```
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
```
> 然后如下提示：输入刚才的密码
             
```
Enter pass phrase for server.key.org: （密码）
writing RSA key
```
> 输入
```
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```
> 提示
    
```
Signature ok
```

> 	然后在配置文件中写好 ssl 的路径就好，全部配置如下：

## 自带的配置文件：


```
#user  nobody;
worker_processes  2;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
 
   include /usr/local/nginx/nginxNewConfig/*.conf;

    # server {
        # listen 810;
        # server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        # location / {
        #     root   /opt/node/eips-vss-web/dist;
        #     index  index.html index.htm;
        # }

        # error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
       # error_page   500 502 503 504  /50x.html;
        # location = /50x.html {
        #     root   html;
        # }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    # }

    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

    # HTTPS server
    #
    # server {
    #     listen 443 ssl;
    #   server_name localhost;
    #   ssl_certificate /usr/local/nginx/crt/server.crt;
    #   ssl_certificate_key /usr/local/nginx/crt/server.key;
    #   ssl_protocols TLSv1;
    #   ssl_prefer_server_ciphers on;
    #   location / {
    #         root   /opt/node/eips-vss-web/dist;
    #         index  index.html index.htm;
    #   }
    }
    
}
```


## 外部配置文件：

```
server {
    listen 808;
    # server_name localhost; 
    location / {
            root   /opt/node/eips-vss-web/dist;
            index  index.html index.htm;
    }
    location /web {
        alias  /opt/node/eips-vss-web/dist/;
        index index.html;
    }
}

server {
    listen 443;
    server_name localhost;  # localhost修改为您证书绑定的域名。
    ssl on;     #设置为on启用SSL功能。
    root html;
    index index.html index.htm;
    ssl_certificate  /usr/local/nginx/crt/server.crt;
    ssl_certificate_key  /usr/local/nginx/crt/server.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        root   /opt/node/eips-vss-web/dist;
        index  index.html index.htm;
    }
    location /a {
        alias  /opt/node/eips-vss-web/dist/;
        index index.html;
    }
}
```


## 配置笔记： 

> 	location 多个进行部署多个项目，每个location对应一个项目

> 	location中第一个location必须里面写root，root后面路径最后可以不带 /

> 	location 中，alias后面路径必须带 /


## nginx相关命令
nginx 停止：
	
```
nginx -s quit
```

nginx 重载：
	
```
nginx -s reload
```

nginx 启动：

```
cd /usr/local/nginx/sbin
	./nginx
```

查看nginx进程

```
ps -ef | grep nginx
```
 	
 杀死进程	

```
kill -9 进程号 杀死进程
```

重载环境那个变量

```
source /etc/profile
```





