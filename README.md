# d3.js-Force-directed
使用d3.js（V5版本)，绘制力导向图实例

## 项目功能
* 根据节点与边数据（包含边权重）绘制力导向图
* 支持拖拽节点
* 添加、删除节点
* 添加、删除边

## d3.js配置
* 可以到官网下载，也可以简单地使用 <script type="text/javascript" src="http://d3js.org/d3.v5.min.js"></script> 导入
  
## 学习d3.js的关键点
* 理解d3.js的核心：绑定DOM和数据，可以通过修改数据来直接调整DOM
* 选择器的使用
* 对enter、update、exit的理解
* 学习要用的API

## 关键流程

### 编写render函数
render函数负责DOM与数据的绑定以及绘制工作，由于更新数据的时候都要调用一遍，因此汇总为一个函数

### 制作HTML控件
本项目主要做了些简单的按钮，用于更新节点（nodes）与边（edges）的数据
