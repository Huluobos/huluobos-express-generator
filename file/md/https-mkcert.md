# https证书 使用mkcert

如何在 CentOS 上安装 mkcert

安装 nss-tools
```
sudo yum install nss-tools
```

安装完成后，下载 mkcert 二进制包

```
export VER="v1.4.0" && wget -O mkcert https://github.com/FiloSottile/mkcert/releases/download/${VER}/mkcert-${VER}-linux-amd64
```

下载文件后，使文件可执行并将二进制文件放在 /usr/local/bin 下面。

```
chmod +x  mkcert	
sudo mv mkcert /usr/local/bin
```

如何使用 mkcert 生成本地受信任的 SSL 证书

您需要首先在系统信任库中安装本地 CA.

```
mkcert -install
```
完成后，您可以开始为您的域名生成 SSL 证书。例如，我将生成一个对以下名称有效的新证书。

> "mydomain.com"	
> "*.mydomain.co"	
> "myapp.net"	
> "localhost"	
> "127.0.0.1"	
> "::1"

你可以使用如下命令对上面的域名生成证书。


```
mkcert mydomain.com '*.mydomain.co' myapp.net localhost 127.0.0.1 ::1
```

证书生成完后，你也可以查看证书的内容。


```
cat ./mydomain.com+5.pem
```

更改nginx配置：	

```
   server_name mydomain.com myapp.net;	
   ssl_certificate /home/jmutai/mydomain.com+5.pem; 	
   ssl_certificate_key /home/jmutai/mydomain.com+5-key.pem;	
```
