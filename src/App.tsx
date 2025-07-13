import { useEffect, useState } from 'react'
import Table, { type TableProps } from './components/table'
import { getAnalysisMsg, getAnalysisList, type AnalysisData, type IStockData } from './services/analysis'
import { useSetAtom } from 'jotai'
import { pageTitleAtom } from './store/page-title'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import './App.css'

const columns: TableProps<IStockData>['columns'] = [
  {
    label: "打板日期",
    key: "date",
    fixed: true,
    width: 80
  },
  {
    label: "当日涨幅",
    key: "changePercentage",
    render: (_: any, record: IStockData) => (
      <div className={record.changePercentage > 0 ? "text-[#ff2436]" : "text-[#07ab4b]"}>{record.changePercentage}%</div>
    ),
    width: 50,
  },
  {
    label: "是否开板",
    key: "isOpened",
    render: (isOpened: boolean) => isOpened ? "是" : "否",
    width: 60,
  },
  {
    label: "涨/跌停原因",
    key: "reason",
    width: 90,
  },
]

const id = "10jqka"
function App() {
  const [data, setData] = useState<AnalysisData>()
  const [list, setList] = useState<IStockData[]>([])
  const [loading, setLoading] = useState(true)
  const [tableLoading, setTableLoading] = useState(true)
  const setPageTitle = useSetAtom(pageTitleAtom)

  useEffect(() => {
    getAnalysisMsg(id).then(res => {
      setData(res.data)
      setPageTitle(res.data.name + '-操作分析')
      setLoading(false)
    })

    getAnalysisList(id).then(res => {
      setList(res.data)
      setTableLoading(false)
    })
  }, [])

  const handleRowClick = (row: any) => {
    toast(`表格行${row.id}已点击`)
  }

  return (
    <div className="p-4 mt-10">
      <div className="rounded-md bg-[#1c1c1c] mb-3 p-4">
        <div className="flex items-center mb-4">
          {loading ? <>
            <div className="w-11 text-[44px] mr-4 leading-none"><Skeleton circle className="h-full" /></div>
            <div className="flex-1 text-[18px] leading-none"><Skeleton /></div>
          </> : <>
            <img alt="头像" className='rounded-full size-11 mr-4' src={data?.avatar} />
            <span className="text-[18px] font-semibold">{data?.name}-操作分析</span>
          </>}
        </div>
        <p>{loading ? <Skeleton count={4} /> : <>介绍：{data?.description}</>}</p>
      </div>

      <div className="rounded-md bg-[#1c1c1c] mb-3 p-4">
        <div className="text-[18px] font-semibold flex items-center gap-2 mb-4">
          近一周持仓
          <svg onClick={() => { toast("详情图标已点击") }} className="text-[#676767]" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </div>
        <Table<IStockData>
          columns={columns}
          loading={tableLoading}
          loadingNums={{ rows: 7, columns: columns.length }}
          dataSource={list}
          onRowClick={handleRowClick} />
      </div>
    </div>
  )
}

export default App
