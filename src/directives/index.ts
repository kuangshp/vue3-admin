import type { App } from 'vue';
import { setupCopyDirective } from './modules/copy'; // 复制指令 v-copy
import { setupDebounceDirective } from './modules/debounce'; // 防抖指令 v-debounce
import { setupThrottleDirective } from './modules/throttle'; // 节流指令 v-throllte
import { setupNumberOnlyDirective } from './modules/numberOnly'; // 数字输入限制指令

export function setupGlobDirectives(app: App) {
  setupCopyDirective(app);
  setupDebounceDirective(app);
  setupThrottleDirective(app);
  setupNumberOnlyDirective(app);
}
