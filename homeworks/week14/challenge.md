# 使用 Nginx 來當伺服器

像 `hw2.md` 前面的流程，在 AWS 啟用一個 EC2，作業系統使用 ubuntu 20.04。

## 安裝 Nginx

`$ sudo apt update && sudo apt upgrade && sudo apt dist-upgrade`：更新套件與列表。

`$ sudo apt update && sudo apt install nginx`：安裝 Nginx。

* nginx 所有 config 檔都在 `/etc/nginx`。
* 主要的 config 檔為 `/etc/nginx/nginx.conf`。
* `/etc/nginx/sites-available/<domain_name>`：放個別網站的 config 檔，通常用域名來命名。例如域名是 `torai.tw`，則 config 檔為 `/etc/nginx/sites-available/torai.tw`。
* `/etc/nginx/sites-enable`：放 available 的 link，nginx 會讀這底下的 config 來啟用網站。
* `/var/log/nginx/`：log 檔的位置。
* 網站檔案可放在：
  * `/var/www/<site_name>`
  * `/var/www/html/<site_name>`
  * `/home/<username>/<site_name>`

## 在一台主機上 host 兩個網站

因為 AWS 的 security group 有設定 inbound/outbound 的規則，這裡先不設定防火牆。

* `$ sudo ufw allow OpenSSH`：允許 SSH 連線。
* `$ sudo ufw allow 'Nginx Full'`：允許 Nginx 連線。
* `$ sudo ufw enable`：啟用防火牆。
* `$ sudo ufw enable`：檢查防火牆狀態。

在瀏覽器輸入 Server 的 ip address，能看到 Nginx 預設的頁面，代表伺服器正常執行。

### 新建網站根目錄

打算在主機上跑兩個網站：mytest1.com、mytest2.com。

1. 建立兩個網站個別的資料夾：
   * `$ sudo mkdir -p /var/www/mytest1.com`
   * `$ sudo mkdir -p /var/www/mytest2.com`
2. `sudo chown -R $(whoami):$(whoami) /var/www/`：把資料夾的所有者、群組改成目前的使用者、群組，以方便進行後續操作。
3. 建立測試網頁：
   * `$ sudo echo "I'm test1.com!" > /var/www/mytest1.com/index.html`
   * `$ sudo echo "yoyoyo, I'm test2.com!" > /var/www/mytest2.com/index.html`

### Reverse Proxy

設定 `default` 為反向代理，把 `http://serverIp/test1/` 導到 `http://127.0.0.1:8888/`；把 `http://serverIp/test2/` 導到 `http://127.0.0.1:9999/`。

```shell
# /etc/nginx/sites-available/default
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  root /var/www/html; # 網站的根目錄

  index index.html index.htm index.nginx-debian.html;

  server_name _;

  location / {
    try_files $uri $uri/ =404;
  }

  location /test1/ {
      proxy_pass http://127.0.0.1:8888/;
  }

  location /test2/ {
    proxy_pass http://127.0.0.1:9999/;
  }
}
```

### Server Blocks

大約等於 Apache 的 virtual host。

1. 新增兩個 config 檔：`mytest1.com`、`mytest2.com`。在 port:8888 跑 mytest1.com；port:9999 跑 mytest2.com。

    ```shell
    # /etc/nginx/sites-available/mytest1.com
    server {
      listen 8888;
      listen [::]:8888;

      root /var/www/mytest1.com;

      server_name _;

      location ~ ^/test1/(.*)$ {
        try_files $1 $1/ /index.html =404;
      }
    }
    ```

    ```shell
    # /etc/nginx/sites-available/mytest2.com
    server {
      listen 9999;
      listen [::]:9999;

      root /var/www/mytest2.com;

      server_name _;

      location ~ ^/test2/(.*)$ {
        try_files $1 $1/ /index.html =404;
      }
    }
    ```

2. `$ sudo nginx -t`：確認 config 是否有錯。
3. 在 `/etc/nginx/sites-enable/` 建立連結檔：
   * `$ sudo ln -s /etc/nginx/sites-available/mytest1.com /etc/nginx/sites-enabled/`
   * `$ sudo ln -s /etc/nginx/sites-available/mytest2.com /etc/nginx/sites-enabled/`
4. `$ sudo service nginx restart`：重新啟動 Nginx。
5. 在瀏覽器輸入 `http://serverIp/test1/`、`http://serverIp/test2/` 查看測試網頁。

## Reference

