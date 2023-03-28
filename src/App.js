import { useState } from 'react'
import './App.css'

const Header = ({ search, tagsNum, filteredNum }) => {
  return (
    <div className='header'>
      {/* <a href='https://github.com/nini22P/waifu-tags-cn'>GitHub</a> */}
      <input type='search' className='search' placeholder='搜索' onChange={search} />
      <div className='tagNum'>{filteredNum} / {tagsNum}</div>
    </div>
  )
}

const Tag = ({ cn, en }) => {
  const copyTag = () => {
    navigator.clipboard.writeText(en + ', ')
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

const Tags = ({ filteredData }) => {
  return (
    <div className='tags'>
      {filteredData.slice(0, 500).map((tag, i) => (
        <Tag key={i} cn={tag.cn} en={tag.en} />
      ))}
    </div>
  )
}

function App() {
  const [keyWord, setKeyWord] = useState('')
  const data = require('./waifu-tags-cn.json')

  const keyWordFilter = (keyWord) => {
    if (keyWord.replace(/[ ]+/g, '') === '') return ''
    else return keyWord.toLowerCase().replace(/[ ]+/g, ' ')
  }

  const search = (keyWord) => {
    let queue;
    clearTimeout(queue);
    queue = setTimeout(() => setKeyWord(keyWordFilter(keyWord.target.value)), 300);
  }

  const filteredData = data.filter(tag => tag.cn.toLowerCase().indexOf(keyWord) !== -1 || tag.en.toLowerCase().indexOf(keyWord) !== -1)

  return (
    <div className='App'>
      <Header search={search} tagsNum={data.length} filteredNum={filteredData.length} />
      <Tags filteredData={filteredData} />
    </div>
  );
}

export default App