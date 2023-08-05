import { useState } from 'react'
import Header from './components/Header'
import Tags from './components/Tags'
import './App.css'

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