---
title: '设计一套乐观更新机制'
description: '做人呐，最重要的就是乐观啦'
tags: ['design']
cover: '../../../images/blog/optimistic-update.jpg'
series: ''
draft: true
original: true
---

2020 年的上半年，比往年任何时候过得都快。转眼已经到了下半年，终于，我又营业了。

在正式开始写这篇文章之前，我特意在百度、知乎、掘金等平台搜了一下「乐观更新」，发现相关的内容屈指可数，讲「乐观锁」的到是有不少。

那正好，就让我来填补一下这个空白吧。

## 什么是「乐观更新」

通常，客户端在发起 CRUD 请求之后，都需要等待服务端返回，然后再去更新视图。这逻辑非常合理，一点毛病没有。唯一的缺点，就是在等待服务端响应的时间里，客户端只能空等，直观感受就是：用户从交互结束，到看到结果，中间免不了会有一个可感知的延迟。稍微对用户体验有所追求的，都会在这个时候显示一个 Loading，让用户知道系统还在运行。

如果你体验过 Google 家的产品，你一定会惊叹于其交互的响应速度，那种按下按钮之后立刻得到结果的快感，就好像一切都发生在本地，根本不用等待接口响应一样。Google 之所以能做到这种程度，并不是因为它是 Google —— 一个掌握着浏览器、网络协议、V8 引擎等核心技术的互联网巨头。人家的方案非常简单：真就是不等待接口返回，请求发出去的同时，直接就把交互的结果体现到视图上。

这就是「乐观更新」：客户端假设请求必然成功，因此不等待接口的返回，先行对视图进行更新。

## 这么乐观，真的大丈夫吗？

乐观虽好，但我们也不能盲目乐观。并不是所有操作都可以通过「乐观更新」的方式来实现，需要有一些前提条件：

- 操作成功率非常高，大概率是不会失败的。
- 接口正常响应的耗时很短，不涉及大规模的计算或 IO。
- 操作可逆，失败了可以撤销。

像发送一条消息、删除一个文件，这些都是可以考虑「乐观更新」的，能够大幅提升用户体验。

你能接受每发一条微信消息都要等个半秒钟它才会出现在屏幕上吗？Windows 10 中删除到回收站的默认行为已经不会弹确认框了你发现了吗？

反过来，像文件传输、鉴权相关的操作，就不适合「乐观更新」了。

你能想象迅雷还没开始下载就直接显示下载完毕了吗？或者用支付宝付款的时候，先显示支付成功，然后才告诉你余额不足被撤单吗？

## 要乐观，也要悲观

在一个良好的网络环境中（如 Wifi、4G），接口的返回大概率会是成功的。因此客户端在发起请求的同时，完全可以大胆假设接口的返回就是成功的。既然已经知道了结果，那就不用非得等接口了，直接就可以进行后面的操作。

然而这一系列的操作，全都是基于一个假设，既然是假设，那就必然有猜错的时候。为了确保系统逻辑的正确，我们必须要为这种情况做好准备。

因此，尽管「乐观更新」不等接口返回就已经开始后面的流程，但这并不表示我们对接口的返回就完全不关心了，还是需要等待接口的返回结果，来验证之前的操作是否真的有效。大概率下返回结果和预期是一致的，我们一般不用额外处理；但如果有偏差，就需要撤销之前的操作，并且告知用户。

## 自己搭一套乐观更新机制

### 架构

首先，我们来设计一下乐观更新的基本架构。

![optimistic-update-arch](../../../images/blog/optimistic-update/optimistic-update-arch.jpg)

大体上和 Flux 的架构差不多，还是一个 reducer (state, action) => state 的过程，只不过中间的 action 不是一次性的，需要保存到一个队列中，直到状态被确认才能被销毁掉。

乐观更新的 Action 和一般我们在 Redux 或者 Vuex 里见到的 Action 比较不同，由于不是一次性的，它需要附带一些额外的信息来记录当前的状态，可能的结构如下：

```typescript
interface Action {
  // 常规结构
  type: string
  payload?: any

  // 乐观更新附加的
  id: string
  createdAt?: number
  updatedAt?: number
  confirmedAt?: number
}
```

乐观更新的 Action 的生命周期有点类似 Promise，创建后进入 pending 状态，之后要么被 confirm，要么被 cancel。最基本的例子就是在发送请求的同时，创建一个 Action 并将其添加到队列中，然后将队列中的 Action 依次应用到当前的 state 上得到新的 state。

Action 如果被 cancel 了，那么就从队列中将其剔除，重新计算新的 State，这样就完成了客户端的撤销操作。而在服务端，数据压根儿就没有改变，不用处理。

Action 只有被 confirm 了，才可以被合并到「已确定的 State」中，并从队列中移除。

比较特别的是，乐观更新的 Action 是可以被 update 的。因为一次乐观更新未必只包含一个对象的操作，有可能还会附带一系列关联数据的操作。这就涉及到接下来要讲的「ID 管理」。

### ID 管理

在传统的 CRUD 结构中，生成 ID 的工作通常都是交给服务端，客户端只是读取。但在乐观更新中，客户端在接口返回之前就已经需要用到这些 ID，来不及等服务端生成，为此客户端必须要自己生成这些 ID。可如果直接把服务端生成 ID 的逻辑搬到客户端，在数据安全方面会有很大的隐患，因此客户端只能生成一个临时的 tempID，把坑占上，等拿到服务端生成的真正的 ID 之后再进行替换。

