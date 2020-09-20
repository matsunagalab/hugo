---
draft: false
date: 2020-09-20T18:30:26+09:00
description: Lab-only
sidebar: right
categories:
  - "Lab"
---

### PyMOLハンズオン

<p align="center">
  <img src="../../images/pymol_acrb.png">
 </p>
</br>
<p align="center">
</p>

#### PyMOLとは？

- 20年くらいの歴史がある分子構造可視化ソフト

- 分子可視化ソフトにはVMDやCHIMERAなどがあるが、表示の美しさ・センスの良さで定評がある

- Python、OpenGL、FreeGLUTなどを使用している

- Warren DeLano個人によって開発されていたが、彼が突然亡くなってしまったため現在はSchrödinger社(バイオ系のソフトウェア会社)によって引き受けられている

- オープンソース版と有料ライセンス(バイナリとプラスαの機能配布)がある

#### インストール

オープンソース版をインストールします。現状、MacOSにはHomebrew経由でいれるのがよいです。HomebrewはAnacondaと相性が悪いので、Anacondaはアンインストールするか、pyenvで環境をわけるのが推奨です。

HomebrewでPyMOLをインストールするには森脇さん謹製のHomebrewレシピを使わせてもらいます https://qiita.com/Ag_smith/items/58e917710c4eddab46ee
```
$ brew tap brewsci/bio
$ brew install pymol
```

#### 基本操作

- 起動オプション
- ウィンドウ・メニューの説明
- fetchコマンド
    - `fetch PDB-ID`でPDBから構造データをダウンロードして構造を表示します
- マウス操作
    - 左ドラッグで回転
    - 右ドラッグで拡大・縮小
    - Optionを押しながら左ドラッグで並進
    - スクロールでslab
- Objectメニュー
    - Action, Show, Hide, Label, Color
- seqenceメニュー
    - 配列の部分(selection)を選択するのに便利

#### コマンドの文法

PyMOLのコマンドは以下のような文法になっています。
```
何かの処理 オブジェクト
```
例えば
```
center all
```
というコマンドは、全てのオブジェクト(all)を真ん中へ移動させる(center)という処理を行います。

オブジェクトは、構造データ(PDBファイルなど)を読み込んだり、読み込んだ構造を選択(selection)することで作ることができます。

#### コマンドの実践

実際にコマンドを実行しながら、処理やselectionのやり方を見ていきましょう

```
# PDBから PDB ID=1ake の chain=Aの構造をダウンロードする
fetch 1akeA

# 全てのオブジェクトを真ん中へ移動させる(allの省略も可)
center all

# 全てのオブジェクトのline表示を追加する
show lines, all

# 特定のオブジェクト(1akeA)をline表示だけにする
as lines, 1akeA

# chain Aの色を赤にする
color red, chain A

# 元素名sのsphere表示を追加する
show spheres, elem s

# 原子名cまたはnまたはoまたはcaのstick表示を追加する
show sticks, name c+n+o+ca

# アミノ酸残基番号10〜15の色を青にする
color blue, resid 7:13

# アミノ酸残基名pro(proline)の色を黄色にする
color yellow, resn pro

# 分子種をselectして表示を変える
as cartoon, polymer
as spheres, solvent
as sticks, organic

# 二次構造をselectしての色を変える
as cartoon
color purple, ss h #ヘリックス
color yellow, ss s #シート
color red, ss l #ループ
color blue, ss “” #それ以外

# logical operatorを使って複雑なselectionを行う
show dots, not name c+n+o+ca #側鎖
color white, resn ala and resid 1:30 and chain A

# selectionを名前を付けてオブジェクトとして保存し、後で使う
select backbone, name c+n+o+ca
show sticks, backbone

# 距離でselectする
as cartoon
show sticks, organic
show sticks, organic around 5.0
show sphere, organic around 5.0 and solvent
```

#### 他のよく使うコマンド

構造の取得、ファイルの読み込み
```
#PDB-IDを指定してPDBから構造データをとってくる
fetch 4ake
#更に、Chain=Aを指定する
fetch 4akeA
#構造ファイルを読み込む
load 4ake.pdb
```

