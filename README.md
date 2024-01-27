# 日本工学院八王子専門学校 実習用Dockerサンプル

Dockerでイメージを作成し、AWS AppRunnerで動かすサンプルです。

# 準備
## インストール
公式サイトの手順に従ってDockerを自分の端末にインストールします。
* https://docs.docker.com/get-docker/

また今回はAWS上にサーバ(インスタンス)を作成しますので、awsコマンドも入れておきます。
* https://aws.amazon.com/jp/cli/
    * ECRが触れる権限を持ったIAM(アカウント)も必要です

## 動作確認
Node.jsがインストールされた環境で挙動を確認しておきます。
```shellsession
$ node src/serve.js
Wakeup server. listening on port 3000
```

Webブラウザから `http://localhost:3000` へアクセスし表示内容を確認します。


# AWS App Runnerで実行する
## ECRに登録する
今回はAWSのApp Runnerを利用しますので、ECRへ登録します。

以下のページの内容に従ってAWS環境の準備を行います。
* https://blog.katsubemakito.net/aws/aws-ecr-push-dockerimage

### リポジトリの作成
Webブラウザでマネジメントコンソールにログインし、ECRに適当な名前のリポジトリを作成します。<br>
※ここでは`test`という名前で作成したとします。

### AWSから認証情報を取得
リポジトリをアップロードする際に必要な認証情報を以下のコマンドで取得します。
```shellsession
$ aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 111111111111.dkr.ecr.ap-northeast-1.amazonaws.com
```
* この情報の有効期限は12時間と短いです。
* 有効期限が切れた場合は再度コマンドを実行します。

最終的に`Login Succeeded`と表示されれば成功です。


### Dockerイメージのビルド
現在の状態を確定しイメージを作成します。
```shellsession
$ docker build -t test .
```

### タグを付ける
目印のような物です。`latest`の部分に好きな文字列(`v1`, `beta`など)を指定します。
```shellsession
$ docker tag test:latest 111111111111.dkr.ecr.ap-northeast-1.amazonaws.com/test:latest
```

### ECRに送信する
```shellsession
$ docker push 111111111111.dkr.ecr.ap-northeast-1.amazonaws.com/test:latest
```
ECRに登録されました。この情報を使ってサーバを立てていきます。

## AppRunner
App Runnerでイメージを作成する際に先ほどECRに登録した `764204879160.dkr.ecr.ap-northeast-1.amazonaws.com/test:latest` を指定します。

画面の指示に従い進んでいくと、数分程度で実際にインスタンスが作成され、挙動を確認できます。
