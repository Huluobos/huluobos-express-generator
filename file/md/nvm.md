

安装nvm 使用express + pm2 部署前端项目

```
//安装nvm 两个命令都行
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash

//激活nvm
source ~/.bash_profile  

//列出所有远程服务器的node版本 
nvm ls-remote    

//安装node
nvm install v8.9.1   

//查看已安装的node版本
nvm ls 		

// 使用已安装的node
nvm use node    

//设置npm淘宝镜像（如有其它镜像源，该步骤可省略）
npm config set registry https://registry.npm.taobao.org  

//验证是否设置成功
npm config get registry   

//安装pm2 
npm install pm2 -g

//在express目录下，启动bin/www ,项目重命名为test。至此项目就启动成功。
pm2 start bin/www --name test --watch  
```

              
