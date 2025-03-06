
import { setupCopyDirective } from './copy'; // 复制指令 v-copy
import { setupDebounceDirective } from './debounce'; // 防抖指令 v-debounce
import { setupInputDirective } from './input'; // 输入框规则指令 v-input
import { setupThrollteDirective } from './throllte'; // 节流指令 v-throllte
import { setupNumberOnlyDirective } from './numberOnly'; // 节流指令 v-throllte

export function setupGlobDirectives(app) {
  setupCopyDirective(app);
  setupDebounceDirective(app);
  setupInputDirective(app);
  setupThrollteDirective(app);
  setupNumberOnlyDirective(app);
}


