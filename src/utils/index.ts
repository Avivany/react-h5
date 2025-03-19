

//时间格式化
export const formatDate = (): string => {
      const time: Date = new Date();
      const y: string = time.getFullYear().toString();
      let m: string = (time.getMonth() + 1).toString();
      let d: string = time.getDate().toString();
      let h: string = time.getHours().toString();
      let mm: string = time.getMinutes().toString();
      const ss: string = time.getSeconds().toString();
      m = Number(m) < 10 ? `0${m}` : m;
      d = Number(d) < 10 ? `0${d}` : d;
      h = Number(h) < 10 ? `0${h}` : h;
      mm = Number(mm) < 10 ? `0${mm}` : mm;
      return `${y}${m}${d}${h}${mm}${ss}`;
    };