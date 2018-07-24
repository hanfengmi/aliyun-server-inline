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
> 网卡类型： 内网
规则方向：入方向   
授权策略：允许   
常用端口： ssh(22)  http(80)   https(443)    mysql(3306)  【其余的你可以按照自己需求选择】   
自定义端口： TCP   
授权类型： 0.0.0.0/0   
优先级：1   

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

---


## 5.云服务器创建并连接mongo
> MongoDB 是一个基于分布式文件存储的数据库，介于关系数据库和非关系数据库之间，是非关系数据库当中功能最丰富，最像关系数据库。他支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。Mongo最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

### 5.1. 安装mongo
```
sudo apt-get update
sudo apt-get install -y mongodb-org
```

查看mongoDB版本
```
mongo -version
```

### 5.2. 启动和关闭mongodb
```
sudo service mongodb start
sudo service mongodb stop
```
**启动报错！！！**
```
Failed to start mongodb.service: Unit mongodb.service not found.
```
> 所以我们要这样来：    
```
sudo vim /etc/systemd/system/mongodb.service
```
vim 输入：
```
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
```
> wq保存退出。    再次start, 成功了



查看mongodb是否启动 
```
pgrep mongo -l 
======================

root@iZbp177egh3y2vhbchrv2dZ:~# pgrep mongo -l
21916 mongod
// 成功
```
### 5.3.robot 3T连接mongo
>1. 阿里云配置安全组规则，允许访问27017端口   

>2. 服务器连接mongo
```
mongo
------------
use admin
------------
db.createUser(  
  {  
    user: "admin",  
    pwd: "admin",  
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]  
  }  
)
---------------------
#检查是否成功
> db.auth("admin","admin")
> 1
--------------------
```
>3. 使用robo 3t 连接mongodb   
打开robot 3t   
第一张    
![第一张](https://han-hou-img.oss-cn-beijing.aliyuncs.com/img/aliyun.jpeg
)      
第二张     
![第二张](https://han-hou-img.oss-cn-beijing.aliyuncs.com/img/aliyunuser.jpeg)


### 5.4.数据库常用操作
> show dbs:显示数据库列表    
show collections：显示当前数据库中的集合（类似关系数据库中的表table） 
show users：显示所有用户   
use yourDB：切换当前数据库至yourDB   
db.help() ：显示数据库操作命令   
db.yourCollection.help() ：显示集合操作命令，yourCollection是集合名

5.4.1、数据库   
> 显示数据库列表   
show dbs   
> 创建数据库   
use bigMonkey   (如果存在就切换，不存在就创建)
> 删除数据库
db.dropDatabase()

5.4.2、Collection  (数据库表/集合)  
> 显示集合列表      
show Collection
> 创建Collection    
db.createCollection('girls')   
自动创建对应的集合，无需预定义集合   
===>>> { "ok" : 1 }
> 删除Collection   
db.collection.drop()

5.4.3、文档/数据  
* **查看所有 文档/数据**   
> db.girls.find() 查询所有数据 // db.girls.find().pretty()  易读方式查询数据    

> find()可以传入多个键 ==>  and操作    

> db.users.find({$or:[{'phone':'15717671152'},{name:'kezhan Han'}]}).pretty()  ==>   or操作   

> and与or联合使用   db.users.find({name:''name},$or:[{phone:'15717671152'},phone:'15717671155']).pretty()   

* **条件操作符**
    * (>) 大于 - $gt
    * (<) 小于 - $lt
    * (>=) 大于等于 - $gte
    * (<= ) 小于等于 - $lte
> find('age':{$gt:20})  大于20的

* **Limit与Skip方法**
> db.col.find({},{"title":1,_id:0}).limit(2) 显示两条
> db.col.find({},{"title":1,_id:0}).limit(1).skip(1) 跳过几条，显示几条

* 排序 sort()
> 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于降序排列   
__skip(), limilt(), sort()三个放在一起执行的时候，执行的顺序是先 sort(), 然后是 skip()，最后是显示的 limit()__
> 非数字类型排序是根据什么排序

* **插入 文档/数据**  
> db.student.insert({_id:1, sname: 'zhangsan', sage: 20})   
或者   
db.student.save({_id:1, sname: 'zhangsan', sage: 22})   
// 两者区别：在手动插入_id字段时，如果_id已经存在，insert不做操作，save做更新操作；如果不加_id字段，两者作用相同都是插入数据

* **更新 文档/数据**   
>db.collection.update()   
// { "_id" : ObjectId("5b4876d35557079537a09f8a"), "belong" : "zhaoke Han" }
db.collection.update({'belong':'zhaoke Han'},{$set:{'belong':'monkey'}})   
// =>{ "_id" : ObjectId("5b4876d35557079537a09f8a"), "belong" : "monkey" }   
__参数__: db.collection.update(query,update,upsert,multi,writeConcern)    
query : update的查询条件，类似sql update查询内where后面的。   
update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的   
upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。   
multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。   
writeConcern :可选，抛出异常的级别

* **删除 文档/数据**    
>db.collection.remove(
   query,//删除条件   
   justOne,//true或1只删除1个   
   writeConcern //异常   
)  

###5.4.5 数据库用户权限管理
> mongodb安装好后第一次进入不需要密码的，也没有任何用户，直接使用命令进入
* 添加管理用户
```
> use admin 

> db.createUser( {user: "admin",pwd: "123456",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})

> show users可以查看添加的用户
```

* 在配置文件中修改
```
 auth = true
#noauth = true
```
* 使用命令再次进入mongo
```
use admin  

show collections  --->>>报错  

2018-07-23T12:07:04.401+0800 E QUERY    [thread1] Error: listCollections failed: {
	"ok" : 0,
	"errmsg" : "not authorized on bigMonkey to execute command { listCollections: 1.0, filter: {} }",
	"code" : 13
} :
_getErrorWithCode@src/mongo/shell/utils.js:25:13
DB.prototype._getCollectionInfosCommand@src/mongo/shell/db.js:773:1
DB.prototype.getCollectionInfos@src/mongo/shell/db.js:785:19
DB.prototype.getCollectionNames@src/mongo/shell/db.js:796:16
shellHelper.show@src/mongo/shell/utils.js:774:9
shellHelper@src/mongo/shell/utils.js:671:15
@(shellhelp2):1:1

``` 
不验证，是做不了任何操作的。
```
db.auth("admin","123456")

#认证，返回1表示成功
```
* 验证后添加用户，一个库至少有一个用户
```
> use mydb

> db.createUser({user: "root",pwd: "123456",roles: [{ role: "readWrite", db: "mydb" }]}) 
```

* 创建的用户root登录进行数据库操作
```
mongo 127.0.0.1/mydb -uroot -p
```
OK!


## 6.mongoose操作mongodb


## 7.express搭建服务器














