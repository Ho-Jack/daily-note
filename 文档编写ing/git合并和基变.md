### Rebase vs Merge

关于 Rebase 和 Merge 的讨论，可以参考[这篇文章](https://link.juejin.cn?target=https%3A%2F%2Fgit-scm.com%2Fbook%2Fzh%2Fv2%2FGit-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)。

#### 异同总结

- Rebase 和 Merge 都可以用来合并不同分支的 commits

- Merge 可以保持修改内容的历史记录，但是历史记录会很复杂，关注点在于真实的操作记录

- Rebase 历史记录简单（线性），是在原有提交的基础上将差异内容反映进去

| Merge                                                        | Rebase                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ce35d9c57a04acca6bce5b339375aa4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) | ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0d83857a6854eef9e38256fd5a69956~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) |

#### 推荐操作

- 合并 master 分支的最新代码至本地分支，请使用 git rebase master

- 将本地代码合入公共分支，请使用 merge（提交 merge request）

作者：raincruise
链接：https://juejin.cn/post/7145400078939717645
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。