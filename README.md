# aliyun-server-inline
阿里云服务器使用记录

## 1.选择合适的服务器
> 上网选择就好，操作系统选择自己熟悉的，大小也自己掌握～
## 2.ssh连接服务器
> 看教程是使用命令
```
    ssh root@ip
```
> 发现连接不上
#### 刚买完阿里云不能远程连接，安全组规则需要配置
## 3.服务器下载nginx-php等

## 4.将本地网页上传到阿里云服务器

·



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