import { computed, onMounted } from 'vue';
import { useStore } from '@/store';

export default function useSamples() {
  const store = useStore();
  const samples = computed(() => store.state.sample.list);
  const lastSample = computed(() => store.getters['sample/lastSample']);

  onMounted(() => store.dispatch('sample/GET_LIST'));

  return {
    samples,
    lastSample,
  };
}
