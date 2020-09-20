---
draft: false
date: 2020-09-20T18:30:26+09:00
description: Lab-only
sidebar: right
categories:
  - "Lab"
---

### PCクラスタの使い方 ハンズオン

#### クラスタの構成

crabがログインノード兼ファイルサーバ。crabはメモリ容量大きめ(512GB)なのでデータ解析にも使う。n1〜n4がそれぞれGPU10枚積んだ計算ノード。n1のGPUはメモリ容量大きめ(48GB/枚)なのでデータ解析にも使う

#### VPNの設定

まず、VPNのクライアントソフトをインストールする。
```bash
$ brew cask install tunnelblick
```

VPNの設定ファイルを個別にもらって設定する。MacOSでは初回の起動などはブロックされるので、「システム環境設定」->「セキュリティとプライバシー」->「一般」から実行を許可する

#### ログインノードのIPアドレスを登録

ログインノードであるcrabのIPアドレスを登録する。
```bash
$ sudo vim /etc/hosts
```

#### クラスタへログインする

```bash
# on local machine
$ ssh -l username crab
```

#### パスワードを変更する

```bash
# on crab
$ passwd
```

#### SSH公開鍵認証の設定をする

まず、ローカルマシン上で公開鍵・秘密鍵を作成する。ローカルマシンとcrabの認証に使う
```bash
# on local machine
$ ssh-keygen -t rsa
パスワード設定を求められたら入力する。ファイルのパスはそのままでリターン
```

crab上でも作っておく。これはcrabと計算ノード(n1〜)の認証に使うため
```bash
$ ssh -l username crab
$ ssh-keygen -t rsa
今度はパスワード設定を求められたら空のままリターン。ファイルのパスはそのままでリターン
```

ローカルマシンに戻って、ローカルマシンの公開鍵をcrabへ登録する
```bash
# on local machine
$ scp ~/.ssh/id_rsa.pub username@crab:.ssh/authorized_keys
今度はパスワード設定を求められたら空のままリターン。ファイルのパスはそのままでリターン
```

ややこしいが、今度はcrabの公開鍵を同じ場所へ登録する。homeを計算ノード(n1〜)と共有しているため
```bash
# on local machine
$ ssh -l username crab
# on crab
$ cat ~/.ssh/id_rsa.pub >>~/.ssh/authorized_keys
```

ローカルマシンに戻って、crabへのログインに公開鍵認証できるか試してみる
```bash
# on local machine
# SSHエージェントへ秘密鍵を登録する
$ ssh-add ~/.ssh/id_rsa
$ ssh -l username crab
```

crabから計算ノードへも公開鍵認証できるか試してみる
```bash
# on crab
$ ssh n1
```

#### ローカルマシンでシニョリンのシミュレーションをながす

まずはローカルマシンで正しく計算できるか確認
```bash
$ git clone https://github.com/matsunagalab/chignolin.git
$ cd chignolin/
$ docker run --rm -v $(pwd):/work -w /work matsunagalab/openmm python -u run.py
```

シミュレーション結果の構造がおかしくないかPyMOLで確認
```bash
$ pymol -d "load init.psf, obj, 0, psf; load_traj run.dcd, obj, 0, dcd; remove not polymer; remove h.; dss; show sticks; intra_fit all"
```

#### 計算ノードn2でシニョリンのシミュレーションをながす

- シニョリンのインプットファイル https://github.com/matsunagalab/chignolin

- シニョリンの参考文献1 https://www.aist.go.jp/aist_j/press_release/pr2004/pr20040810/pr20040810.html

- シニョリンの参考文献2 https://www.jstage.jst.go.jp/article/mssj/12/2/12_2_2_11/_pdf/-char/ja

まずは、とりあえずn2でシミュレーションがながれるか確認
```bash
$ ssh crab
$ ssh n2
$ cd /data/username/
$ git clone https://github.com/matsunagalab/chignolin.git
$ cd chignolin/
$ docker run --privileged -u $(id -u):$(id -g) --rm -v $(pwd):/work -w /work crab:5000/openmm python -u run.py
```

ファイルを編集してGPU(CUDA)が効くようにする。速度が向上することを確認する
```bash
# on n2
$ vi run.py #or emacs run.py
$ docker run --privileged -u $(id -u):$(id -g) --rm -v $(pwd):/work -w /work crab:5000/openmm python -u run.py
```

crabからバッチジョブ的にn2へ長い計算をsubmitする
```bash
# on crab
$ cd /data/username/chignolin/
$ docker service create --name jobname  --constraint node.hostname==n2 --replicas 1 -u $(id -u):$(id -g) --restart-condition=none --mount type=bind,source=$(pwd),destination=/work --generic-resource "gpu=1" crab:5000/openmm python -m run.py
# 投入されているジョブのリスト表示
$ docker service ls
# 計算の途中や終了後したジョブの標準出力をチェック
$ docker service logs jobname
# マニュアルでジョブを削除しなければならない
$ docker service rm jobname
```

#### crabのjupyterを使って解析する

linksのページから、jupyter on crabのリンクをたどる

#### データをローカルマシンへコピーする

単純にはscpコマンドを使う
```bash
$ scp -Cr username@crab:/data/username/chignolin ./
```

ディレクトリが巨大で、差分を少しずつローカルへコピーしたい場合などはrsyncを使う。最後のスラッシュは抜かさないように気をつける
```bash
$ rsync -auz -vv --stats --progress --exclude "*~" username@crab:/data/username/chignolin/ /home/username/path/to/
```

ローカルマシンへコピーしたら、シミュレーション結果の構造がおかしくないかPyMOLで確認
```bash
$ cd chignolin/
$ pymol -d "load init.psf, obj, 0, psf; load_traj run.dcd, obj, 0, dcd; remove not polymer; remove h.; dss; show sticks; intra_fit all"
```

