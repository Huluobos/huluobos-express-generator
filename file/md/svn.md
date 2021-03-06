重要的概念
> trunk ：是主分支，是日常开发进行的地方。

> branches ：是分支。一些阶段性的release版本，这些版本是可以继续进行开发和维护的，则放在branches目录中。又比如为不同用户客制化的版本，也可以放在分支中进行开发。

> tags ：目录一般是只读的，这里存储阶段性的发布版本，只是作为一个里程碑的版本进行存档。

分析

```
在实际开发中，应该根据实际情况设置svn的文件夹目录、分支。
svn分支和git其实一样。只不过svn在本地和服务端文件目录是一致的。git在本地只同事存在一个版本。
我们通过分支更改阶段代码，之后再合并到主干上。每次发版也可以将版本备份。
```


目录建立

```
每个项目下建立三个文件夹，trunk 、branches、 tags
原来的代码放到trunk文件下（没有原来的代码请忽略）
```

打分支
> 在 trunk 目录上右键 TortoiseSVN  选择 ‘分支/标记’。
> 到达路径直接写分支存放地址和分支名称。
> 如下，codeStyle就是新分支名称。
>     /SMS/eips-web/eips-gyAirport-web/branches/codeStyle
> 版本选择选择什么版本看情况而定吧。
> 当提示分支建完了时候，我们去branches文件夹下拉一下代码，就能看见分支了。

合并
> 我们实际开发其实应该在分支开发的。
> 开发完成后，我们在branches文件夹下要将已经完成的代码提交到分支。
> 提交后我们去主分支，选择合并一个分支版本范围（用于分支合主干）
> 合并深度视情况而定，一般默认就好。
> 当合并完成时，这个合并是在本地完成的，需要提交一下到主分支。

[参考链接-好孩子点不到](https://www.jianshu.com/p/7ae971e28a11/)