---
draft: false
date: 2020-09-20T18:30:26+09:00
description: Lab-only
sidebar: right
categories:
  - "Lab"
---

### Setup

#### 4年生向け：Macの環境セットアップ

研究室配属された4年生には1人あたりMacBook Pro1台をできる限り貸し出しています。
そのMacBook Proで、輪講やセミナーのスライド作成や、研究のコーディングや計算・解析(重たい計算はサーバでやりますが)、卒検発表のスライド作成と発表までほぼ全てを行ってもらいます。
教員や他のメンバーとも環境が揃っていたほうが便利なことが多いので、環境のセットアップ手順をまとめます。

以下の状態となることが目標です。各種ソフトウェアの具体的な使い方については、輪講後にハンズオンセミナーを行います：

- 研究室メンバーで連絡を取り合えるようにSlackを使えるようになる

- 資料作成のためにMicrosoft Office365(ワードやパワーポイント)を使えるようになる

- オンラインでの輪講やセミナーのためにZoomを使えるようになる(新型コロナ対応)

- プログラムのコーディングをするためにエディタ(Visual Studio Code)を使えるようになる

- タンパク質構造に慣れるために構造ゲームソフトであるFoldItで遊べるようになる

- タンパク質構造を可視化するソフトであるPyMOLを使えるようになる

- コンテナ型仮想環境であるDockerを使えるようになる

- Docker経由でデータ解析環境であるJupyterを使えるようになる

- Docker経由で分子シミュレーションソフトを使えるようになる

- ウィルス対策ソフトウェアをインストールしている

- セキュリティを強化している

#### 「ターミナル」の起動

まず、コマンドラインを実行するために、Macの「ターミナル」を「アプリケーション」 -> 「ユーティリティ」 -> 「ターミナル」 の順で立ち上げます。
研究ではこのターミナルソフトの中で様々なコマンドを実行することが多いです。

例えば、以下のコマンドを実行してください。MacOSのキーのリピートや認識が(再起動後に)速くなり、多少快適になります。最初のドルマークは無視してください。
```bash
$ defaults write NSGlobalDomain InitialKeyRepeat -int 10
$ defaults write NSGlobalDomain KeyRepeat -int 2
```

こうしたMacOSの細かな環境設定については[Qiitaの記事](https://qiita.com/jonghyo/items/733e0aeb5d6cd58e4855)などが参考になります。

#### Homebrewのインストールと必要なソフトウェアのインストール

HomebrewとはMacのアプリケーションのインストール・アンインストールを管理してくれるパッケージマネージャです。[ここ](https://brew.sh/index_ja)に従ってターミナルからインストールしてください。

Homebrewでは`brew`というコマンドの後に、命令を書いてアプリケーションを探したりインストールすることができます。以下で、命令可能なコマンドを確認してみてください。
```bash
$ brew help
```

Slackをインストールします。別途ワークスペース情報を共有するので大学のOffice365メールアドレスでログインしてください。
```bash
$ brew cask install slack
```

Microsoft Office365をインストールします。インストール後、起動時にアカウントが求められますので、大学のOffice365アカウントを使ってください。
```bash
$ brew cask install microsoft-office
```

Zoomをインストールします。
```bash
$ brew cask install zoomus
```

エディタであるVisual Studio Codeをインストールします。他のエディタのほうが好みである人はそれを使ってください。
```bash
$ brew cask install visual-studio-code
```

FoldItをインストールします。FoldItはワシントン大学のBaker研により開発された構造探索・デザインゲームです。初回輪講までにぜひ遊んでみて、どこまで進められたか、どこが難しかったか教えてください。
```bash
$ brew cask install foldit
```

PyMOLをインストールします。PyMOLはタンパク質構造可視化ソフトで、輪講で勉強した構造に関する知識が実際のデータを使って確認できるようになります。

PyMOLはUnix系OSのX Window System (GUI)を使っているので、まずはMacOSでX Window Systemを使えるようにするXQuartzをインストール必要があります。
```bash
$ brew cask install xquartz
```

その後、PyMOLをインストールします。
```bash
$ brew tap brewsci/bio
$ brew install pymol
# インストールできていることを確認
$ pymol -d "fetch 4akeA; center; show sticks"
```

#### Dockerのインストールと実行の確認

Dockerはコンテナ型仮想アプリケーションの実行環境であり開発環境です。シミュレーションや解析系のコンパイル・インストールが難しいアプリケーションはこれを使って実行します。これも`brew`でインストールできます。
```bash
$ brew cask install docker
```

Dockerの動作確認を兼ねて、Dockerを使って、データ解析系の環境であるJupyterを起動してみましょう。以下のコマンドを実行して出てくるアドレスをブラウザへ貼り付けてみてください。Ctrl+cで終了します。
```bash
$ docker run --rm -p 8888:8888 -e JUPYTER_ENABLE_LAB=yes -v "$PWD":/home/jovyan/work jupyter/datascience-notebook
```

また、Dockerを使って、分子シミュレーションソフトのGENESISを起動してみましょう。以下のコマンドでGENESISの計算エンジンである`spdyn`の簡易ヘルプを表示します。
```bash
$ docker run --rm -v $(pwd):/work -w /work/ ymatsunaga/genesis mpirun -np 8 spdyn
```

#### ウィルス対策ソフトウェアのインストール

大学で契約しているウィルス対策ソフトを[ここ](https://www.itc.saitama-u.ac.jp/services/anti-virus.html)からインストールしてください。ライセンスの関係で学内ネットワークのみからインストールすることができます。

#### セキュリティを強化する

まず、MacBook Proへのログインパスワードが簡単すぎる場合は、[ここ](https://support.apple.com/ja-jp/HT202860)に従って予測されにくいものへ変更してください。その後、[ここ](https://support.apple.com/ja-jp/HT204837)に従って、MacOSの機能である「起動ディスクの暗号化(FireVault)」をオンにしてください。これを有効にすれば、例えばMacBook Proが盗難にあってもデータが漏洩することを防ぐことができます。

