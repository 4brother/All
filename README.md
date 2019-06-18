### 早上好
1.开发的时候要全局安装nodemon （cnpm i -g nodemon）使用nodemon来代替node启动  
优点：更改代码会自动刷新p  
2.服务器上要安装pm2 （cnpm i -g nodemon）启动：pm2 start .\bin\www 重载:pm2 reload start .\bin\www 重启：pm2 restart .\bin\www 停止：pm2 stop .\bin\www  
优点：不占用终端，可以在后台运行