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

git diff --cached -- 比较暂存区和版本库

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


