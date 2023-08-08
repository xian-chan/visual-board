import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getApiList } from "../server/index";
import type { Children, Children2, Root, Today, Total } from "./type";

export const useStore = defineStore("counter", {
  state: () => {
    return {
      list: <Root>{},
      item: <Children[]>[],
      chinaToday: <Today>{},
      chinaTotal: <Total>{},
      cityDetail: <Children2[]>[],
    };
  },

  actions: {
    async getList() {
      const result = await getApiList();
      this.list = result;
      this.chinaToday = this.list.chinaTotal.today;
      this.chinaTotal = this.list.chinaTotal.total;
      this.cityDetail = this.list.areaTree[2].children[7].children.slice(0, 10);
      console.log(result);
    },
  },
});
