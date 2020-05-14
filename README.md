**2017年1月，微信小程序上线**
**2017年10月，支付宝小程序上线**
**2018年7月，百度智能小程序上线**
**2018年11月，今日头条小程序上线**

超级APP+众多小程序的模式的时代来了

小程序（**以下的小程序都是指微信小程序，其它几个厂子的还没研究过**）因代码体积和网络请求等一些局限性致使功能受限，用户体验和原生的APP比起来也有所差距，可是像我这种对使用电脑和手机有**洁癖**或者说是**强迫症**的人来说基本是能用小程序就不用APP（*真的是洁癖吗？😂😂不是是手机和电脑内存太小，安装不了那么多软件吧*）。至于那些缺点，随后大佬们肯定会解决的

作为一位不知名的Android开发工程师，因为学习能力、智商等限制，再加上急功近利，在Android方面如果不是在工作过程中遇到，真的不想去耐着性子去死磕比较难的东西，花很长的时间，并不一定能得到想要的效果。既然不能在技术的深度上精益求精、独当一面，那么为了能让自己卖个好价钱，就追求广度，去学习更多与移动开发相关的技能，**小程序、Kotlin、Flutter**

之前已写过一篇关于Kotlin的文章[《推荐一个Kotlin项目》](https://www.jianshu.com/p/a05b10976b08)，APP名字叫 [玩Android](https://fir.im/wanAndroid)，那这篇介绍的是小程序版本的玩Android

**上图**

![项目截图](https://upload-images.jianshu.io/upload_images/12337722-f814b44356053dbf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

与APP版本的功能完全相同，但是在UI方面，使用的是微信风格，包括字体、颜色等等都严格按照小程序设计指南

# 项目介绍

- Api当然还是用的[hongyang玩Android开放Api](https://www.wanandroid.com/blog/show/2)，只是在我使用的时候还是http协议，现在鸿神为了满足大家开发小程序的需求，[玩Android](https://www.wanandroid.com) 已全站迁至https

- 没有使用任何框架，到后来才知道有个官方框架[wepy](https://github.com/Tencent/wepy)，UI方面不会的就参考官方UI库[weui](https://github.com/Tencent/weui)

- css和js用的很菜，别太在意，都是现学现用，学以致用

## 项目结构

![这些目录基本都是固定的模式，具体作用参考小程序官方文档](https://upload-images.jianshu.io/upload_images/12337722-8d2ea3b8b3b6a79d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![about页面的文件，小程序本质就是mvvm架构](https://upload-images.jianshu.io/upload_images/12337722-71d3874c5bae5bc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 自定义组件

**上拉加载更多动画load-more**

小程序提供了下拉的动画的api，并没有提供上拉加载更多的动画，在[weui](https://github.com/Tencent/weui)库里有这个动画效果，拿来稍作修改使用。但是不能每个列表页面都写这样的有关样式和控制转态的代码，所以加以封装

```
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 定义了status属性，四个值对应四种状态
     * hidden,loading,noData,noMoreData
     */
      status:{
        type:String,
        value:'hidden'
      }
  },

  /**
  * 组件的初始数据
  */
  data: {
    //初始状态隐藏
    status: 'hidden'
  }
})
```

**使用**

```
//xx.json 列表页面的json配置文件
{
  ...
  "usingComponents": {
    "load-more": "../../components/load-more/load-more"
  }
  ...
}
```

```
//xx.wxml 列表页面的布局文件
<load-more status='{{loadMoreStatus}}' />
```

```
//xx.js文件，控制转态
const LOAD_MORE_HIDDEN = 'hidden'
this.setData({
  loadMoreStatus: LOAD_MORE_HIDDEN
})
```

这样用起来会省掉了多少模板代码，有点品味的程序员都会这么做️️
还有注册登录页面使用自定义表单组件my-input，都是出于代码复用的目的

## 列表页的封装

每个列表页面都大致相似，区别就是有没有一个大图，或者有没有一个项目链接，所以对整个cell也提取成共有的wxml，有区别的地方用if语句，满足条件才渲染

```
<wxs src="../../wxs/string.wxs" module="tools" />
<template name="list">
  <scroll-view class='list' scroll-y='true'>
    <view class='listItem' hover-class='listItemActive' wx:for='{{list}}' wx:key='_id' bindtap='link' data-link='{{item.link}}'>
      <text class='title'>{{tools.replace(item.title)}}</text>
      //if条件成立，则渲染image标签
      <image class='imageBig' wx:if='{{item.envelopePic}}' hidden='{{!item.envelopePic}}' mode='widthFix' src='{{item.envelopePic}}' />
      <view class='bottom' hover-stop-propagation='true'>
        <view class='info'>
          <text class='author' wx:if='{{!hiddenAuthor}}' hidden='{{hiddenAuthor}}' space='nbsp'>{{item.author}}  </text>
          <text class='time'>{{item.niceDate}}</text>
          <view class='link' hover-class='linkActive' wx:if='{{item.projectLink}}' hidden='{{!item.projectLink}}' catchtap='link' data-link='{{item.projectLink}}'>項目鏈接</view>
        </view>
        <image class='fav' catchtap='fav' data-index='{{index}}' src="{{(item.collect || fav)?'../../images/ic_fav_1.png':'../../images/ic_fav_0.png'}}" />
      </view>
    </view>
  </scroll-view>
  <load-more status='{{loadMoreStatus}}' />
</template>
```

里边也还有的上拉刷新、下拉刷新和点赞的逻辑也是相同的，无非就是调用的api接口方法不同，但是在函数式编程面前这些都变得so easy，我们可以把调用接口的地方封装成方法作为参数传递

```
load: function(page, success, fail) {
  API.getHot(page, success, fail)
},

onLoad: function(options) {
  ...
  //传递load方法，
  LOAD_LIST_PROXY.setPage(this, this.load)
  ...
},
```

```
this.setPage = function(p, fun, callback) {
  that = p
  //注意看这里，保存方法的引用
  loadFun = fun
  dataCallback = callback
}

 /**
   * 刷新
   */
this.refresh = function() {
  ...
  loadFun(page,
    data => this.refreshFinished(data),
    errorMsg => this.refreshFail(errorMsg)
  )
  ...
}
```

## EventBus

观察者模式，在用户状态改变时，刷新列表，改变收藏状态

```
var events = {}  //保存观察者

/**
 * 注册
 */
function register(name, self, callback) {
  var arr = [self, callback]
  var callbacks = events[name]
  if (Array.isArray(callbacks)) {
    callbacks.push(arr)
  } else {
    events[name] = [arr]
  }
}

/**
 * 反注册
 */
function unregister(name, self) {
  var callbacks = events[name]
  if (Array.isArray(callbacks)) {
    events[name] = callbacks.filter((arr) => {
      return arr[0] != self
    })
  }
}

/**
 * 发送，通知观察者
 */
function send(name, data) {
  var callbacks = events[name]
  if (Array.isArray(callbacks)) {
    callbacks.map((arr) => {
      var self = arr[0]
      var callback = arr[1]
      callback(self, data)
    })
  }
}
```

**使用**

```
  onLoad: function(options) {
    //在onLoad生命周期（页面加载）中注册观察者
    EVENT.register('UserChanged', this, function() {
      //收到通知，标记
      isRefresh = true
    })
  },

  onUnload: function() {
    //在onUnload生命周期（页面卸载）中移除观察者
    EVENT.unregister('UserChanged', this)
  },

  onShow: function() {
    //在onShow生命周期（页面显示，或者从后台到前台显示）中根据标记判断是否刷新列表
    if (isRefresh) {
      isRefresh = false
      wx.startPullDownRefresh()
    }
  },
```
```
//发送一个事件
EVENT.send('UserChanged', {})
```

# web-view，你是我哥

小程序只支持https协议，在正式版会对业务域名和ssl进行校验，在开发时可以把开发工具里的校验的功能给设置关闭状，所以一直就没在意域名等问题，等到项目完成的差不多，很得意的准备上线的时候，才想起这个这个事。Api是http协议的，不能上线，很不甘心，所以就有了之后的购买阿里云服务器，注册域名，学习nginx的简单配置及使用，配置ssl证书，做了nginx反向代理

**这点小事能难住我**

万事俱备，只等上线

然而，并不是想象中的那样，web-view组件打不开，经过百度和查看小程序官方文档，发现

![web-view组件的说明](https://upload-images.jianshu.io/upload_images/12337722-2cbc32e8738a7765.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**我能等到web-view支持个人小程序使用的时候吗？**

联系小伙伴何老板准备把项目注册成他公司下面的小程序，注册费用300块我还是能付的起的

先看一下项目中使用了多少个域名，好在微信公众平台进行业务域名的配置。打log，加载数据，上拉玩命加载...... 

差点哭了，从log中看域名已经超过了10个，有公众号、csdn、掘金、简书、微博等等，即便成了企业类型的小程序，微信公众平台最多可配置10个业务域名，还是会有些网页打不开，并不完美

放弃使用web-view，又省了300块

无奈，禁用所有想要跳转到web-view页面的点击事件，赶脚整个项目被掏空了

---

**项目上线发布了，行尸走肉型的，保证你看不到一个web-view**
（*当然，你可以下载源码，去掉cell点击事件的注释，自己编译预览*）

**但收获颇丰**
**小程序的开发流程，nginx端口重定向、反向代理，css和js也都有所收获**

**再次感谢 [hongyang玩Android开放Api](https://www.wanandroid.com/blog/show/2)**
*使用玩Android开放Api的同学请注意，玩Android已迁移到https*

![微信扫码打开小程序](https://upload-images.jianshu.io/upload_images/12337722-a5ef77c805cbcb36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**End**
