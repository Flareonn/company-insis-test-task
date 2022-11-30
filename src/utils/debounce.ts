export default function debounce(callee: Function, timeoutMs: number) {
  let timer: NodeJS.Timeout;
  return function perform(...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => callee(...args), timeoutMs);
  };
}
