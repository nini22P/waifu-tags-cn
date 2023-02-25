import { useState } from 'react'
import './App.css'

const Tag = (props) => {
  const copyTag = () => navigator.clipboard.writeText(props.en)
  return (
    <div>
      <button className='tag' onClick={copyTag} >
        <span className='cntag'>{props.cn}</span>
        <span className='entag'>{props.en}</span>
      </button>
    </div>
  )
}

const Tags = ({ data, keyWord }) => {
  const filteredData = data.filter(tags => tags.cn.toLowerCase().indexOf(keyWord) !== -1 || tags.en.toLowerCase().indexOf(keyWord) !== -1)
  return (
    <div className='tags'>
      {filteredData.slice(0, 2000).map(items => (
        <Tag cn={items.cn} en={items.en} key={data.indexOf(items)} />
      ))}
    </div>
  )
}

function App() {
  const [keyWord, setKeyWord] = useState('')
  const data = require('./waifu-tags-cn.json')

  const search = (keyWord) => {
    let queue;
    clearTimeout(queue);
    queue = setTimeout(() => setKeyWord(keyWord.target.value), 1000);
  }

  return (
    <div className='App'>
      <input type='search' className='search' placeholder='搜索' onChange={search} />
      <Tags data={data} keyWord={keyWord} />
    </div>
  );
}

export default App