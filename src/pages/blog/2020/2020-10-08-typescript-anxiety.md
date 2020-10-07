---
title: 'TypeScript 焦虑'
description: '这东西，有毒'
tags: ['typescript']
cover: '../../../images/blog/blank.jpg'
series: ''
draft: true
original: true
---

## 焦虑 1：类型依赖

自从用上 TypeScript 之后，就越发的离不开它了，现在让我回去写 JS，总有种隐隐的不安全感，不确定自己写的东西对不对。

## 焦虑 2：不知该怎么写

每次开始用一个新的库，或是老的库更新了主版本，往往会遇到这样的问题：老代码这里不用指定泛型的，现在却需要了，但是要怎么写呢？

### TypeScript & React

### TypeScript & React-Router

#### withRouter

按照 [官方提供的示例](https://reactrouter.com/web/api/withRouter)，`withRouter` 只要这样写就好了：

```ts
export default withRouter(Componet)
```

但如果你用的是 TypeScript，此时你很可能会遇到这样的错误：

![withRouter](../../../images/blog/typescript-anxiety/withRouter.png)

原因在于 withRouter 向下传递了一些未定义的 Props，因此解决方法也很简单，给组件的 Props 上加上这些类型定义即可。`react-router` 已经提供了这部分的类型定义，直接继承即可：

```ts
import { RouteComponentProps, withRouter } from 'react-router-dom'

interface Props extends RouteComponentProps {}

export const DrawerComponent: FC<Props> = withRouter(props => {
  // ...
})

export const Drawer = withRouter(DrawerComponent)
```

### TypeScript & Axios

### TypeScript & RxJS

### TypeScript & Window
