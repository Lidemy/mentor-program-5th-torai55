# hw2：部署

總之先依照自己的理解，記下玩弄 AWS 時遇到的東西。

## [AWS fundamentals](https://aws.amazon.com/getting-started/fundamentals-core-concepts/?nc1=h_ls)

雲端的一點點概念。[Performance Efficiency](https://aws.amazon.com/getting-started/fundamentals-core-concepts/?nc1=h_ls#Performance_Efficiency) 那邊有說怎麼選用各種資源（compute、storage、database）。

## [在 AWS 上建立基本 Web 應用程式](https://aws.amazon.com/tw/getting-started/hands-on/build-web-app-s3-lambda-api-gateway-dynamodb/)

* AWS Amplify：託管靜態資源。
* AWS Lambda：無伺服器運算服務。在事件（由其他 AWS 服務或外部輸入）觸發時會執行對應的 Lambda 函式。
* Amazon API Gateway：建立 API，作為 Amplify 與 Lambda 的中間層。
* DynamoDB：key-value database。
* IAM（identity and access management）：權限管理。設定服務（如 Lambda）的角色，讓他有存取其他資源（如 DynamoDB）的權限。

## [Tutorial: Get started with Amazon EC2 Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-launch-instance)
還有 [CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-ec2.html) 版本。

[EBS-Backed Versus Instance Store](https://help.skeddly.com/en/articles/782130-ebs-backed-versus-instance-store)：簡單來說 EC2 instance 根據 root device 分成兩種，Instance Store 和 EBS-Backed。Instance Store 是跑在實體設備上，只要停止運行虛擬機，資料就會消失；EBS-Backed 是跑在位於 avability zone 裡面的 EBS volume 上。EBS 算是虛擬的設備，不是跑在特定的硬體上，所以停止運行虛擬機後，也能在同個 zone 的其他地方重啟，而不損失資料。

### create a key pair

連線進 EC2 instance 的時候需要使用 SSH。所以要在創建 instance 之前，預先產生一對公私鑰，以供未來 SSH 連入時驗證用（不同 region 底下的 instances 最好重新產生一個新的）。

macOS 這邊要多在 terminal 設定，`chmod 400 file.ppk` 將檔案改成唯讀，不然會噴錯。

### Create a security group

instances 對外的防火牆。需要開個白名單（ Inbound rules）讓自己的 IP 能夠用 SSH 連上去；因為是 web server，把 HTTP 和 HTTPS 都設定 anywhere 才能讓使用者連進來（各個 region 都需要開一個自己的 security group）。

官網這邊是用 `203.0.113.25/32` 舉例。後面 `/32` 代表子網路遮罩是 `11111111.11111111.11111111.00000000`。

因為我是用手機開網路連的，所以這邊是設定浮動 IP 的網段。需要上網查自己浮動 IP 在哪個網段。

#### 延伸閱讀

[CIDR](https://zh.wikipedia.org/wiki/%E6%97%A0%E7%B1%BB%E5%88%AB%E5%9F%9F%E9%97%B4%E8%B7%AF%E7%94%B1)

[Understanding IP Addressing and CIDR Charts](https://www.ripe.net/about-us/press-centre/understanding-ip-addressing)

[深入了解IP位址與子網路遮罩](https://www.netadmin.com.tw/netadmin/zh-tw/technology/D5162EE38674405EADB022E0802A05B2)

### Launch an instance

1. 選擇 Amazon Machine Image（AMI），也就是系統的映像檔。
2. 選擇 Instance Type，也就是虛擬機設備的等級。
3. 設定 security group。

### Connect to your instance

1. [找到](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connection-prereqs.html) instance 的 DNS name、IP address、OS 的 username。
2. 設定 PuTTY 用 SSH 連線
   * host: username@(IPv4)DNS address/(IPv6)address
   * port: 22
   * auth: /c/path/to/private_key.ppk
   * 若是 .ppm 則要經過 PuTTYgen 轉換成 .ppk

3. 可用 WinSCP（GUI）或是 PSFTP、PSCP 傳檔案。
