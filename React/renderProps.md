渲染属性
```
import Cat from 'components/cat'
class DataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { target: 'Zac' };
  }

  render() {
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    )
  }
}

<DataProvider render={data => (
  <Cat target={data.target} />
)}/>

```
DataProvider 就可以得到复用 其他的子组件 除Cat 外的组件被它包裹也可以传递数据

大多数情况这么写：那么在DataProvider中 要写对应的children
{this.props.children(this.state)}
另外render 只是个props名字而已 可以任意写 只不过这样写可读性强一点 大家都这么写

```
<DataProvider>
  {data => (
    <Cat target={data.target} />
  )}
</DataProvider>

```
