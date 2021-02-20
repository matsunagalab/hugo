---
draft: false
date: 2020-09-20T18:30:26+09:00
description: Lab-only
sidebar: right
categories:
  - "Lab"
---

Macでのインストール

#### OpenMPIのインストール

```bash
$ brew install automake wget
```

```bash
$ wget https://download.open-mpi.org/release/open-mpi/v4.0/openmpi-4.0.5.tar.gz
$ tar zxvf openmpi-4.0.5.tar.gz
$ cd openmpi-4.0.5/
$ ./configure CC="$(brew --prefix)/bin/gcc-10" CXX="$(brew --prefix)/bin/g++-10" F77=gfortran FC=gfortran --enable-mpi-thread-multiple --prefix=/opt/openmpi-4.0.5
$ make
$ sudo make install
```

もし`configure`の際に以下のようなエラーが出たら、CommandLineToolsを再インストールする
```bash
$ sudo rm -rf /Library/Developer/CommandLineTools
$ sudo xcode-select --install
```

```bash
$ sudo ln -sf /opt/openmpi-4.0.5 /opt/openmpi

$ cat << EOS
# openmpi
export PATH=/opt/openmpi/bin:$PATH
export LD_LIBRARY_PATH=/opt/openmpi/lib:$LD_LIBRARY_PATH
export DYLD_LIBRARY_PATH=/opt/openmpi/lib:$DYLD_LIBRARY_PATH
export MANPATH=/opt/openmpi/share/man:$MANPATH
EOS >>~/.zshrc

$ source ~/.zshrc
```

### GENESISのインストール

```bash
$ wget --content-disposition "https://www.r-ccs.riken.jp/labs/cbrt/?smd_process_download=1&download_id=14618"
$ tar jxvf genesis-1.5.1.tar.bz2
$ cd genesis-1.5.1/
$ ./configure
$ make install
```
