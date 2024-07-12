import { ref } from "vue";
const crmLoader = {
  crmLoaderStatus: ref(0),
  startcrmLoader() {
    this.crmLoaderStatus.value++;
  },
  stopcrmLoader() {
    this.crmLoaderStatus.value--;
    if (this.crmLoaderStatus.value < 0) {
      this.crmLoaderStatus.value = 0;
    }
  }
};
export default crmLoader;
