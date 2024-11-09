---
draft: false
date: 2020-09-20T18:30:26+09:00
description: Lab-only
sidebar: right
categories:
  - "Lab"
---

MacOSでのインストール

#### OpenMPIのインストール

GENESISでは、プロセスを並列に複数走らせて、並列計算を行います。並列化されたプロセス間のデータのやりとりにMPIという仕組みを使いますので、MPI実装の一つであるOpenMPIを使います。MacOSでOpenMPIをコンパイルする手順は以下の通りです。

```bash
$ brew install automake wget
$ brew install gcc@11
```

```bash
$ wget https://download.open-mpi.org/release/open-mpi/v4.0/openmpi-4.0.5.tar.gz
$ tar zxvf openmpi-4.0.5.tar.gz
$ cd openmpi-4.0.5/
$ ./configure CC="$(brew --prefix)/bin/gcc-11" CXX="$(brew --prefix)/bin/g++-11" F77=gfortran FC=gfortran --enable-mpi-thread-multiple --prefix=/opt/openmpi-4.0.5
$ make
$ sudo make install
```

もし`configure`の際に以下のようなエラーが出たら、CommandLineToolsを再インストールします。
```bash
$ sudo rm -rf /Library/Developer/CommandLineTools
$ sudo xcode-select --install
```

コンパイルできたらインストールして環境変数PATHを設定します。
```bash
$ sudo ln -sf /opt/openmpi-4.0.5 /opt/openmpi
```

vimで `~/.zshrc` の末尾に以下を追加
```bash
# openmpi
export PATH=/opt/openmpi/bin:$PATH
export LD_LIBRARY_PATH=/opt/openmpi/lib:$LD_LIBRARY_PATH
export DYLD_LIBRARY_PATH=/opt/openmpi/lib:$DYLD_LIBRARY_PATH
export MANPATH=/opt/openmpi/share/man:$MANPATH
```

```bash
$ source ~/.zshrc
```

無事にインストールされてPATHが通っているか確認
```bash
$ which mpirun
```

### GENESISのインストール

MacOSでGENESISをコンパイルする手順は以下の通りです。

```bash
$ wget --content-disposition "https://www.r-ccs.riken.jp/labs/cbrt/?smd_process_download=1&download_id=25561"
$ tar jxvf genesis-2.0.0.tar.bz2
$ cd genesis-2.0.0/
$ ./configure
$ make install
```

コンパイルできたらインストールして環境変数PATHを設定します。
```bash
$ cd ..
$ sudo mv genesis-2.0.0 /opt/
$ sudo ln -sf /opt/genesis-2.0.0 /opt/genesis
```

vimで `~/.zshrc` の末尾に以下を追加
```bash
# genesis
export PATH=/opt/genesis/bin:$PATH
```

設定を反映
```bash
$ source ~/.zshrc
```

無事にインストールされてPATHが通っているか確認
```bash
$ which atdyn
```