Pymol session(pseファイル)の保存と読み込み
```
save 4ake.pse
load 4ake.pse
```

画像ファイルとして保存
```
# レイトレーシングして綺麗にしてから
ray
# pngへ保存
png 4ake.png
```

PyMOLの初期化
```
reinitialize
```

表示の変更
```
showは表示を加える
asはその表示だけにする
hideは表示を隠す
```

ヘルプ
```
help コマンド名
```

構造の重ね合わせ
```
align mobile, target
super mobile, target
```

背景色を変える
```
bg_color white
```

```
create, select

center, orient, zoom

set
```

#### Scene(シーン)
Sceneとは構造の表示や見ている角度を含んだ現在の可視化状態のことを言います。PyMOLではこのSceneを何個も保存して、後で気軽に呼び出すことができます。

Sceneの保存
```
scene new, store
# またはメニューから保存
# またはFn+Cmd+→ on Mac

```

Sceneの呼び出し
```
# 左下のSceneボタンをクリック
```

#### PyMOLのワークフロー

1. 構造をとってくる
    - `fetch 4ake `
1. 見やすい角度や表現でsceneを保存する
    - `scene new, store`
1. PyMOL session(pse)として保存する
    - `save myfile.pse`
1. 次回作業する時はpseを開き、2へ戻る
    - `load myfile.pse` または起動時に `$ pymol myfile.pse`

#### 輪講で勉強したことの確認をする

それでは輪講で勉強したタンパク質の構造の特徴を実際に確認してみましょう。
確認したらその都度sceneとして保存していきましょう。最後にpseとして保存しましょう。

初期化して構造をとってくる
```
reinitialize
fetch 4akeA
```

二次構造と水素結合
```
# 二次構造判定
as cartoon
dss #本当はdsspかstrideで二次構造判定することを推奨
# 主鎖の水素結合を表示
as sticks, name c+n+o+ca
Objectメニュー 4akeA->Action->find->polar contacts-> just intra-main chain
```

疎水性
```
# 疎水性残基を黄色で表示。内部に埋もれていることを確認する
select hydrophobic, resn ala+cys+gly+val+ile+leu+phe+pro+met+trp+tyr
show spheres, hydrophobic
color yellow, hydrophobic
```

親水性
```
# 親水性残基を黄色で表示。表面に露出していることを確認する
select hydrophilic, resn arg+asn+asp+gln+glu+his+lys+ser+thr
show spheres, hydrophilic
color blue, hydrophilic
```

分子表面
```
as surf
```

Solvent accessible surface area (SASA)
```
# PyMOLではSASAの値だけ
Objectメニュー->4akeA->generate->compute->surface area->solvent accessible
```

静電ポテンシャル
```
Objectメニュー->4akeA->action->generate->vacuum electrostatics->protein contact potential (local)
```

重ね合わせて構造比較
```
reinitialize
fetch 1akeA
fetch 4akeA
align 4akeA, 1akeA
```

結合ポケット
```
# 簡易的であるがPyMOLのcavityモードを使う
# タミフルでの例
reinitialize
fetch 2ht7
show surf
set surface_cavity_mode, 1
set surface_color, gray
```

#### シミュレーショントラジェクトリの読み込み
シェルの起動コマンドラインの引数で指定してしまうのが便利です
```
$ pymol -d "load resources/alanine-dipeptide-implicit.pdb, obj, 0, pdb; load_traj output.dcd, obj, 0, dcd"
```
シミュレーション結果は分子の並進・回転が入っているで重ね合わせをして取り除きます
```
# polymerでタンパク質だけを指定して重ね合わせ
intra_fit polymer
```

#### 参考
- PyMOL Wiki https://pymolwiki.org
- 阪大 蛋白研 鈴木守先生のページ http://www.protein.osaka-u.ac.jp/rcsfp/supracryst/suzuki/jpxtal/Katsutani/install.php
- 東大 森脇さんのPyMOL tutorial https://yoshitakamo.github.io/pymol-book/index.html



