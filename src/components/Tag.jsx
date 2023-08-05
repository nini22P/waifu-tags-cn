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

export default Tag