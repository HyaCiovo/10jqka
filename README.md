# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## 表格(Table)组件特性

### 功能特点
- 支持数据展示与加载状态管理
- 提供骨架屏加载效果
- 支持列固定功能
- 支持自定义渲染单元格
- 支持行点击事件


### 使用示例
```tsx
import Table from "./components/table"

function App() {
  const columns = [
    { label: "姓名", key: "name", fixed: true, width: 100 },
    { label: "年龄", key: "age" },
    { label: "城市", key: "city" }
  ]

  const dataSource = [
    { id: "1", name: "张三", age: 28, city: "北京" },
    { id: "2", name: "李四", age: 30, city: "上海" }
  ]

  return <Table columns={columns} dataSource={dataSource} />
}
```

### API说明

#### 属性(Props)
| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| columns | Column[] | - | 表格列配置 |
| dataSource | T[] | - | 表格数据源 |
| loading | boolean | false | 是否显示加载状态 |
| loadingNums | { rows?: number, columns?: number } | { rows: 3, columns: 3 } | 加载时显示的行列数 |
| onRowClick | (record: T) => void | - | 行点击事件 |

#### 列(Column)配置
| 属性名 | 类型 | 说明 |
|-------|------|------|
| label | string | 列标题 |
| key | string | 数据字段名 |
| fixed | boolean | 是否固定列 |
| width | number | 列宽度 |
| render | (key: any, record: T, index?: number) => React.ReactNode | 自定义渲染函数 |

### 样式说明
- 固定列使用 `position: sticky` 实现
- 单元格默认带有底部分割线
- 支持响应式横向滚动

### 技术实现
- 使用 TypeScript 泛型确保类型安全
- 使用 react-loading-skeleton 实现加载动画
- 使用 clsx 处理动态类名

## Expanding the ESLint configuration

...（原有内容保持不变）