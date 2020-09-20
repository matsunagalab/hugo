---
draft: false
date: 2020-09-20T18:30:26+09:00
description: Lab-only
sidebar: right
categories:
  - "Lab"
---

### OpenMMハンズオン

OpenMM http://openmm.org

ハンズオン資料(Jupyter notebook) https://github.com/matsunagalab/openmm-tutorials

#### GitHubからハンズオン資料をダウンロード

```bash
$ git clone https://github.com/matsunagalab/openmm-tutorials.git
```

#### DockerのOpenMMイメージをダウンロード
12GBほどあるので時間がかかります

```bash
$ docker pull matsunagalab/openmm
```

#### Docker経由でJupyterを起動

```bash
$ cd openmm-tutorials/
$ docker run --rm -p 8888:8888 -e JUPYTER_ENABLE_LAB=yes -v "$PWD":/work matsunagalab/openmm
Executing the command: jupyter lab
[I 01:32:15.946 LabApp] Writing notebook server cookie secret to /home/jovyan/.local/share/jupyter/runtime/notebook_cookie_secret
[I 01:32:16.475 LabApp] JupyterLab extension loaded from /opt/conda/lib/python3.7/site-packages/jupyterlab
[I 01:32:16.475 LabApp] JupyterLab application directory is /opt/conda/share/jupyter/lab
[I 01:32:16.478 LabApp] Serving notebooks from local directory: /work
[I 01:32:16.478 LabApp] The Jupyter Notebook is running at:
[I 01:32:16.478 LabApp] http://0f9e67b09c57:8888/?token=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
[I 01:32:16.478 LabApp]  or http://127.0.0.1:8888/?token=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
[I 01:32:16.478 LabApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[C 01:32:16.482 LabApp] 
    
    To access the notebook, open this file in a browser:
        file:///home/jovyan/.local/share/jupyter/runtime/nbserver-6-open.html
    Or copy and paste one of these URLs:
        http://0f9e67b09c57:8888/?token=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     or http://127.0.0.1:8888/?token=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

最後の`http://127.0.0.1:8888/?token=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`をブラウザのURL欄に貼り付けてJupyterを使います。

