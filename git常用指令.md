

git status -- 查看状态

git init ---初始化一个文件夹作为仓库

git add ---将文件添加进暂存区  
 ① .  所有变化提交缓存（修改文件和新文件 不包括被删除文件）  
 ② -u 缓存已经被追踪的文件，新文件不会提交
 ③ -A   以上2个功能的集合

git rm --cached . -r(表示递归) ---删除暂存区的全部内容

git commit -m 'xxx' --- 将暂存区添加到版本库

git log --- 查看消息

git diff --- 默认比较工作区和暂存区

git diff master（分支名称，不一定是master） --- 比较工作区和版本库

git diff --cached -- 比较暂存区和版本库1

git checkout .|文件名 --- 从暂存区将工作区内容覆盖

git reset HEAD .|文件名 --- 将暂存区的内容回退一个版本

git commit -a -m 'xxx' --- 直接将文件提交到版本库（前提是要提交过一次）

git reset --hard 版本号(HEAD^表示是上一个版本号) --- 就暂存区和工作区多内容直接回滚到某个版本👌（这个是已经提交到版本库，需要回滚）

git reflog -- 打出所有到版本号

git branch --- 查看所有分支

git branch -D xxx --- 删除某个分支

git branch xx --- 创建分支

git checkout xxx --- 切换到某个分支

git checkout -b xxx --- 创建并切换分支

如果你在某个分支上进行了修改，但是没有git add 和 git commit ,那这个时候你就不能切换，git 会拒绝你到切换,这个时候你可以commit他们，但是你也可以使用 git stash ,切换到时候会暂存起来（分支更改到时候不能切换分支），如果切回来后想再要，用git stash pop,基本不用这个命令

git merge 合并分支





### 分支介绍：

- master: 主分支，主要用来版本发布。
- develop：日常开发分支，该分支正常保存了开发的最新代码。
- feature：具体的功能开发分支，只与 develop 分支交互。
- release：release 分支可以认为是 master 分支的未测试版。比如说某一期的功能全部开发完成，那么就将 develop 分支合并到 release 分支，测试没有问题并且到了发布日期就合并到 master 分支，进行发布。
- hotfix：线上 bug 修复分支

### 缓存区：

- 缓存修改内容： git stash save  '注释'

- 还原当前分区最后一次缓存：

  1. git stash pop

  2. git stash apply




### 基变和合并

- 合并

  > 合并是将两个分支的末端与他们的共同祖先进行三方的合并然后提交。

  ```shell
  git merge  
  ```

  ![git-merge前](D:\notes\daily-note\img\git-merge前.png)

> 将C2，C4，C5合并

![git-merge后](D:\notes\daily-note\img\git-merge后.png)

> 合并以后的结果



- 基变

  > **将对分支做的修改提取出来**，对着目标分支依次执行一次。最后产生的快照和合并后产生的快照是一样的，区别是合并回来的分支从分支历史上消失了。

  ```shell
  git rebase 
  ```

  基变后需要执行`git merge`合并操作

  ![git-rebase](D:\notes\daily-note\img\git-rebase.png)

  

> 变基后C4就从历史中消失了。C4'的快照与C2,C3,C4合并后的快照是一样的

最后总结一下，**变基虽然会让提交历史变得简洁**但是他实际上相当于撤销了之前分支的提交又产生了一个新的提交，在多人开发中很容易引起混乱，但是如果是自己独立开发的一个分支的话使用变基可以使自己的分支提交的时候更易整理。所以多人的时候一定要用合并，一个人玩的时候可以用变基。



