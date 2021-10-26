import { computed } from 'vue';
import { useStore } from '@/store';

export default function useNotifications() {
  const store = useStore();
  const events = computed(() => store.state.wsqueue.events);

  return {
    events,
  };
}
