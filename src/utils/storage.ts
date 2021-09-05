class LocalStorage {
  private prefix: string;
  constructor(prefix = 'web') {
    this.prefix = prefix;
  }

  /**
   * @param {type}
   * @return:
   * @Description:获取本地存储的方法
   * @Author: 水痕
   * @LastEditors: 水痕
   * @Date: 2019-08-16 13:30:46
   */
  public getItem(key: string) {
    key = this.getKey(key);
    const storeData: string | null = window.localStorage.getItem(key);
    if (storeData) {
      const {
        value,
        options: { storeTime },
      } = JSON.parse(storeData);
      // 如果从存储中获取的时间大于当前的时间或者等于0的时候表示当前的localStorage有效
      if (storeTime > new Date().getTime()) {
        return value;
      } else {
        this.removeItem(key);
        return null;
      }
    }
    return null;
  }

  /**
   * @param {type}
   * @return:
   * @Description: 设置存储
   * @Author: 水痕
   * @LastEditors: 水痕
   * @Date: 2019-08-16 13:31:00
   */
  public setItem(key: string, value: string, time?: number | string | Date): void {
    key = this.getKey(key);
    // 如果用户没传递时间进来就是一天
    let newTime: number;
    if (!time) {
      newTime = new Date().getTime() + 1000 * 60 * 60 * 24 * 1;
    } else {
      newTime = new Date(time).getTime() || (time as Date).getTime();
    }
    const options: { storeTime: number; prefix: string } = {
      storeTime: newTime,
      prefix: this.prefix,
    };
    window.localStorage.setItem(key, JSON.stringify({ value, options }));
  }

  /**
   * @param {type}
   * @return:
   * @Description: 删除存储
   * @Author: 水痕
   * @LastEditors: 水痕
   * @Date: 2019-08-16 13:31:11
   */
  public removeItem(key: string): void {
    key = this.getKey(key);
    const value: string | null = this.getItem(key);
    if (value) {
      window.localStorage.removeItem(key);
    }
  }

  /**
   * 清空全部的storage
   */
  public clear(): void {
    window.localStorage.clear();
  }

  /**
   * @param {type}
   * @return:
   * @Description: 私有方法获取key
   * @Author: 水痕
   * @LastEditors: 水痕
   * @Date: 2019-08-16 13:31:22
   */
  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }
}

export const storage = new LocalStorage('sea');
