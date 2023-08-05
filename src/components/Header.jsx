import { RiGithubFill } from "react-icons/ri"

const Header = ({ search, tagsNum, filteredNum }) => {
  return (
    <div className='header'>
      <a href='https://github.com/nini22P/waifu-tags-cn'><RiGithubFill className='icon' /></a>
      <input type='search' className='search' placeholder='搜索' onChange={search} />
      <div className='tagNum'>{filteredNum} / {tagsNum}</div>
    </div>
  )
}

export default Header