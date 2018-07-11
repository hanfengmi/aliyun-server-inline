# aliyun-server-inline
阿里云服务器使用记录

## 1.选择合适的服务器
> 上网选择就好，操作系统选择自己熟悉的，大小也自己掌握～
## 2.ssh连接服务器
> 看教程是使用命令
```
    ssh root@ip
```
> 发现连接不上
#### 刚买完阿里云不能远程连接，安全组规则需要配置

## 3.服务器下载nginx等
nginx 
```
apt-get install nginx
```

## 4.将本地网页上传到阿里云服务器
1. 在    /var/www/html  下gitclone自己的代码
```
root@iZbp177egh3y2vhbchrv2dZ:/var/www/html# git clone https://github.com/hanfengmi/aliyun-server-inline.git
Cloning into 'aliyun-server-inline'...
remote: Counting objects: 107, done.
remote: Compressing objects: 100% (73/73), done.
remote: Total 107 (delta 21), reused 99 (delta 15), pack-reused 0
Receiving objects: 100% (107/107), 502.89 KiB | 102.00 KiB/s, done.
Resolving deltas: 100% (21/21), done.
Checking connectivity... done.
root@iZbp177egh3y2vhbchrv2dZ:/var/www/html# ls
aliyun-server-inline  index.nginx-debian.html
root@iZbp177egh3y2vhbchrv2dZ:/var/www/html#
```
2. 在 Nginx 里目录指定到制定网页
```
cd /etc/nginx/  #切换目录
```
> nginx.conf 的文件，这个是 nginx 的配置文件   
>conf.d 的文件夹，我们会在这个文件夹创建扩展名是 conf 的文件，每个文件代表一个网站配置。

在conf.d下新建文件 xxx.conf
```
server {
  listen 80 default_server;
  server_name 47.98.195.42;
  root /var/www/html/aliyun-server-inline/my-web/dist;
  index index.html;
  error_page 404 /404.html;
        location = /40x.html
}
```
> 检查配置是否成功
```
nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

#重启nginx
nginx -s reload
```
之后访问公网ip,就能看到自己的静态网站了

---
# 遇到的问题
###  安装git不成功
```
Reading package lists... Done
Building dependency tree
Reading state information... Done
E: Unable to locate package git
```

>原因：是因为新装的ubuntu系统，没有update的原因。   

> 首先
```
sudo apt-get update
```
> 之后
```
sudo apt-get install git
```
成功

## 绑定域名
待续...

## 格式化阿里云服务器后，ssh连接失败
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:G9c8XAV48dQi15zqEdLTbL83xPT0Kbqs2bK1cufP1Jk.
Please contact your system administrator.
Add correct host key in /Users/apple/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /Users/apple/.ssh/known_hosts:1
ECDSA host key for 47.98.195.42 has changed and you have requested strict checking.
Host key verification failed.

```
> 出现这些信息是因为，第一次SSH连接时，会生成一个认证，储存在客户端,
> 解决：
```
ssh-keygen -R xx.xx.xxx.xx(ip)
```
> 再次连接 
```
ssh root@xx.xx.xxx.xx
```



### 服务器删除资源命令

rm [file name] 删除文件

rmdir [folder name] 删除空文件夹

rm -rf [folder name] 删除文件夹

[参考网址](https://my.oschina.net/u/2002738/blog/481598)