[Ubuntu 20.04 伺服器設定 (Nginx, PHP, MySQL, phpMyAdmin, Python 3.9)](https://the.annswer.org/t/topic/354)

[How to Install and Configure Nginx on Ubuntu 20.04](https://phoenixnap.com/kb/how-to-install-nginx-on-ubuntu-20-04)

[How To Install Nginx on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)

# 使用 Docker 來部屬

## 安裝 docker

官方文件上有幾種方式，這邊選擇從線上套件庫更新，也是官方推薦的方法。

1. 解除安裝舊版：`$ sudo apt-get remove docker docker-engine docker.io containerd runc`
2. 安裝所需套件：

    ```shell
    $ sudo apt-get update
    $ sudo apt-get install \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    ```

3. 加入 GPG key：`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`
4. 加入 docker 套件庫：

    ```shell
    echo \
    "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

5. 安裝 docker engine：

   ```shell
   $ sudo apt-get update
   $ sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

6. 跑跑看 hello-world 映像檔，驗證 docker engine 是否成功安裝：`$ sudo docker run hello-world`
7. 創一個 Unix group，把目前的使用者加進去，以後就不用在 docker 前面加 sudo 了：

    ```shell
    $ compgen -g # 查看所有 groups
    $ groups $USER # 查看目前使用者的 groups
    $ newgrp docker # 切換到 docker 群組
    $ sudo groupadd docker
    $ sudo usermod -aG docker $USER
    $ docker run hello-world
    ```

8. 開機自動啟動：

    ```shell
    $ sudo systemctl enable docker.service
    $ sudo systemctl enable containerd.service

    $ sudo systemctl disable docker.service
    $ sudo systemctl disable containerd.service
    ```

## 使用 docker

```shell
# 從 image 建立一個 container
# -d => detach mode，背景執行
# -p <host_port>:<container_port> => 指定主機的 8080 port 對應到 container 的 80 port
# image => username/repo:tag 的形式
$ docker run -dp 8080:80 docker/getting-started
```

```shell
# 從 Dockerfile 建立 image
# docker build <path_to_dockerfile>
# -t <name> => 給名字方便辨認
$ docker build -t getting-started .
```

```Dockerfile
# Dockerfile

FROM node:12-alpine # 使用 image
RUN apk add --no-cache python g++ make # 執行 command
WORKDIR /app # container 新建一個 /app 目錄
COPY . . # 複製 host 工作目錄到 container 工作目錄
RUN yarn install --production / # 執行 command
CMD ["node", "src/index.js"] # 每次啟動容器時執行的指令
```

```shell
$ docker ps # 列出正在運行的 container
$ docker images # 列出 images
$ docker container ls -a # 列出所有 container
$ docker stop <container_id> # 停止 container
$ docker rm <container_id> # 移除 container
$ docker rm -f <container_id> # 停止並移除 container
$ docker logs <container_id> # logs
```

```shell
# docker hub
$ docker login
$ docker tag getting-started username/getting-started # 給 tag
$ docker push username/getting-started # 推上 docker hub
$ docker pull <image>
```

```shell
$ docker exec <container_id> <command> # 在 container 內執行指令
# -it 打開虛擬終端機（交互模式）
```

### docker volume

每個 container 都有自己的檔案系統，之間不共享資料。移除 container 之後資料就消失了。所以需要把 volume mount 到儲存資料的目錄下，這樣資料就會存在 host machine 之中，實現資料的保存。

* named-volume，只是想要簡單儲存資料，不關心他儲存在哪裡：

  ```shell
  $ docker volume create <volume_name> # 創一個 named volume
  $ docker run -dp 3000:3000 -v <volume_name>:<container_storage_directory> getting-started # 掛載 volume 並啟動 container
  $ docker volume inspect <volume_name> # 查看詳細資訊
  ```

* bind mounts，想要自行控制 mountpoint：

  ```shell
  $ docker run -dp 3000:3000 \
     -w /app -v "$(pwd):/app" \
     node:12-alpine \
     sh -c "yarn install && yarn run dev"
  # -dp 3000:3000 => 在背景執行，port mapping
  # -w /app => 設定 container 中 command 執行的工作目錄
  # -v "$(pwd):/app" => 把 host 目前的目錄 mount 到 container 的 /app
  # node:12-alpine => image
  # sh -c "yarn install && yarn run dev" => 使用 sh 執行雙引號中的指令，因為這個 image 沒 bash
  ```

### Multi-container apps

一個 container 只負責做一件事，所以為了把前端與資料庫分開，要開兩個 container 來裝。因為資料不互通，兩個 container 之間要以 network 的方式來溝通。同個 network 才能聯絡。

```shell
# mysql container
$ docker network create todo-app # create the network
# create container from image
$ docker run -d \ # using detach mode
  --network todo-app --network-alias mysql \ # select network
  -v todo-mysql-data:/var/lib/mysql \ # bind volume
  -e MYSQL_ROOT_PASSWORD=secret \ # env variable
  -e MYSQL_DATABASE=todos \ # environment variable
  mysql:5.7 # image

$ docker exec -it <container_id> mysql -u root -p secret 
```

```shell
# test
$ docker run -it --network todo-app nicolaka/netshoot
$ dig mysql # mysql 不是合法的 hostname，所以 docker 會去找 network-alias 是 mysql 的 container
```

```shell
# application server 的 container，讀環境變數來連線資料庫
# application server 去讀環境變數 MYSQL_HOST 連線資料庫
# 因為 MYSQL_HOST=mysql 不是合法的 hostname
# 所以去找 network-alias 為 mysql 的 container 來連線
$ docker run -dp 3000:3000 \
   -w /app -v "$(pwd):/app" \
   --network todo-app \
   -e MYSQL_HOST=mysql \
   -e MYSQL_USER=root \
   -e MYSQL_PASSWORD=secret \
   -e MYSQL_DB=todos \
   node:12-alpine \
   sh -c "yarn install && yarn run dev"
```

### Docker Compose

方便管理與定義 multi-container application 的工具。

#### 安裝

```shell
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose # 下載 1.29.2 版本 => 可改成新版
$ sudo chmod +x /usr/local/bin/docker-compose # 增加執行權限
$ docker-compose --version # 查看版本
```

#### Compose file

[語法](https://docs.docker.com/get-started/08_using_compose/)

```yaml
version: "3.7" # compose file 的版本：https://docs.docker.com/compose/compose-file/

services:
  echo_app: # service name
    image: node
    secrets:
      - db_username
      - db_user_password
      - db_database_name
    command: sh -c "npm install & npm run start"
    ports:
      - 9999:9999
    working_dir: /echo_app
    volumes:
      - ./echo_server:/echo_app
    environment:
      MYSQL_HOST: mysql_app
      MYSQL_USER: torai
      MYSQL_PASSWORD_FILE: /run/secrets/db_user_password
      MYSQL_DB_FILE: /run/secrets/db_database_name
      MYSQL_PORT: 3306
      APP_PORT: 9999

  mysql_app:
    image: mysql
    secrets:
      - db_root_password
      - db_username
      - db_user_password
      - db_database_name
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/db_root_password
      MYSQL_USER_FILE: /run/secrets/db_username
      MYSQL_PASSWORD_FILE: /run/secrets/db_user_password
      MYSQL_DATABASE_FILE: /run/secrets/db_database_name

volumes:
  # 交給 docker 自動創
  todo-mysql-data:

# https://blog.ruanbekker.com/blog/2017/11/23/use-docker-secrets-with-mysql-on-docker-swarm/
# 用 openssl 產生隨機數存在 docker secret
# openssl rand -base64 12 | docker secret create db_root_password -
# openssl rand -base64 12 | docker secret create db_user_password -
# echo "<username>" | docker secret create db_username -
# echo "<db_name>" | docker secret create db_database_name -
# docker secret ls
# docker secret inspect db_root_password
# 因為是從 swarm manager 那邊拿 secret，所以要用 deploy，用 docker-compose up 拿不到。
# docker stack deploy --compose-file <path_to_compose> <service_name>
# docker stack rm <stack_id>
secrets:
  db_root_password:
    external: true
  db_username:
    external: true
  db_user_password:
    external: true
  db_database_name:
    external: true
    # docker_test_database
```

因為 app 不會等到 mysql 跑起來才嘗試連接，要在程式碼中額外引入 wait-port 之類的套件，等到 port 開放才嘗試連接。[例子](https://github.com/docker/getting-started/blob/master/app/src/persistence/mysql.js#L24)

```shell
# run applicatioin stack
docker-compose up -df /path/to/docker-compose.yml

# down
docker-compose down
# 預設不會移除 volumes
# 加入 --volumes 就會移除ㄌ
```

## Reference

[docker-docs](https://docs.docker.com/get-started/)

[Docker 基本觀念與使用教學：自行建立 Docker 影像檔](https://blog.gtwang.org/virtualization/docker-basic-tutorial/)

[[Day 3] 打造你的Docker containers](https://ithelp.ithome.com.tw/articles/10192519)

[MySQL 實作](https://blog.ruanbekker.com/blog/2017/11/23/use-docker-secrets-with-mysql-on-docker-swarm/)