---
draft: false
date: 2020-09-20T18:30:26+09:00
description: Lab-only
sidebar: right
categories:
  - "Lab"
---

### PCクラスタ情報

#### クラスタの構成とストレージ環境

crabがログインノード兼ファイルサーバ。クラスタへログインする際はcrabが入り口となる。演算ノードへログインするとはほとんどなく、ほとんどの作業をcrab上で行う。crabはメモリ容量大きめ(512GB)なのでデータ解析にも使える。Jupyterが常時稼働しており、研究室HPのトップページからリンクでとべる。

crabを含めて、crabのネットワークに接続されている演算ノードのスペックは以下の通り。

|  hostname  |  CPUコア数  |  メモリ容量   | GPU                 |   主な用途                               | 
|------------|------------|--------------|---------------------|-----------------------------------------|
|  crab      |  64        | 512 GB       | なし                | データ解析や機械学習など                   | 
|  n1        |  64        | 64 GB        | Titan(Pascal) 10基  | シミュレーション                          | 
|  n2        |  64        | 64 GB        | Titan(Pascal) 10基  | シミュレーション                          | 
|  n3        |  64        | 64 GB        | GTX1080Ti     10基  | シミュレーション                          | 
|  n4        |  64        | 64 GB        | GTX1080Ti     10基  | シミュレーション                          | 
|  n5        |  32        | 64 GB        | GTX2080Ti     10基  | シミュレーション                          | 
|  m1        |  28        | 512 GB       | Quadro RTX8000 2基  | データ解析や機械学習など                   | 
|  m2        |  14        | 64 GB        | A5000 1基 A6000 1基 | データ解析や機械学習など                   | 

crabに接続されているハードディスクはRAIDで冗長化されており、主に2つのパーティションがある。どちらも演算ノードとNFSで共有されている。

|  mount point  |  容量           |   主な用途                                 | 
| ------------- | --------------  | ------------------------------------------|
|  /home        |  73 TB (RAID1)  | ホームディレクトリ　　　　 　　　　　　　　　  | 
|  /data        |  117 TB (RAID10)| シミュレーションとデータ解析                 | 
|  /data2       |  100 TB (RAID10)| シミュレーションとデータ解析                 | 

---

### slurmへのジョブの投入

流れているジョブの確認

```bash
$ squeue 
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               115       all   isrest nakayama  R 1-22:49:43      1 n3
               125       all isrest_t     yasu  R 1-00:09:45      1 n2
```

ジョブの投入
```bash
$ sbatch run.sh
```

ノードを指定してジョブを投入
```bash
$ sbatch -w n4 run.sh
```

更に、GPU枚数を指定してジョブを投入
```bash
$ sbatch --gres=gpu:2080:1 -w n5 run.sh
```

ジョブのキャンセル (JOB_IDを指定する。ここでは117とする)
```bash
$ scancel 127
```

JOB_ID=54が終わったら実行するジョブの投入 (chain jobs)
```bash
$ sbatch -w n1 --dependency=afterok:54 run.sh
```

ジョブスクリプトrun.shの例
```bash
#!/bin/bash
#SBATCH -p all
#SBATCH -J run # job name
#SBATCH -n 1  # num of total mpi processes
#SBATCH -c 1  # num of threads per mpi processes
#SBATCH -o run.log

# set GPU ID if needed
# export CUDA_VISIBLE_DEVICES="0"

# perform production with OpenMM
namd3 +devices 0 +p 2 run.sh
```

---

### 初期設定

#### アカウントの作成

クラスタの管理者(松永)へアカウント名を伝えて、アカウントを作成してもらう。アカウント名はローカルマシンで使っているものと一緒であるのが望ましい。

#### ログインノードのIPアドレスを登録

ローカルマシンへログインノードであるcrabのIPアドレスを登録する。
```bash
$ sudo vim /etc/hosts
# IP情報は別途提供する
```

#### クラスタへログインする

```bash
# on local machine
$ ssh crab
# アカウント名を指定する場合は ssh -l username crab
# 初期パスワードは別途提供する
```

#### 初期パスワードを変更する

```bash
# on crab
$ passwd
# 初期パスワードの入力
# 新パスワードの入力
```

#### SSH公開鍵認証の設定をする

パスワード認証はセキュアではないので、ローカルマシンとcrabとで公開鍵認証が行えるように設定を行う。
まず、Mac上で公開鍵・秘密鍵を作成する。ローカルマシンとcrabの認証に使う
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

