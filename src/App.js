import { useState } from 'react'
import './App.css'

const Tag = ({ cn, en }) => {
  const copyTag = () => {
    navigator.clipboard.writeText(en)
    console.log(en)
  }
  return (
    <div>
      <button className='tag' onClick={copyTag} >
        <span className='cntag'>{cn}</span>
        <span className='entag'>{en}</span>
      </button>
    </div>
  )
}

const Tags = ({ data, keyWord }) => {
  const filteredData = data.filter(tags => tags.cn.toLowerCase().indexOf(keyWord) !== -1 || tags.en.toLowerCase().indexOf(keyWord) !== -1)
  return (
    <div className='tags'>
      {filteredData.slice(0, 2000).map((tag, i) => (
        <Tag key={i} cn={tag.cn} en={tag.en} />
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
    queue = setTimeout(() => setKeyWord(keyWord.target.value.toLowerCase()), 1000);
  }

  return (
    <div className='App'>
      <input type='search' className='search' placeholder='搜索' onChange={search} />
      <Tags data={data} keyWord={keyWord} />
    </div>
  );
}

export default App