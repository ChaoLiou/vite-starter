import { computed, onMounted } from 'vue';
import { useStore } from '@/store';

export default function useFeatures() {
  const store = useStore();
  const features = computed(() => store.state.feature.list);
  const allTags = computed(() => store.getters['feature/allTags']);

  onMounted(() => store.dispatch('feature/GET_FEATURES'));

  return {
    features,
    allTags,
  };
}