对于只涉及单个对象的场景，替换 ID 的操作安排在 confirm 时就好了。但如果创建一个对象的同时还需要创建若干个与之相关联的对象的话，问题就比较复杂了。为了能够尽快把结构呈现给用户，所有的 tempID 都是一起创建的，包括用于关联的字段，也都是取得 tempID 的值。但为了实现真正的数据关联，我们还是需要先取得上一步结果返回的真实 ID，才能进行下一步。

拿我最近经手的一个需求举个例子：一个支持手绘圈点的讨论系统。

由于系统需要支持圈点的搜索（比如查找所有「红色」+「矩形」的圈点），圈点的数据必须单独建模存储，并记录其所属的讨论。

在发送一条带圈点的讨论时，客户端会先为两者各自创建 tempID，并通过 tempID 进行关联，为此需要创建至少两个 Action。

```typescript
const actionIdD = createAction({
  type: 'CREATE_DISCUSSION',
  payload: {
    // highlight-next-line
    id: 'temp_id_d'
  }
})

const actionIdA = createAction({
  type: 'CREATE_ANNOTATION',
  payload: {
    id: 'temp_id_a',
    // highlight-next-line
    discussionId: 'temp_id_d'
  }
})

// Update Queue
[
  {
    id: 'action_id_d',
    type: 'CREATE_DISCUSSION',
    payload: {
      id: 'temp_id_d'
    }
  },
  {
    id: 'action_id_a',
    type: 'CREATE_ANNOTATION',
    payload: {
      id: 'temp_id_a',
      discussionId: 'temp_id_d'
    }
  }
]
```

由于圈点需要记录其所属的评论，这就要求在创建圈点数据时，相应的讨论必须已经存在，因此在请求接口时，需要先发起 `POST /discussion`，用返回结果中真实的讨论 ID，去替换客户端的数据所引用的 tempID。

注意，这里需要操作多个 Action。讨论的数据到此为止就已经创建完成了，因此相应的 Action 可以直接 confirm。但圈点的创建目前还没完成，因此只能先 update。

> 这里我们设定 confirm 操作可以附带更新数据的操作，你也可以将其设定为更加纯粹的操作，然后多加一次 update 来实现。

```typescript
confirmAction(actionIdD, {
  // highlight-next-line
  id: 'id_d'
})

updateAction(actionIdA, {
  // highlight-next-line
  discussionId: 'id_d'
})

// Update Queue
[
  {
    id: 'action_id_d',
    type: 'CREATE_DISCUSSION',
    payload: {
      // highlight-next-line
      id: 'id_d'
    }
  },
  {
    id: 'action_id_a',
    type: 'CREATE_ANNOTATION',
    payload: {
      id: 'temp_id_a',
      // highlight-next-line
      discussionId: 'id_d'
    }
  }
]
```

现在我们终于可以发起 `POST /annotation`，去创建圈点的数据，并用返回的真实数据，再次更新客户端的圈点数据。至此圈点的数据也算创建完成，因此可以直接 confirm。

```typescript
confirmAction(actionIdA, {
  // highlight-next-line
  id: 'id_a'
})

// Update Queue
[
  {
    id: 'action_id_d',
    type: 'CREATE_DISCUSSION',
    payload: {
      id: 'id_d'
    }
  },
  {
    id: 'action_id_a',
    type: 'CREATE_ANNOTATION',
    payload: {
      // highlight-next-line
      id: 'id_a',
      discussionId: 'id_d'
    }
  }
]
```

### 时序问题

乐观更新需要关心的另一个重要问题，就是「时序」。

很多人在刚接触「乐观更新」的时候，都容易犯一个错误，Action 只要得到确认了，就可以马上合并到「已确定的 State」中去。然而各个 Action 之间是有可能存在顺序的，如果不按顺序来，有可能会得到意外的结果。

我们再来举一个例子：

假设初始状态为 A，先将其改为 B，在 B 操作得到确认之前，又将其改为 C。我们预期最终会看到结果显示为 C。在一个同步的系统中，这是必然的结果。但如果系统是「乐观更新」的，这两个操作谁先被 confirm 是不确定的，如果 confirm 完立即合并的话，就有可能出现 B 的请求先发送，但晚于 C 得到返回，导致状态先变为 C，后变为 B，最终显示为 B 的错误结果。

所以我们必须对这一步加以干预，让 Action 只能按照其创建的顺序进行合并。具体到实现上，就是只有排在队首的 Action 可以被合并，在它被合并之前，后续的 Action 都不能被合并。

更好一点，我们可以设置一个超时机制，以防止某个 Action 长时间得不到响应，而堵塞了后面的 Action 的合并，导致队列无限增长，影响性能。

### 小结

作为产品最直接的展示面，客户端的体验直接影响着用户对产品的印象，其重要性不言而喻。「乐观更新」就是一种很好的提升用户体验的手段，虽然在技术实现上有一点点麻烦，但结果是我们喜闻乐见的。在当下网络环境普遍都很好的大前提下，我们希望看到有更多的产品能够在合适的场景中把它应用起来，减少那些「卡一下」的瞬间，让产品的使用感受更上一层楼。
