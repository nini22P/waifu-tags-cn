import Tag from "./Tag"

const Tags = ({ filteredData }) => {
  return (
    <div className='tags'>
      {filteredData.slice(0, 500).map((tag, i) => (
        <Tag key={i} cn={tag.cn} en={tag.en} />
      ))}
    </div>
  )
}

export default Tags