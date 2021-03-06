---
draft: false
date: 2020-09-20T19:22:44+09:00
description: Research
sidebar: right
categories:
  - "Recruiting"
menu:
  "学生の皆さんへ"
---

### FAQ

#### 研究室でどのような能力が得られますか？

情報工学、特に学部で学んできた数学・プログラミング・データ解析の知識を自然現象の解析(我々の場合は特に生命科学)へ応用する能力が得られます。また逆に、データ解析やシミュレーションは、実際のモノへ応用してあれこれ苦労することで、手法自身に対する理解が深まるということが多いです。その意味では、自然現象にあまり興味がなくても、とにかく大きな計算をしてみたいとか、複雑なデータを解析してみたい、という向きの人もマッチすると思いますし、もちろん歓迎します。

#### 生物の知識がなくても大丈夫ですか？

大丈夫です。研究では主に「タンパク質の構造」についての知識が求められますが、そのあたりの基礎は最初の2〜3月間で一緒に輪講を行ってゼロから勉強します。2019年度は、[「タンパク質の立体構造入門――基礎から構造バイオインフォマティクスへ」](http://bookclub.kodansha.co.jp/product?item=0000148255)という本を教員と一緒に輪講で2ヶ月かけて読み終えました。

#### 物理や化学の知識がなくても大丈夫ですか？

シミュレーションに使っている理論は、「ニュートンの運動方程式(F=ma)」等のとても基礎的なものです。一方で、複雑なシミュレーション結果の解釈には「統計力学」の知識が必要な場面があります。これはその都度、教員と勉強していきます。

学部生では難しいかもしれませんが、大学院生には体系的に統計力学を勉強してみることをおすすめしています。統計力学の概念は機械学習でも多くの場面で現れるのできっと将来的にも役に立ちます。生体分子向けの教科書としては、[「生体分子の統計力学入門―タンパク質の動きを理解するために―」](https://www.kyoritsu-pub.co.jp/bookdetail/9784320034990)があります。また、この教科書を東大の山下先生が解説してくれている以下の講義動画もあります。

- 講義 生体分子の統計力学入門　by 山下先生@東大 https://www.youtube.com/playlist?list=PLDzkOUUQQYmnTzfTncG-SJiURoPq-Bv8Z

また、夏に分子研で行われている分子シミュレーションスクールでは、数日の間でシミュレーションのための理論を広範囲に渡って学べます(先着順で交通費がサポートされます)

- 分子シミュレーションスクール https://ccportal.ims.ac.jp/msschool2019

#### 高速化や並列化プログラミングはどうやって勉強できますか？

正直なところプログラミングは教員もそれほど得意ではないですが(大好きではありますが)、卒検のための研究活動を通して、その都度コードを一緒に読んだり書いたりしながら直接教えることができます。高速化や並列化には様々な階層があり、この一冊といった教科書をあげるのは難しいのですが、計算科学向けとしては以下があります。研究室にも置いてあります。

- 計算科学のためのHPC技術１ http://www.osaka-up.or.jp/books/ISBN978-4-87259-586-4.html
- 計算科学のためのHPC技術２ http://www.osaka-up.or.jp/books/ISBN978-4-87259-587-1.html

また、ネット上には高速化・並列化を解説したテキストが多くあります。

- 一週間でなれる！スパコンプログラマ by 渡辺先生@慶応大 https://github.com/kaityo256/sevendayshpc
- ネットワーク系演習II：ハイパフォーマンスコンピューティング by 福嶋先生@名工大 https://fukushimalab.github.io/hpc_exercise/
- How to Write Fast Numerical Code - Spring 2019 by ETZ https://acl.inf.ethz.ch/teaching/fastcode/2019/

生命科学向けでは以下の講義資料・動画が配信されています。

- 配信講義　計算科学技術特論A (2019) https://www.r-ccs.riken.jp/library/event/tokuronA_2019.html
- 計算生命科学の基礎Ⅴ by 理化学研究所 https://www.r-ccs.riken.jp/category/field02/field02-class01/field02-class01-04

各地で学生向けのサマースクールやインターンなどが行われています(場合によっては交通費などがサポートされます)。

- KOBE HPC サマースクール(初級) 神戸大学 http://www.eccse.kobe-u.ac.jp/simulation_school/kobe-hpc-summer-basic-2019/
- RIKEN R-CCS インターンシップ 2019 https://www.r-ccs.riken.jp/library/event/190515/


#### 研究テーマはどんなものがありますか？

2019年度の4年生には、データサイエンス系のテーマに取り組んでもらっています。具体的には「スパースモデリングを用いた自由エネルギー変化における重要な相互作用の解析」というテーマで、タンパク質構造安定を決める自由エネルギーという統計量をスパースモデリングを使ってできるだけシンプルに表現することで、構造安定性にどのような相互作用が効いているのか調べることが目標です。もうひとつは、「ガウス過程を用いた​自由エネルギー推定​によるサンプリングの効率化」というテーマで、これも自由エネルギーをガウス過程という機械学習系の手法で推定するのですが、ガウス過程を使うとサンプリングが足りない箇所も教えてくれるので、その情報を次にシミュレーションを行う箇所にフィードバックしてシミュレーションを効率化するのが目標です。

2019年度の修士1年生には、シミュレーション系のテーマに取り組んでもらっています。「レプリカを用いたシミュレーションの効率化」というテーマで、様々なタンパク質構造をシミュレーションでサンプルするのを、たくさんのシミュレーション(レプリカ)を同時に連携させることで効率化するのが目標です。具体的には、レプリカ交換というマルコフ連鎖モンテカルロ法の代表的な手法の交換頻度を上げる手法の開発に取り組んでいます。

#### 研究室の生活はどのような感じですか？

勉強は頑張るけど、研究はとにかく楽しくと心がけています。コアタイムはありませんが、授業のない日はできるだけ、どの時間でも良いので研究室へ顔を出すようにしてください。最初の2〜3ヶ月は基礎学力を付けるために週一の輪講を行い、その後週一のゼミを行っていきます。一人一台のPCとデスク・チェアや、自由に使えるコーヒーメーカーなどがあります。

#### どのような学会へ参加しますか？

今のところ、以下のような理学系の学会が多いです。今後、工学系の学会へも徐々に参加していく予定です。

- 分子シミュレーション討論会 http://www.mol-sim.jp/symposium.html
- CBI学会 https://cbi-society.org/taikai/taikai19/index.html
- 生物物理学会 https://www.biophys.jp
- 蛋白質科学会 http://www.pssj.jp
- Biophysical Society https://www.biophysics.org
- 情報処理学会 バイオ情報学研究会 http://www.ipsj.or.jp/katsudou/sig/sighp/bio/

#### その他役立つ情報

- 大学院入試の出題範囲 http://www.ics.saitama-u.ac.jp/exam/in/admissions-prepare/
- 奨学金のリスト https://奨学金.net/archives/67540341.html

