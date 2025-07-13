
export interface AnalysisData {
  id: string;
  name: string;
  avatar: string;
  description: string;
}

export interface IStockData {
  id: string;
  date: string; // 打板日期
  changePercentage: number; // 当日涨幅
  isOpened: boolean; // 是否开板
  reason: string; // 涨/跌原因
}


export const getAnalysisMsg = async (id: string): Promise<{ data: AnalysisData }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id,
          name: '北京炒家',
          avatar: 'https://www.keaitupian.cn/cjpic/frombd/2/253/3315366793/2321372572.jpg',
          description: '北京炒家，9个月实盘大赛收益近10倍。分别为18年10-12月第37届再战杯实盘赛冠军(收益146.91%)，19年1-6月第9届百万杯实盘比赛季军(收益330.49%)。主要风格:首板为主，偶尔2板，擅长意大利炮满仓猛轰。'
        }
      });
    }, 200);
  });
};


// 根据当前时间生成最近 7 天的日期数组
function getLastSevenDays(): string[] {
  let dates: string[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0]; // 格式化为 YYYY-MM-DD
    dates = [formattedDate, ...dates]
  }

  return dates;
}

// 生成 mock 数据
function generateMockData(): IStockData[] {
  const dates = getLastSevenDays();
  const reasons = ['市场情绪回暖', '板块轮动', '利好消息刺激', '资金流入', '技术面修复'];
  const data = dates.map((date, index) => ({
    id: `${index + 1}`,
    date,
    isOpened: Math.random() > 0.5, // 随机是否开板
    changePercentage: Number((Math.random() * 10 - 5).toFixed(2)), // 随机涨幅范围 -5% 到 5%
    reason: reasons[Math.floor(Math.random() * reasons.length)],
  }));

  return data;
}

export const getAnalysisList = async (id: string): Promise<{ id: string, data: IStockData[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        data: generateMockData()
      })
    }, 800)
  })
}