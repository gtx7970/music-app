import { useEffect, useState, useCallback } from 'react'
import { getSingerList } from '../../api'
import SingerList from '../../components/singer-list'
import './index.css'

function Singer() {
  const [dataList, setDataList] = useState([])
  useEffect(() => {
    getSingerList().then(res => {
      setDataList(res.singers)
    })
  }, [])

  // const handleScroll = pos => {
  //   console.log(pos)
  // }

  // const setPosition = useCallback()
  return (
    <div className="fixed w-full bottom-0 top-20 singer-list">
      <SingerList dataList={dataList}></SingerList>
    </div>
  )
}

export default Singer