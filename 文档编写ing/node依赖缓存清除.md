npm 缓存路径查看命令 

```
npm config get cache
```

`npm cache verify` 验证缓存数据的有效性和完整性，清理垃圾数据

**查看已缓存包的列表**

```
 yarn cache list
```

**查询cache缓存文件目录路径**

```
yarn cache dir
```



#### 清理缓存包

- yarn

```
yarn cache clean
```

```
yarn cache clean --force
```



- npm 

  ```
  npm cache clean --force
  ```

- pnpm 

  ```
  pnpm store prune --force
  ```

  





#### 清理缓存包

```
yarn config set cache-folder <path>

// 通过指定 --cache-folder 的参数来指定缓存目录
yarn <command> --cache-folder <path>

```



##  删除依赖包

```
npm install rimraf -g
pnpm i   rimraf
```





```
rimraf node_modules
```



### 内网镜像

```shell
 npm config set registry http://10.165.30.164:9090/repository/npm-group/
```

### 公网

```
npm config set registry https://registry.npmmirror.com
```





```
echo branch
branch=$(echo $branch | sed 's/origin\///g')
echo $branch

mv  dist/build/h5/* dist/
rm -r dist/build
zip -r dist.zip dist



# 使用Docker命令来检查镜像是否存在
docker inspect $IMAGE &> /dev/null

# 检查上一个命令的返回值
if [ $? -eq 0 ]; then
    echo "镜像存在"
else
    echo "镜像不存在"
fi
```



```

IMAGE=10.165.19.1:7443/sit/umv/service-front:${branch}

kubectl --kubeconfig=/home/umvrd03/.kube/config --context=sit-cluster  -nuat set image deployment/static-nginx-web  service-front-prepare=$IMAGE
+ kubectl --kubeconfig=/home/umvrd03/.kube/config --context=sit-cluster -nuat set image deployment/static-nginx-web service-front-prepare=10.165.19.1:7443/sit/umv/service-front:develop
```

```
pnpm install --no-frozen-lockfile
yarn build
zip -r dist.zip dist

cat  << EOF > Dockerfile
FROM containerimage-094a2e74.ecis.guangzhou-2.cmecloud.cn/library/alpine:latest
COPY dist.zip /dist.zip
EOF
```

