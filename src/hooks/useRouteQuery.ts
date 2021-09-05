import { ref, Ref, watchEffect } from 'vue';
import { useRoute, LocationQueryRaw } from 'vue-router';

interface RouteQuery {
  redirect: Ref<string>;
  otherQuery: Ref<LocationQueryRaw | undefined>;
}

export const useRouteQuery = (): RouteQuery => {
  const route = useRoute();
  const query = route.query;
  const redirect = ref('');
  const otherQuery = ref<LocationQueryRaw | undefined>(undefined);

  const getOtherQuery = (query: LocationQueryRaw) => {
    return Object.keys(query || {})
      .filter((q) => q !== 'redirect')
      .reduce((obj, key) => {
        obj[key] = query[key];
        return obj;
      }, {} as LocationQueryRaw);
  };

  otherQuery.value = getOtherQuery(query);

  // 不使用watch(route) 原因说明：
  // 尤大回应 https://www.gitmemory.com/issue/vuejs/vue-next/2027/685247838
  // https://blog.csdn.net/weixin_47339511/article/details/117221559
  // 修复使用watch 监听route 性能开销问题
  watchEffect(() => {
    const query = route.query;
    if (query) {
      redirect.value = query.redirect as string;
      otherQuery.value = getOtherQuery(query as LocationQueryRaw);
    }
  });

  return {
    redirect,
    otherQuery,
  };
};
