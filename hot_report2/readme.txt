http://developer.51cto.com/art/201105/262638.htm
http://kb.cnblogs.com/page/112185/


/root/mongodb/mongo/bin/mongod --dbpath=/root/mongodb/data/mongodb_data/ --logpath=/root/mongodb/data/mongodb_log/mongodb.log --logappend&  

node /opt/baofeng-data/phoneapp_data_pangyuanxing/popv5/static/hot_report2/app


http://fjc1.pop.baofeng.net/popv5/static/phoneapp/assets/src/controller/getFirstPagelist.js
http://fjc1.pop.baofeng.net/popv5/static/phoneapp/assets/src/controller/getFirstPageList.js

cd /opt/baofeng-data/phoneapp_data_pangyuanxing/popv5/static/hot_report2/ && sudo /usr/bin/nohup /usr/local/bin/node app &

ps aux | grep node

kill -9 

Xshell 4 (Build 0129)
Copyright (c) 2002-2013 NetSarang Computer, Inc. All rights reserved.

Type `help' to learn how to use Xshell prompt.
Xshell:\> 

Connecting to 192.168.200.18:22...
Connection established.
To escape to local shell, press 'Ctrl+Alt+]'.

Last login: Fri May  9 18:14:50 2014 from 192.168.205.75
[root@localhost ~]# cd /opt
[root@localhost opt]# ls
baofeng-data  data  gcc  logs  lost+found  modules  newcms.conf  openssl  rh  rsync  sql  ssl
[root@localhost opt]# ls -l
total 56
drwxr-xr-x. 38 root root  4096 Apr 17 11:19 baofeng-data
drwxr-xr-x.  6 root root  4096 May  9 18:07 data
drwxr-xr-x.  2 root root  4096 Mar 19  2013 gcc
drwxrwxr-x.  2 root root  4096 Feb 10 12:10 logs
drwx------.  2 root root 16384 Mar 14  2013 lost+found
drwxr-xr-x. 23 root root  4096 Apr 16 10:04 modules
-rw-r--r--.  1 root root  1603 Mar 21  2013 newcms.conf
drwxr-xr-x.  2 root root  4096 Mar 19  2013 openssl
drwxr-xr-x.  2 root root  4096 Jun 22  2012 rh
drwxr-xr-x.  2 root root  4096 Sep 27  2013 rsync
drwxr-xr-x.  2 root root  4096 Mar 21  2013 sql
lrwxrwxrwx.  1 root root     7 Mar 19  2013 ssl -> openssl
[root@localhost opt]# /root/mongodb/mongo/bin/mongod --dbpath=/root/mongodb/data/mongodb_data/ --logpath=/root/mongodb/data/mongodb_log/mongodb.log --logappend& ^C
[root@localhost opt]# ^C
[root@localhost opt]# node /opt/baofeng-data/phoneapp_data_pangyuanxing/popv5/static/hot_report2/app
Failed to load c++ bson extension, using pure JS version
Failed to load c++ bson extension, using pure JS version
connect.multipart() will be removed in connect 3.0
visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
connect.limit() will be removed in connect 3.0

events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: listen EADDRINUSE
    at errnoException (net.js:901:11)
    at Server._listen2 (net.js:1039:14)
    at listen (net.js:1061:10)
    at Server.listen (net.js:1127:5)
    at Object.<anonymous> (/opt/baofeng-data/phoneapp_data_pangyuanxing/popv5/static/hot_report2/app.js:44:24)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
[root@localhost opt]# node /opt/baofeng-data/phoneapp_data_pangyuanxing/popv5/static/hot_report2/app
Failed to load c++ bson extension, using pure JS version
Failed to load c++ bson extension, using pure JS version
connect.multipart() will be removed in connect 3.0
visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
connect.limit() will be removed in connect 3.0

events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: listen EADDRINUSE
    at errnoException (net.js:901:11)
    at Server._listen2 (net.js:1039:14)
    at listen (net.js:1061:10)
    at Server.listen (net.js:1127:5)
    at Object.<anonymous> (/opt/baofeng-data/phoneapp_data_pangyuanxing/popv5/static/hot_report2/app.js:44:24)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
[root@localhost opt]# ^C
[root@localhost opt]# ^C
[root@localhost opt]# ^C
[root@localhost opt]# ^C
[root@localhost opt]# ^C
[root@localhost opt]# clear
[root@localhost opt]# ls
baofeng-data  data  gcc  logs  lost+found  modules  newcms.conf  openssl  rh  rsync  sql  ssl
[root@localhost opt]# cd /opt/data/
hot_report/ ip.csv      logs/       moviebox/   node/       
[root@localhost opt]# cd /opt/data/node/
[root@localhost node]# ls
nohup.out
[root@localhost node]# cat nohup.out 
Failed to load c++ bson extension, using pure JS version
Failed to load c++ bson extension, using pure JS version
connect.multipart() will be removed in connect 3.0
visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
connect.limit() will be removed in connect 3.0
Express server listening on port 3000
Failed to load c++ bson extension, using pure JS version
Failed to load c++ bson extension, using pure JS version
connect.multipart() will be removed in connect 3.0
visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
connect.limit() will be removed in connect 3.0
Express server listening on port 3000
Failed to load c++ bson extension, using pure JS version
Failed to load c++ bson extension, using pure JS version
connect.multipart() will be removed in connect 3.0
visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
connect.limit() will be removed in connect 3.0
Express server listening on port 3000
GET / 304 29ms
GET /css/bootstrap.css 304 9ms
GET /css/bootstrap-theme.css 304 8ms
GET /css/layout.css 304 5ms
GET /css/font-awesome.min.css 304 7ms
GET /js/jquery.js 304 5ms
GET /css/summernote.css 304 8ms
GET /js/bootstrap.js 304 2ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 2ms
GET /upload 304 5ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/bootstrap.css 304 5ms
GET /css/layout.css 304 6ms
GET /js/jquery.js 304 7ms
GET /js/summernote.js 304 16ms
GET /js/bootstrap.js 304 18ms
GET /js/index.js 304 13ms
GET /css/bootstrap-theme.css 304 16ms
GET /css/bootstrap.css 304 17ms
GET /css/font-awesome.min.css 304 18ms
GET /fonts/fontawesome-webfont.eot? 304 5ms
GET /css/layout.css 304 4ms
GET /css/summernote.css 304 5ms
GET /js/jquery.js 304 2ms
GET /js/bootstrap.js 304 2ms
GET /js/summernote.js 304 5ms
GET /upload 304 4ms
GET /js/index.js 304 5ms
GET / 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/font-awesome.min.css 304 4ms
GET /css/bootstrap-theme.css 304 6ms
GET /css/summernote.css 304 4ms
GET /js/jquery.js 304 4ms
GET /css/layout.css 304 5ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 1ms
GET /upload 304 2ms
GET /css/bootstrap.css 304 6ms
GET /css/bootstrap-theme.css 304 26ms
GET /js/bootstrap.js 304 24ms
GET /js/jquery.js 304 25ms
GET /js/summernote.js 304 31ms
GET /css/layout.css 304 33ms
GET /js/index.js 304 9ms
GET /css/bootstrap.css 304 4ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/font-awesome.min.css 304 5ms
GET /fonts/fontawesome-webfont.eot? 304 4ms
GET /css/summernote.css 304 5ms
GET /css/layout.css 304 4ms
GET /js/jquery.js 304 3ms
GET /js/bootstrap.js 304 2ms
GET /js/summernote.js 304 3ms
GET /upload 304 2ms
GET /js/index.js 304 3ms
GET /list 200 66ms - 1.16kb
GET /css/bootstrap.css 304 4ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/layout.css 304 5ms
GET /js/summernote.js 304 6ms
GET /js/jquery.js 304 7ms
GET /js/bootstrap.js 304 6ms
GET /js/index.js 304 5ms
GET /css/bootstrap.css 304 4ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/layout.css 304 4ms
GET /js/jquery.js 304 17ms
GET /js/bootstrap.js 304 17ms
GET /js/summernote.js 304 17ms
GET /js/index.js 304 14ms
GET /create 304 3ms
GET /css/bootstrap.css 304 1ms
GET /css/layout.css 304 6ms
GET /css/bootstrap-theme.css 304 7ms
GET /js/jquery.js 304 4ms
GET /js/bootstrap.js 304 4ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 3ms
GET /css/bootstrap.css 304 5ms
GET /css/bootstrap-theme.css 304 5ms
GET /css/layout.css 304 5ms
GET /js/jquery.js 304 5ms
GET /js/summernote.js 304 4ms
GET /js/bootstrap.js 304 5ms
GET /js/index.js 304 2ms
GET /createArticle 200 5276ms
GET /createArticle 200 6087ms
GET /create 304 1ms
GET /css/bootstrap.css 304 4ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/layout.css 304 5ms
GET /js/jquery.js 304 5ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 2ms
GET /css/bootstrap.css 304 5ms
GET /css/bootstrap-theme.css 304 6ms
GET /css/layout.css 304 6ms
GET /js/summernote.js 304 3ms
GET /js/jquery.js 304 7ms
GET /js/bootstrap.js 304 6ms
GET /js/index.js 304 1ms
GET /createIndex 200 6ms
GET /createIndex 200 3ms
GET /createIndex 200 4ms
GET /create 304 2ms
GET /css/bootstrap.css 304 2ms
GET /css/bootstrap-theme.css 304 1ms
GET /css/layout.css 304 3ms
GET /js/jquery.js 304 2ms
GET /js/bootstrap.js 304 2ms
GET /js/index.js 304 2ms
GET /js/summernote.js 304 6ms
GET /css/bootstrap-theme.css 304 7ms
GET /css/bootstrap.css 304 9ms
GET /css/layout.css 304 8ms
GET /js/jquery.js 304 9ms
GET /js/bootstrap.js 304 6ms
GET /js/summernote.js 304 4ms
GET /js/index.js 304 3ms
GET /createIndex 200 4ms
GET /create 304 1ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/bootstrap.css 304 5ms
GET /css/layout.css 304 9ms
GET /js/jquery.js 304 10ms
GET /js/summernote.js 304 10ms
GET /js/bootstrap.js 304 11ms
GET /js/index.js 304 6ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/bootstrap.css 304 9ms
GET /css/layout.css 304 8ms
GET /js/jquery.js 304 9ms
GET /js/bootstrap.js 304 7ms
GET /js/summernote.js 304 6ms
GET /js/index.js 304 2ms
GET /create 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/layout.css 304 3ms
GET /js/jquery.js 304 4ms
GET /js/summernote.js 304 2ms
GET /js/bootstrap.js 304 3ms
GET /js/index.js 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 4ms
GET /js/jquery.js 304 6ms
GET /js/summernote.js 304 3ms
GET /js/bootstrap.js 304 9ms
GET /css/layout.css 304 12ms
GET /js/index.js 304 6ms
GET /createIndex 200 6ms
GET /create 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 2ms
GET /css/layout.css 304 4ms
GET /js/jquery.js 304 3ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /js/jquery.js 304 2ms
GET /css/layout.css 304 4ms
GET /js/summernote.js 304 2ms
GET /js/bootstrap.js 304 3ms
GET /js/index.js 304 2ms
GET /create 304 2ms
GET /css/bootstrap-theme.css 304 2ms
GET /css/bootstrap.css 304 4ms
GET /css/layout.css 304 5ms
GET /js/summernote.js 304 7ms
GET /js/jquery.js 304 8ms
GET /js/bootstrap.js 304 8ms
GET /js/index.js 304 2ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/bootstrap.css 304 3ms
GET /css/layout.css 304 4ms
GET /js/jquery.js 304 4ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 1ms
GET /create 304 2ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/bootstrap.css 304 5ms
GET /css/layout.css 304 6ms
GET /js/jquery.js 304 5ms
GET /js/summernote.js 304 3ms
GET /js/bootstrap.js 304 4ms
GET /js/index.js 304 2ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/bootstrap.css 304 8ms
GET /css/layout.css 304 12ms
GET /js/jquery.js 304 11ms
GET /js/bootstrap.js 304 10ms
GET /js/index.js 304 14ms
GET /js/summernote.js 304 21ms
GET / 304 3ms
GET /css/bootstrap.css 304 4ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/font-awesome.min.css 304 4ms
GET /css/summernote.css 304 4ms
GET /css/layout.css 304 3ms
GET /js/jquery.js 304 3ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 1ms
GET /upload 304 2ms
GET /fonts/fontawesome-webfont.woff?v=4.0.3 304 1ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/bootstrap.css 304 4ms
GET /css/layout.css 304 5ms
GET /js/jquery.js 304 5ms
GET /js/bootstrap.js 304 5ms
GET /js/summernote.js 304 4ms
GET /js/index.js 304 2ms
GET /css/bootstrap.css 304 4ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/font-awesome.min.css 304 4ms
GET /fonts/fontawesome-webfont.eot? 304 4ms
GET /css/summernote.css 304 4ms
GET /css/layout.css 304 3ms
GET /js/jquery.js 304 3ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 3ms
GET /upload 304 2ms
Error: ENOENT, open 'img/13529-1nt2e47.gif'
POST /upload 400 30ms
GET / 304 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/bootstrap.css 304 4ms
GET /css/font-awesome.min.css 304 5ms
GET /css/summernote.css 304 4ms
GET /js/jquery.js 304 2ms
GET /css/layout.css 304 4ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 2ms
GET /upload 200 1ms - 990b
GET /css/bootstrap-theme.css 304 3ms
GET /css/bootstrap.css 304 5ms
GET /css/layout.css 304 6ms
GET /js/jquery.js 304 6ms
GET /js/bootstrap.js 304 6ms
GET /js/summernote.js 304 5ms
GET /js/index.js 304 2ms
GET /css/bootstrap-theme.css 304 7ms
GET /css/bootstrap.css 304 8ms
GET /css/font-awesome.min.css 304 9ms
GET /fonts/fontawesome-webfont.eot? 304 8ms
GET /css/layout.css 304 4ms
GET /css/summernote.css 304 5ms
GET /js/jquery.js 304 4ms
GET /js/bootstrap.js 304 4ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 3ms
Error: ENOENT, open 'img/13529-1ggdmuj.gif'
POST /upload 400 4ms
GET / 304 10ms
GET /css/bootstrap.css 304 4ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/font-awesome.min.css 304 5ms
GET /css/summernote.css 304 4ms
GET /css/layout.css 304 4ms
GET /js/jquery.js 304 4ms
GET /js/bootstrap.js 304 2ms
GET /js/summernote.js 304 1ms
GET /js/index.js 304 1ms
GET /upload 200 1ms - 990b
GET /css/bootstrap.css 304 2ms
GET /css/layout.css 304 3ms
GET /css/bootstrap-theme.css 304 4ms
GET /js/jquery.js 304 2ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 1ms
GET /css/bootstrap.css 304 1ms
GET /css/bootstrap-theme.css 304 1ms
GET /css/font-awesome.min.css 304 2ms
GET /fonts/fontawesome-webfont.eot? 304 2ms
GET /css/summernote.css 304 2ms
GET /css/layout.css 304 2ms
GET /js/jquery.js 304 2ms
GET /js/bootstrap.js 304 1ms
GET /js/summernote.js 304 1ms
GET /js/index.js 304 1ms
GET / 304 2ms
GET /css/bootstrap.css 304 4ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/summernote.css 304 2ms
GET /css/font-awesome.min.css 304 5ms
GET /js/jquery.js 304 3ms
GET /css/layout.css 304 3ms
GET /js/bootstrap.js 304 1ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 1ms
GET /upload 304 1ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/layout.css 304 4ms
GET /js/summernote.js 304 3ms
GET /js/jquery.js 304 4ms
GET /js/bootstrap.js 304 4ms
GET /js/index.js 304 1ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 2ms
GET /fonts/fontawesome-webfont.eot? 304 3ms
GET /css/font-awesome.min.css 304 4ms
GET /css/layout.css 304 2ms
GET /css/summernote.css 304 3ms
GET /js/jquery.js 304 3ms
GET /js/bootstrap.js 304 2ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 2ms
GET /upload 304 2ms
GET / 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/font-awesome.min.css 304 3ms
GET /css/summernote.css 304 3ms
GET /css/layout.css 304 3ms
GET /js/jquery.js 304 2ms
GET /js/bootstrap.js 304 2ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 1ms
GET /upload 304 2ms
GET /css/bootstrap.css 304 1ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/layout.css 304 3ms
GET /js/bootstrap.js 304 3ms
GET /js/jquery.js 304 4ms
GET /js/index.js 304 2ms
GET /js/summernote.js 304 3ms
GET /css/bootstrap.css 304 2ms
GET /css/bootstrap-theme.css 304 3ms
GET /fonts/fontawesome-webfont.eot? 304 2ms
GET /css/font-awesome.min.css 304 3ms
GET /css/summernote.css 304 3ms
GET /css/layout.css 304 3ms
GET /js/jquery.js 304 2ms
GET /js/bootstrap.js 304 2ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 3ms
GET /upload 304 2ms
Error: ENOENT, open 'img/13529-4qabhp.gif'
POST /upload 400 3ms
GET / 304 3ms
GET /css/bootstrap.css 304 5ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/font-awesome.min.css 304 5ms
GET /css/summernote.css 304 4ms
GET /js/jquery.js 304 4ms
GET /css/layout.css 304 4ms
GET /js/bootstrap.js 304 4ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 2ms
GET /upload 200 2ms - 990b
GET /css/bootstrap.css 304 2ms
GET /css/bootstrap-theme.css 304 2ms
GET /js/jquery.js 304 3ms
GET /css/layout.css 304 5ms
GET /js/bootstrap.js 304 5ms
GET /js/summernote.js 304 4ms
GET /js/index.js 304 3ms
GET /css/bootstrap.css 304 4ms
GET /css/bootstrap-theme.css 304 5ms
GET /css/font-awesome.min.css 304 5ms
GET /css/layout.css 304 3ms
GET /css/summernote.css 304 4ms
GET /fonts/fontawesome-webfont.eot? 304 5ms
GET /js/jquery.js 304 4ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 2ms
Error: ENOENT, open 'img/13529-14u8bym'
POST /upload 400 2ms
GET / 304 4ms
GET /css/bootstrap.css 304 6ms
GET /css/bootstrap-theme.css 304 5ms
GET /css/font-awesome.min.css 304 4ms
GET /css/summernote.css 304 4ms
GET /css/layout.css 304 5ms
GET /js/jquery.js 304 5ms
GET /js/bootstrap.js 304 2ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 2ms
GET /upload 200 2ms - 990b
GET / 304 3ms
GET / 304 3ms
GET /css/bootstrap-theme.css 304 4ms
GET /css/bootstrap.css 304 5ms
GET /css/font-awesome.min.css 304 6ms
GET /css/summernote.css 304 9ms
GET /js/jquery.js 304 7ms
GET /css/layout.css 304 9ms
GET /js/bootstrap.js 304 7ms
GET /js/summernote.js 304 7ms
GET /js/index.js 304 3ms
GET / 304 3ms
GET /css/bootstrap-theme.css 304 5ms
GET /css/bootstrap.css 304 6ms
GET /css/summernote.css 304 5ms
GET /css/font-awesome.min.css 304 8ms
GET /js/jquery.js 304 3ms
GET /css/layout.css 304 5ms
GET /js/bootstrap.js 304 4ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 2ms
Error: ENOENT, open 'img/13529-16ptaia'
POST /upload 400 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/bootstrap.css 304 5ms
GET /css/font-awesome.min.css 304 6ms
GET /fonts/fontawesome-webfont.eot? 304 5ms
GET /css/layout.css 304 3ms
GET /css/summernote.css 304 5ms
GET /js/jquery.js 304 4ms
GET /js/bootstrap.js 304 4ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 3ms
GET / 200 12ms - 5.2kb
GET /css/bootstrap-theme.css 200 30ms - 14.59kb
GET /css/bootstrap.css 200 32ms - 118.38kb
GET /css/font-awesome.min.css 200 30ms - 17.36kb
GET /css/layout.css 200 29ms - 174b
GET /js/bootstrap.js 200 19ms - 53.96kb
GET /js/summernote.js 200 17ms - 118.54kb
GET /js/index.js 200 16ms - 377b
GET /js/jquery.js 200 50ms - 276.14kb
GET /css/summernote.css 200 64ms - 9.98kb
GET /upload 200 1ms - 990b
GET /css/bootstrap-theme.css 200 5ms - 14.59kb
GET /css/layout.css 200 5ms - 174b
GET /js/bootstrap.js 200 4ms - 53.96kb
GET /css/bootstrap.css 200 7ms - 118.38kb
GET /js/summernote.js 200 6ms - 118.54kb
GET /fonts/fontawesome-webfont.woff?v=4.0.3 200 26ms - 43.39kb
GET /js/jquery.js 200 9ms - 276.14kb
GET /js/index.js 200 1ms - 377b
GET /fonts/fontawesome-webfont.eot? 304 1ms
Error: ENOENT, open 'img/13529-134afth.gif'
POST /upload 400 3ms
GET /create 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 2ms
GET /css/layout.css 304 6ms
GET /js/jquery.js 304 5ms
GET /js/summernote.js 304 4ms
GET /js/bootstrap.js 304 5ms
GET /js/index.js 304 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/bootstrap.css 304 4ms
GET /css/layout.css 304 5ms
GET /js/jquery.js 304 3ms
GET /js/summernote.js 304 3ms
GET /js/bootstrap.js 304 4ms
GET /js/index.js 304 2ms
GET /createIndex 200 6ms
GET /create 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /js/jquery.js 304 3ms
GET /css/layout.css 304 4ms
GET /js/summernote.js 304 3ms
GET /js/bootstrap.js 304 4ms
GET /js/index.js 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/layout.css 304 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /js/jquery.js 304 4ms
GET /js/index.js 304 3ms
GET /js/summernote.js 304 3ms
GET /js/bootstrap.js 304 4ms
GET /createArticle 200 4112ms
GET /create 304 2ms
GET /css/bootstrap.css 304 2ms
GET /css/bootstrap-theme.css 304 2ms
GET /css/layout.css 304 3ms
GET /js/jquery.js 304 3ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 2ms
GET /css/bootstrap.css 304 4ms
GET /css/bootstrap-theme.css 304 4ms
GET /js/jquery.js 304 3ms
GET /css/layout.css 304 5ms
GET /js/summernote.js 304 3ms
GET /js/bootstrap.js 304 4ms
GET /js/index.js 304 2ms
GET / 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /css/summernote.css 304 2ms
GET /css/font-awesome.min.css 304 4ms
GET /js/jquery.js 304 3ms
GET /css/layout.css 304 4ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 3ms
GET /js/index.js 304 2ms
GET /upload 200 2ms - 990b
GET /fonts/fontawesome-webfont.woff?v=4.0.3 304 1ms
GET /css/bootstrap.css 304 1ms
GET /css/bootstrap-theme.css 304 2ms
GET /js/jquery.js 304 3ms
GET /css/layout.css 304 3ms
GET /js/bootstrap.js 304 3ms
GET /js/summernote.js 304 2ms
GET /js/index.js 304 2ms
GET /css/bootstrap.css 304 3ms
GET /css/bootstrap-theme.css 304 3ms
GET /fonts/fontawesome-webfont.eot? 304 4ms
GET /css/font-awesome.min.css 304 6ms
GET /css/summernote.css 304 4ms
GET /css/layout.css 304 4ms
GET /js/jquery.js 304 3ms
GET /js/bootstrap.js 304 2ms
GET /js/summernote.js 304 1ms
GET /js/index.js 304 1ms
Error: ENOENT, open 'img/13529-jyucgb.gif'
POST /upload 400 2ms
Failed to load c++ bson extension, using pure JS version
Failed to load c++ bson extension, using pure JS version
connect.multipart() will be removed in connect 3.0
visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
connect.limit() will be removed in connect 3.0
Express server listening on port 3000
[root@localhost node]# ps aux | grepnode
-bash: grepnode: command not found
[root@localhost node]# ps aux | grep node
root     14433  0.0  0.0 148028  2072 ?        S    18:13   0:00 sudo /usr/bin/nohup /usr/local/bin/node /opt/baofeng-data/phoneapp_data_pangyuanxing/popv5/static/hot_report2/app
root     14434  0.0  1.1 708680 40852 ?        Sl   18:13   0:00 /usr/local/bin/node /opt/baofeng-data/phoneapp_data_pangyuanxing/popv5/static/hot_report2/app
root     14906  0.0  0.0 103240   828 pts/8    S+   18:40   0:00 grep node
[root@localhost node]# kill -9 14433
[root@localhost node]# ps aux | grep node
root     14434  0.0  1.1 708680 40852 ?        Sl   18:13   0:00 /usr/local/bin/node /opt/baofeng-data/phoneapp_data_pangyuanxing/popv5/static/hot_report2/app
root     14909  0.0  0.0 103240   828 pts/8    S+   18:40   0:00 grep node
[root@localhost node]# kill -9 14434
[root@localhost node]# ps aux | grep node
root     14920  0.0  0.0 103240   828 pts/8    S+   18:41   0:00 grep node
[root@localhost node]# ^C
[root@localhost node]# 